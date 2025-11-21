<?php
session_start();
include "database_connection.php";

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

if (isset($_POST['change_password'])) {
    $user_id = $_SESSION['user_id'];
    $old_password = $_POST['old_password'];
    $new_password = $_POST['new_password'];

    $sql = "SELECT password FROM traders_beginners WHERE id = $user_id";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_assoc($result);

    if ($row && password_verify($old_password, $row['password'])) {
        $hashed = password_hash($new_password, PASSWORD_DEFAULT);
        $update_sql = "UPDATE traders_beginners SET password='$hashed' WHERE id=$user_id";
        mysqli_query($conn, $update_sql);
        echo "Пароль успешно изменен.";
    } else {
        echo "Старый пароль неверен.";
    }
}
?>

<form method="POST">
    <input type="password" name="old_password" placeholder="Старый пароль" required><br>
    <input type="password" name="new_password" placeholder="Новый пароль" required><br>
    <button type="submit" name="change_password">Сменить пароль</button>
</form>
