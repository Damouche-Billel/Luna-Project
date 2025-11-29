<?php
include_once "database_connection.php";
$sql="CREATE TABLE reviews(
    id INT(12) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    rating INT NOT NULL,
    message TEXT NOT NULL,
    approved TINYINT(1) DEFAULT 0,
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

