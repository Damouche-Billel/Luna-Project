<?php
require './database.php';


$name = $_POST['name'];
$rating = $_POST['rating'];
$message = $_POST['message'];


$stmt = $conn->prepare("INSERT INTO reviews (name, rating, message) VALUES (?, ?, ?)");
$stmt->bind_param("sis", $name, $rating, $message);
$stmt->execute();
$stmt->close();


echo "success";
?>