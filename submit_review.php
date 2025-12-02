<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require 'database.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request']);
    exit;
}

$name = trim($_POST['name'] ?? '');
$rating = (int)($_POST['rating'] ?? 0);
$message = trim($_POST['message'] ?? '');

if ($name === '' || $message === '' || $rating < 1 || $rating > 5) {
    echo json_encode(['status' => 'error', 'message' => 'Bad input']);
    exit;
}

$stmt = $conn->prepare("INSERT INTO reviews (name, rating, message, approved) VALUES (?, ?, ?, 1)");
$stmt->bind_param("sis", $name, $rating, $message);

if ($stmt->execute()) {
    echo json_encode(['status' => 'ok', 'message' => 'Thanks for your review!']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'DB error']);
}
$stmt->close();
$conn->close();
