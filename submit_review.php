<?php
// submit_review.php
require './database.php';

header('Content-Type: application/json; charset=utf-8');

// Разрешаем только POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'status'  => 'error',
        'message' => 'Invalid request method'
    ]);
    exit;
}

// Безопасно читаем поля (чтобы не было Undefined array key)
$name    = trim($_POST['name']    ?? '');
$rating  = (int) ($_POST['rating'] ?? 0);
$message = trim($_POST['message'] ?? '');

// Простая валидация
if ($name === '' || $message === '' || $rating < 1 || $rating > 5) {
    echo json_encode([
        'status'  => 'error',
        'message' => 'Please fill in all fields and select a rating from 1 to 5.'
    ]);
    exit;
}

// Готовим запрос: сразу approved = 1, чтобы отзыв был виден на сайте
$stmt = $conn->prepare("INSERT INTO reviews (name, rating, message, approved) VALUES (?, ?, ?, 1)");

if (!$stmt) {
    echo json_encode([
        'status'  => 'error',
        'message' => 'Database error (prepare).'
    ]);
    exit;
}

$stmt->bind_param("sis", $name, $rating, $message);

if ($stmt->execute()) {
    echo json_encode([
        'status'  => 'ok',
        'message' => 'Thanks you for your review!'
    ]);
} else {
    echo json_encode([
        'status'  => 'error',
        'message' => 'Database error (execute).'
    ]);
}

$stmt->close();
$conn->close();
