<?php
include_once "database_connection.php";
$sql="CREATE TABLE traders_beginners(
    id INT(12) NOT NULL AUTO_INCREMENT,
    email VARCHAR(30) NOT NULL,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(255) NOT NULL,
    fname VARCHAR(30) NOT NULL,
    lname VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);";

    $create_table=mysqli_query($conn, $sql);
    if($create_table)
    {
        echo "table created successfully";
    } 
    else {
        echo "table not created successfully".mysqli_error($conn);
    }

?>