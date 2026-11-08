<?php
declare(strict_types=1);

if (realpath((string) ($_SERVER['SCRIPT_FILENAME'] ?? '')) === __FILE__) {
    http_response_code(404);
    exit;
}

// Скопируйте этот файл на хостинге в leads/telegram.php и впишите свои значения.
// token — строка от @BotFather. chatId — число из getUpdates, для группы оно отрицательное.
return [
    'token' => 'ВСТАВЬТЕ_ТОКЕН',
    'chatId' => 'ВСТАВЬТЕ_CHAT_ID',
];
