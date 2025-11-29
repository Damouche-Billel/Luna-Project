<?php
$servername="localhost";
$username="root";
$password="";
$database="profitrade";

$conn=mysqli_connect($servername, $username, $password, $database);
if(!$conn)
{
    die("Connection error". mysqli_connect_error());
} 

?>