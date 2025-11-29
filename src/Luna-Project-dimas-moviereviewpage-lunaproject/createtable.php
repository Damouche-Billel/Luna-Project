<?php
include_once "database_connection.php";
$sql="CREATE TABLE reviews(
    id INT(12) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fname VARCHAR(30) NOT NULL,
    lname VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    review_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);";

    $create_table=mysqli_query($conn, $sql);
    if($create_table)
    {
        echo "Table created successfully";
    } 
    else {
        echo "Error creating table: " . mysqli_error($conn);
    }

?>