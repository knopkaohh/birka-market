<?php
declare(strict_types=1);

header('X-Robots-Tag: noindex, nofollow');
header('Cache-Control: no-store');

const PANEL_USER = 'admin';
const PANEL_HASH = '$2y$10$b1z9x0wugU36Zpu/fCKY2.EE0Q7oTRCaQb88JJgbjvIxjsJwgFPTC';

$secure = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/admin/',
    'httponly' => true,
    'samesite' => 'Lax',
    'secure' => $secure,
]);
session_start();

$leadsFile = dirname(__DIR__) . '/leads/leads.jsonl';
$filesDir = dirname(__DIR__) . '/leads/files';

function h(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function kindOf(array $lead): string
{
    $kind = (string) ($lead['kind'] ?? '');
    if ($kind !== '') {
        return $kind;
    }
    $product = (string) ($lead['product'] ?? '');
    $comment = (string) ($lead['comment'] ?? '');
    if ($product === 'job' || ($lead['city'] ?? '') !== '' || ($lead['about'] ?? '') !== '') {
        return 'job';
    }
    if ($product === 'sozdanie-sajtov' || ($lead['company'] ?? '') !== '' || ($lead['purpose'] ?? '') !== '') {
        return 'website';
    }
    if ($product === 'callback' || str_starts_with($comment, 'Подсказка:')) {
        return 'call';
    }
    if (($lead['quantity'] ?? '') === '' || ($lead['quantity'] ?? '') === '0') {
        return 'quick';
    }
    return 'order';
}

function titleOf(array $lead): string
{
    $saved = trim((string) ($lead['title'] ?? ''));
    if ($saved !== '') {
        return $saved;
    }
    return [
        'job' => 'Отклик на работу',
        'website' => 'Заявка на сайт',
        'call' => 'Подбор материала',
        'quick' => 'Быстрый расчёт',
        'order' => 'Расчёт заказа',
    ][kindOf($lead)] ?? 'Заявка';
}

function readLeads(string $file): array
{
    if (!is_file($file)) {
        return [];
    }
    $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if (!is_array($lines)) {
        return [];
    }
    $leads = [];
    foreach ($lines as $line) {
        $row = json_decode($line, true);
        if (is_array($row) && !empty($row['id'])) {
            $leads[] = $row;
        }
    }
    return array_reverse($leads);
}

function writeLeads(string $file, array $leads): void
{
    $lines = [];
    foreach ($leads as $lead) {
        $lines[] = json_encode($lead, JSON_UNESCAPED_UNICODE);
    }
    $body = $lines ? implode("\n", $lines) . "\n" : '';
    $handle = fopen($file, 'c+');
    if ($handle === false) {
        return;
    }
    flock($handle, LOCK_EX);
    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, $body);
    fflush($handle);
    flock($handle, LOCK_UN);
    fclose($handle);
}

function moscow(string $iso): string
{
    try {
        $dt = new DateTimeImmutable($iso);
    } catch (Exception) {
        return $iso;
    }
    $months = [
        1 => 'января', 2 => 'февраля', 3 => 'марта', 4 => 'апреля',
        5 => 'мая', 6 => 'июня', 7 => 'июля', 8 => 'августа',
        9 => 'сентября', 10 => 'октября', 11 => 'ноября', 12 => 'декабря',
    ];
    $local = $dt->setTimezone(new DateTimeZone('Europe/Moscow'));
    return $local->format('j') . ' ' . $months[(int) $local->format('n')] . ', ' . $local->format('H:i');
}

$authed = ($_SESSION['panel'] ?? '') === 'ok';

if (isset($_GET['logout'])) {
    $_SESSION = [];
    session_destroy();
    header('Location: /admin/');
    exit;
}

