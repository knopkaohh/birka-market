<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Нужен POST'], JSON_UNESCAPED_UNICODE);
    exit;
}

function field(string $name): string
{
    return trim((string) ($_POST[$name] ?? ''));
}

function moscowStamp(): string
{
    $months = [
        1 => 'января', 2 => 'февраля', 3 => 'марта', 4 => 'апреля',
        5 => 'мая', 6 => 'июня', 7 => 'июля', 8 => 'августа',
        9 => 'сентября', 10 => 'октября', 11 => 'ноября', 12 => 'декабря',
    ];
    $dt = new DateTimeImmutable('now', new DateTimeZone('Europe/Moscow'));
    return $dt->format('j') . ' ' . $months[(int) $dt->format('n')] . ', ' . $dt->format('H:i') . ' МСК';
}

/** @return array{token: string, chatId: string} */
function telegramSettings(): array
{
    $token = trim((string) getenv('TELEGRAM_BOT_TOKEN'));
    $chatId = trim((string) getenv('TELEGRAM_CHAT_ID'));
    $path = __DIR__ . '/leads/telegram.php';
    if (!is_file($path)) {
        $path = __DIR__ . '/leads/telegram.example.php';
    }
    if (is_file($path)) {
        $saved = include $path;
        if (is_array($saved)) {
            if (!empty($saved['token'])) {
                $token = trim((string) $saved['token']);
            }
            if (!empty($saved['chatId'])) {
                $chatId = trim((string) $saved['chatId']);
            }
        }
    }
    if (str_contains($token, 'ВСТАВЬТЕ') || str_contains($chatId, 'ВСТАВЬТЕ')) {
        return ['token' => '', 'chatId' => ''];
    }
    return ['token' => $token, 'chatId' => $chatId];
}

function telegramRequest(string $token, string $method, array $payload): bool
{
    $url = 'https://api.telegram.org/bot' . $token . '/' . $method;
    $hasFile = false;
    foreach ($payload as $value) {
        if ($value instanceof CURLFile) {
            $hasFile = true;
            break;
        }
    }
    $body = '';
    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        $options = [
            CURLOPT_POST => true,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CONNECTTIMEOUT => 5,
            CURLOPT_TIMEOUT => 12,
        ];
        if ($hasFile) {
            $options[CURLOPT_POSTFIELDS] = $payload;
        } else {
            $options[CURLOPT_HTTPHEADER] = ['Content-Type: application/json'];
            $options[CURLOPT_POSTFIELDS] = json_encode($payload, JSON_UNESCAPED_UNICODE);
        }
        curl_setopt_array($ch, $options);
        $raw = curl_exec($ch);
        curl_close($ch);
        $body = is_string($raw) ? $raw : '';
    } elseif (!$hasFile) {
        $context = stream_context_create([
            'http' => [
                'method' => 'POST',
                'header' => "Content-Type: application/json\r\n",
                'content' => json_encode($payload, JSON_UNESCAPED_UNICODE),
                'timeout' => 12,
            ],
        ]);
        $raw = @file_get_contents($url, false, $context);
        $body = is_string($raw) ? $raw : '';
    }
    $data = json_decode($body, true);
    if (is_array($data) && !empty($data['ok'])) {
        return true;
    }
    $GLOBALS['telegramError'] = is_array($data) ? (string) ($data['description'] ?? 'Telegram не принял сообщение') : 'Telegram не ответил';
    return false;
}

function notifyTelegram(string $text, string $filePath): string
{
    $settings = telegramSettings();
    if ($settings['token'] === '' || $settings['chatId'] === '') {
        return 'skipped';
    }
    $sent = telegramRequest($settings['token'], 'sendMessage', [
        'chat_id' => $settings['chatId'],
        'text' => $text,
        'disable_web_page_preview' => true,
    ]);
    if (!$sent) {
        return 'failed';
    }
    if ($filePath !== '' && is_file($filePath) && function_exists('curl_init')) {
        telegramRequest($settings['token'], 'sendDocument', [
            'chat_id' => $settings['chatId'],
            'document' => new CURLFile($filePath),
        ]);
    }
    return 'sent';
}

$phone = field('phone');
$digits = preg_replace('/\D+/', '', $phone) ?? '';
if (strlen($digits) < 10) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'message' => 'Укажите номер телефона.'], JSON_UNESCAPED_UNICODE);
    exit;
}

$dir = __DIR__ . '/leads';
if (!is_dir($dir) && !mkdir($dir, 0755, true)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'message' => 'Не удалось сохранить заявку.'], JSON_UNESCAPED_UNICODE);
    exit;
}

