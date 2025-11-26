<?php
include_once "database_connection.php";

$sql = "ALTER TABLE traders_beginners ADD photo VARCHAR(255)";

if (mysqli_query($conn, $sql)) {
    echo "✅ Column 'photo' added successfully.";
} else {
    echo "❌ Error adding column:" . mysqli_error($conn);
}
?>