$loginError = '';
if (!$authed && ($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    $fails = (int) ($_SESSION['fails'] ?? 0);
    if ($fails >= 8) {
        $loginError = 'Слишком много попыток. Подождите и откройте страницу снова.';
    } else {
        $user = trim((string) ($_POST['login'] ?? ''));
        $password = (string) ($_POST['password'] ?? '');
        if (hash_equals(PANEL_USER, $user) && password_verify($password, PANEL_HASH)) {
            session_regenerate_id(true);
            $_SESSION['panel'] = 'ok';
            $_SESSION['fails'] = 0;
            header('Location: /admin/');
            exit;
        }
        $_SESSION['fails'] = $fails + 1;
        $loginError = 'Неверный логин или пароль.';
    }
}

if ($authed && ($_SERVER['REQUEST_METHOD'] ?? '') === 'POST' && isset($_POST['lead_id'], $_POST['status'])) {
    $id = (string) $_POST['lead_id'];
    $status = $_POST['status'] === 'seen' ? 'seen' : 'new';
    $stored = array_reverse(readLeads($leadsFile));
    foreach ($stored as &$lead) {
        if (($lead['id'] ?? '') === $id) {
            $lead['status'] = $status;
        }
    }
    unset($lead);
    writeLeads($leadsFile, $stored);
    header('Location: /admin/?id=' . rawurlencode($id));
    exit;
}

if ($authed && isset($_GET['file'])) {
    $name = basename((string) $_GET['file']);
    $path = $filesDir . '/' . $name;
    if ($name !== '' && is_file($path) && str_starts_with(realpath($path) ?: '', realpath($filesDir) ?: '---')) {
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="' . rawurlencode($name) . '"');
        readfile($path);
        exit;
    }
    http_response_code(404);
    exit;
}

$filter = (string) ($_GET['kind'] ?? 'all');
$openId = (string) ($_GET['id'] ?? '');
$leads = $authed ? readLeads($leadsFile) : [];
$labels = [
    'all' => 'Все',
    'order' => 'Заказы',
    'quick' => 'Быстрый расчёт',
    'call' => 'Подбор материала',
    'website' => 'Сайты',
    'job' => 'Работа',
];
$visible = array_values(array_filter(
    $leads,
    static fn (array $lead): bool => $filter === 'all' || kindOf($lead) === $filter
));
$fresh = 0;
foreach ($leads as $lead) {
    if (($lead['status'] ?? 'new') !== 'seen') {
        $fresh++;
    }
}
$fields = [
    'phone' => 'Телефон',
    'name' => 'Имя',
    'product' => 'Изделие',
    'quantity' => 'Тираж',
    'contact' => 'Связь',
    'variant' => 'Вариант',
    'size' => 'Размер',
    'colors' => 'Цвета',
    'sample' => 'Образец',
    'company' => 'Фирма',
    'style' => 'Стиль',
    'purpose' => 'Задача',
    'currentSite' => 'Текущий сайт',
    'city' => 'Город',
    'age' => 'Возраст',
    'previous' => 'Опыт',
    'sales' => 'Продажи',
    'about' => 'О себе',
    'page' => 'Страница',
    'comment' => 'Комментарий',
    'telegram' => 'Telegram',
    'telegramError' => 'Ошибка Telegram',
];
?>
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>Заявки — Бирка Маркет</title>
  <style>
    :root { color-scheme: light; }
    * { box-sizing: border-box; }
    body { margin: 0; background: #f4f1e9; color: #222322; font: 16px/1.45 Arial, sans-serif; }
    a { color: inherit; }
    header, main { width: min(880px, calc(100% - 32px)); margin: 0 auto; }
    header { display: flex; justify-content: space-between; align-items: end; gap: 16px; padding: 28px 0 12px; }
    h1 { margin: 0; font-size: 32px; letter-spacing: -.04em; }
    h1 em { font-style: normal; color: #8d6410; }
    header p, .login p { margin: 0 0 4px; color: #8d6410; font-size: 13px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
    header a { color: #5c584e; }
    .filters { display: flex; flex-wrap: wrap; gap: 8px; padding: 8px 0 18px; }
    .filters a, button { border: 0; border-radius: 999px; background: #fff; color: #222322; padding: 8px 12px; font: inherit; font-size: 14px; font-weight: 700; text-decoration: none; }
    .filters a.is-on, button[type="submit"] { background: #edc147; }
    .lead { margin: 0 0 10px; background: #fffdf8; border-radius: 16px; overflow: hidden; }
    .lead summary { cursor: pointer; display: grid; gap: 2px; padding: 14px 16px; }
    .lead summary span { color: #8d6410; font-size: 12px; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; }
    .lead summary strong { font-size: 18px; }
    .lead summary small { color: #5c584e; }
    .lead.is-seen { opacity: .62; }
    .detail { padding: 0 16px 16px; display: grid; gap: 8px; }
    .detail p { margin: 0; white-space: pre-wrap; }
    .detail p b { display: block; color: #8d6410; font-size: 12px; letter-spacing: .04em; text-transform: uppercase; }
    .login { width: min(420px, calc(100% - 32px)); margin: 12vh auto; background: #fffdf8; padding: 28px; border-radius: 20px; }
    .login h1 { margin: 0 0 18px; }
    label { display: grid; gap: 6px; margin: 0 0 12px; font-weight: 700; }
    input { width: 100%; min-height: 46px; border: 1px solid #ddd6c8; border-radius: 12px; padding: 0 12px; font: inherit; background: #fff; }
    .error { color: #8c2e2e; font-weight: 700; }
    .empty { color: #5c584e; }
  </style>
</head>
<body>
<?php if (!$authed): ?>
  <form class="login" method="post">
    <p>Бирка Маркет</p>
    <h1>Заявки</h1>
    <label>Логин <input name="login" value="admin" autocomplete="username"></label>
    <label>Пароль <input name="password" type="password" autocomplete="current-password"></label>
    <?php if ($loginError !== ''): ?><p class="error"><?= h($loginError) ?></p><?php endif; ?>
    <button type="submit">Войти</button>
  </form>
<?php else: ?>
  <header>
    <div>
      <p>Бирка Маркет</p>
      <h1>Заявки<?= $fresh ? ' <em>' . $fresh . ' новых</em>' : '' ?></h1>
    </div>
    <a href="/admin/?logout=1">Выйти</a>
  </header>
  <main>
    <nav class="filters">
      <?php foreach ($labels as $id => $label): ?>
        <a class="<?= $filter === $id ? 'is-on' : '' ?>" href="/admin/?kind=<?= h($id) ?>"><?= h($label) ?></a>
      <?php endforeach; ?>
    </nav>
    <?php if (!$visible): ?>
      <p class="empty">Заявок в этом разделе пока нет.</p>
    <?php endif; ?>
    <?php foreach ($visible as $lead): ?>
      <?php
        $id = (string) $lead['id'];
        $open = $openId === $id;
        $seen = ($lead['status'] ?? 'new') === 'seen';
        $telegram = (string) ($lead['telegram'] ?? '');
        $mark = $telegram === 'sent' ? ' · ушло в Telegram' : ($telegram === 'failed' ? ' · Telegram не отправился' : '');
      ?>
      <article class="lead<?= $seen ? ' is-seen' : '' ?>">
        <summary>
          <a href="/admin/?kind=<?= h($filter) ?>&id=<?= h($open ? '' : $id) ?>">
            <span><?= h(titleOf($lead)) ?></span>
            <strong><?= h(trim((string) ($lead['name'] ?? '')) !== '' ? (string) $lead['name'] : 'Без имени') ?></strong>
            <small><?= h((string) ($lead['phone'] ?? '')) ?> · <?= h(moscow((string) ($lead['createdAt'] ?? ''))) ?> МСК<?= h($mark) ?></small>
          </a>
        </summary>
        <?php if ($open): ?>
          <div class="detail">
            <?php foreach ($fields as $key => $label): ?>
              <?php $value = trim((string) ($lead[$key] ?? '')); ?>
              <?php if ($value === '' || ($key === 'product' && ($value === 'callback' || $value === 'unknown'))): continue; endif; ?>
              <p><b><?= h($label) ?></b><?= h($value) ?></p>
            <?php endforeach; ?>
            <?php if (!empty($lead['file'])): ?>
              <p><a href="/admin/?file=<?= rawurlencode((string) $lead['file']) ?>">Скачать файл</a></p>
            <?php endif; ?>
            <form method="post">
              <input type="hidden" name="lead_id" value="<?= h($id) ?>">
              <input type="hidden" name="status" value="<?= $seen ? 'new' : 'seen' ?>">
              <button type="submit"><?= $seen ? 'Снова новая' : 'Просмотрено' ?></button>
            </form>
          </div>
        <?php endif; ?>
      </article>
    <?php endforeach; ?>
  </main>
<?php endif; ?>
</body>
</html>