$fileName = '';
$filePath = '';
$file = $_FILES['file'] ?? null;
if (is_array($file) && ($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_NO_FILE) {
    if (($file['error'] ?? UPLOAD_ERR_OK) !== UPLOAD_ERR_OK) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'message' => 'Не удалось принять файл.'], JSON_UNESCAPED_UNICODE);
        exit;
    }
    if (($file['size'] ?? 0) > 15 * 1024 * 1024) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'message' => 'Файл больше 15 МБ.'], JSON_UNESCAPED_UNICODE);
        exit;
    }
    $safe = preg_replace('/[^\w.\-]+/u', '_', (string) ($file['name'] ?? 'file')) ?: 'file';
    $fileName = time() . '-' . $safe;
    $filesDir = $dir . '/files';
    if (!is_dir($filesDir)) {
        mkdir($filesDir, 0755, true);
    }
    $filePath = $filesDir . '/' . $fileName;
    if (!move_uploaded_file((string) $file['tmp_name'], $filePath)) {
        $fileName = '';
        $filePath = '';
    }
}

$job = field('job') === '1';
$website = field('website') === '1';
$phoneOnly = field('phoneOnly') === '1' || field('form') === 'callback';
$quick = field('quick') === '1';
$kind = $job ? 'job' : ($website ? 'website' : ($phoneOnly ? 'call' : ($quick ? 'quick' : 'order')));
$titles = [
    'job' => 'Отклик на работу',
    'website' => 'Заявка на сайт',
    'call' => 'Подбор материала',
    'quick' => 'Быстрый расчёт',
    'order' => 'Расчёт заказа',
];
$title = $titles[$kind];

$contacts = [
    'phone' => 'Телефон',
    'whatsapp' => 'WhatsApp',
    'telegram' => 'Telegram',
    'max' => 'Макс',
];
$contact = field('contact');
$contactLabel = $contacts[$contact] ?? $contact;

$product = field('product');
if ($product === 'callback' || $product === 'unknown' || $product === 'job') {
    $product = '';
}
$lead = [
    'id' => bin2hex(random_bytes(8)),
    'createdAt' => gmdate('c'),
    'kind' => $kind,
    'title' => $title,
    'status' => 'new',
    'name' => field('name'),
    'phone' => $phone,
    'product' => $product,
    'quantity' => field('quantity'),
    'comment' => field('comment'),
    'variant' => field('variant'),
    'size' => field('size'),
    'colors' => field('colors'),
    'contact' => $contact,
    'page' => field('page'),
    'city' => field('city'),
    'age' => field('age'),
    'previous' => field('previous'),
    'sales' => field('sales'),
    'about' => field('about'),
    'company' => field('company'),
    'style' => field('style'),
    'purpose' => field('purpose'),
    'currentSite' => field('currentSite'),
    'sample' => isset($_POST['sample']) ? 'да' : '',
    'file' => $fileName,
];

$rows = [
    'Имя' => $lead['name'],
    'Телефон' => $lead['phone'],
    'Изделие' => $lead['product'],
    'Тираж' => $lead['quantity'],
    'Связь' => $contactLabel,
    'Вариант' => $lead['variant'],
    'Размер' => $lead['size'],
    'Цвета' => $lead['colors'],
    'Образец' => $lead['sample'],
    'Фирма' => $lead['company'],
    'Стиль' => $lead['style'],
    'Задача' => $lead['purpose'],
    'Текущий сайт' => $lead['currentSite'],
    'Город' => $lead['city'],
    'Возраст' => $lead['age'],
    'Опыт' => $lead['previous'],
    'Продажи' => $lead['sales'],
    'О себе' => $lead['about'],
    'Страница' => $lead['page'] !== '' ? 'https://birka-market.ru' . $lead['page'] : '',
    'Файл' => $fileName,
    'Комментарий' => $lead['comment'],
];
$lines = ['Новая заявка — ' . $title, ''];
foreach ($rows as $label => $value) {
    if ($value !== '') {
        $lines[] = $label . ': ' . $value;
    }
}
$lines[] = '';
$lines[] = moscowStamp();
$text = implode("\n", $lines);
if (function_exists('mb_substr')) {
    $text = mb_substr($text, 0, 4000);
} elseif (strlen($text) > 4000) {
    $text = substr($text, 0, 4000);
}

$GLOBALS['telegramError'] = '';
$lead['telegram'] = notifyTelegram($text, $filePath);
if ($lead['telegram'] === 'failed' && $GLOBALS['telegramError'] !== '') {
    $lead['telegramError'] = $GLOBALS['telegramError'];
}
file_put_contents($dir . '/leads.jsonl', json_encode($lead, JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND | LOCK_EX);

$mailLines = [];
foreach ($lead as $key => $value) {
    if ($value !== '') {
        $mailLines[] = $key . ': ' . $value;
    }
}
$headers = "MIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8\r\nFrom: webmaster@birka-market.ru\r\n";
@mail('prod@birka-market.ru', 'Заявка с сайта Бирка Маркет', implode("\n", $mailLines), $headers);

echo json_encode(['ok' => true, 'id' => $lead['id'], 'goal' => 'LEAD'], JSON_UNESCAPED_UNICODE);
