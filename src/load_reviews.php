<?php
// load_reviews.php
require '../database.php';

header('Content-Type: application/json; charset=utf-8');

// выбираем только одобренные отзывы
$sql = "SELECT name, rating, message, created_at 
        FROM reviews 
        WHERE approved = 1 
        ORDER BY id DESC";

$result = $conn->query($sql);

$reviews = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $reviews[] = [
            'name'    => $row['name'],
            'rating'  => (int)$row['rating'],
            'message' => $row['message'],
            'created' => $row['created_at'],
        ];
    }
}

echo json_encode($reviews, JSON_UNESCAPED_UNICODE);
$conn->close();
