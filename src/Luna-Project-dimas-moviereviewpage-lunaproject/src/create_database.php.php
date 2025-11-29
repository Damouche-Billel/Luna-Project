<?php
$servername="localhost";
$username="root";
$password="";

$conn=mysqli_connect($servername, $username, $password);
if($conn)
{
    echo "connect with server successfully<br>";
} else {
    echo "Connection failed: " . mysqli_connect_error();
    exit;
}    


$sql="CREATE DATABASE luna_reviews_db";
$create_db=mysqli_query($conn, $sql);
if($create_db)
{
    echo "Database created successfully";
} else {
    echo "Error creating database:". mysqli_error($conn);
}
?>
