<?php
$servername="localhost";
$username="root";
$password="";
$database="luna_reviews_db";

$conn=mysqli_connect($servername, $username, $password, $database);
if(!$conn)
{
    die("Connection error". mysqli_connect_error());
} 

?>