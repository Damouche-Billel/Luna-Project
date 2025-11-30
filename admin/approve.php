<?php
require '../database.php';
$id = $_GET['id'];
$conn->query("UPDATE reviews SET approved = 1 WHERE id = $id");
header('Location: panel.php');
?>