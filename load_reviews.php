<?php
require './database.php';


$result = $conn->query("SELECT * FROM reviews WHERE approved = 1 ORDER BY id DESC");
$reviews = [];


while ($row = $result->fetch_assoc()) {
$reviews[] = $row;
}


echo json_encode($reviews);
?>