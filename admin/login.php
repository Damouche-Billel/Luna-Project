<?php
session_start();


if ($_POST) {
if ($_POST['login'] === 'admin' && $_POST['pass'] === 'admin123') {
$_SESSION['admin'] = true;
header('Location: panel.php');
exit;
}
echo "<p style='color:red'>Wrong login</p>";
}
?>


<form method="POST">
<input name="login" placeholder="Login">
<input name="pass" type="password" placeholder="Password">
<button>Login</button>
</form>