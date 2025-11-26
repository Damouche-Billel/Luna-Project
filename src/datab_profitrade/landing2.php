<?php
session_start();
echo "Hi! Welcome to our website ". $_SESSION['email'];

if(isset($_GET['logout']))
{
    session_destroy();
    header("location:login.php");
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .logout{
            border-radius:6px;
            background-color: pink;
            padding: 4px;
            cursor: pointer;
            background-color: red; 
        }

    </style>
</head>
<body>

    <form action="<?php $_SERVER['PHP_SELF'] ?>" method="get">
        <div>
            <input type="submit" name="logout" value="Logout" id="logout" class="logout">
        </div>
    </form>
    
</body>
</html>