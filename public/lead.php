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
    if (!move_uploaded_file((string) $file['tmp_name'], $filesDir . '/' . $fileName)) {
        $fileName = '';
    }
}

$lead = [
    'id' => bin2hex(random_bytes(8)),
    'createdAt' => gmdate('c'),
    'name' => field('name'),
    'phone' => $phone,
    'product' => field('product'),
    'quantity' => field('quantity'),
    'comment' => field('comment'),
    'variant' => field('variant'),
    'size' => field('size'),
    'colors' => field('colors'),
    'contact' => field('contact'),
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
    'file' => $fileName,
];

file_put_contents($dir . '/leads.jsonl', json_encode($lead, JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND | LOCK_EX);

$lines = [];
foreach ($lead as $key => $value) {
    if ($value !== '') {
        $lines[] = $key . ': ' . $value;
    }
}
$headers = "MIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8\r\nFrom: webmaster@birka-market.ru\r\n";
@mail('prod@birka-market.ru', 'Заявка с сайта Бирка Маркет', implode("\n", $lines), $headers);

echo json_encode(['ok' => true, 'id' => $lead['id'], 'goal' => 'LEAD'], JSON_UNESCAPED_UNICODE);
