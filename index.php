<?php
/**
 * חלק מהשרתים מחפשים index.php לפני index.html — קובץ זה מעביר לתוכן האתר.
 */
header('Content-Type: text/html; charset=utf-8');
$index = __DIR__ . '/index.html';
if (is_file($index)) {
    readfile($index);
    exit;
}
http_response_code(404);
echo 'Not found';
