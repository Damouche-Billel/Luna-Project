<?php
include_once "../database.php";

if (!$conn) {
    die('Database connection failed.');
}

$sql = sprintf(
    "CREATE TABLE IF NOT EXISTS `%s`.`reviews` (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    rating INT NOT NULL,
    message TEXT NOT NULL,
    approved TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);",
    DB_NAME
);

    $create_table=mysqli_query($conn, $sql);
    if($create_table)
    {
        echo "Table created successfully";
    } 
    else {
        echo "Error creating table: " . mysqli_error($conn);
    }

?>

