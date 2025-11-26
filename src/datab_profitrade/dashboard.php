<?php
session_start();
include_once "database_connection.php";

// <!-- Logout -->
if (isset($_GET['logout'])) {
    session_destroy();
    header("Location: login.php");
    exit();
}

// Проверка аутентификации
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

$user_id = $_SESSION['user_id'];

// Получение данных пользователя
$query = "SELECT * FROM traders_beginners WHERE id = $user_id";
$result = mysqli_query($conn, $query);
$user = mysqli_fetch_assoc($result);

?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Dashboard</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Roboto', sans-serif;
            background-color: #f4f7fb;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 900px;
            margin: 20px auto;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 6px;
            padding: 20px 30px;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .header img {
            max-height: 150px;
            width: 220px;
            border: 1px solid goldenrod;
            background-color: #fff;
            border-radius: 10px;
            margin-top: 20px;
        }

        .user-info {
            display: flex;
            gap: 6px;
            align-items: center;
            font-size: 16px;
            margin-bottom: 10px;
        }

        .user-info img{
            border-radius: 50%;
        }

        .nav {
            display: flex;
            flex-wrap: wrap;
            border: 1px solid #ccc;
            border-radius: 5px;
            overflow: hidden;
            margin-bottom: 25px;
        }

        .nav button {
            flex: 1;
            padding: 10px;
            border: 1px solid goldenrod;
            background-color: #f9f9f9;
            color: goldenrod;
            cursor: pointer;
            font-size: 14px;
            transition: background-color 0.2s ease;
        }

        .nav button:hover {
            background-color: goldenrod;
            color: #fff;
            font-weight: 600;
        }

        .nav button a {
            text-decoration: none;
            color: goldenrod;
        }

        .nav button a:hover {
            background-color: goldenrod;
            color: #fff;
            font-weight: 600;
        }

        .nav .active {
            background-color: goldenrod;
            color: white;
            font-weight: bold;
        }

        h2 {
            font-size: 16px;
            margin-bottom: 15px;
        }

        .section {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
        }

        .box {
            flex: 1;
            min-width: 250px;
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 6px;
            border: 1px solid #ddd;
        }

        .white {
            background-color: #ffffff;
        }

        .box h3 {
            font-size: 16px;
            font-weight: 400;
            margin-top: 0;
            margin-bottom: 10px;
        }

        .box ul{
            margin: 0 auto;
        }

        .box li {
            list-style: none;
        }

        .box a {
            list-style: none;
            color: #407cb0;
            font-size: 14px;
        }

        .box a:hover {
            text-decoration: none;
        }

        .box p {
            font-size: 14px;
        }

        .box label {
            font-size: 14px;
        }

        .rithmic-password {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .footer {
            text-align: center;
            font-size: 12px;
            color: #999;
            margin-top: 30px;
        }

        input[type="checkbox"] {
            margin-right: 4px;
        }
    </style>
</head>

<body>

    <div class="header">
        <img src="image/logo1.png" alt="Profitrade Logo">
    </div>

    <div class="container">
        <div class="user-info">
            <img src="//www.gravatar.com/avatar/eb3004e547e5b5623e01dec076c23da0?s=24&amp;d=mm">
            <span> <?= htmlspecialchars($user['username']) ?></span> 

            <form action="<?php $_SERVER['PHP_SELF'] ?>" method="get">
                <a href="?logout=1">Logout</a>
            </form>
        </div>

        <div class="nav">
            <button class="active">Dashboard</button>
            <button>Account SignUp</button>
            <button>Payouts</button>
            <button>Market Depth</button>
            <button>Helpdesk</button>
            <button><a href="profile.php">Profile</a></button>
        </div>

        <div>
            <h2>Welcome, <?= htmlspecialchars($user['fname']) ?>!</h2>
        </div>

        <h2>Your Membership Information</h2>

        <div class="section">
            <div class="box">
                <h3>Active Subscriptions</h3>
                <div class="box white">
                    <p><strong>You have no active subscriptions</strong></p>
                    <p>Please use <a href="#">Add/Renew subscription</a> form to order or renew subscription.</p>
                </div>
            </div>

            <div class="box">
                <h3>Useful Links</h3>
                <div class="box white">
                    <ul style="padding-left: 18px;">
                        <li>
                            <form action="<?php $_SERVER['PHP_SELF'] ?>" method="get"><a href="?logout=1">Logout</a>
                            </form>
                        </li>
                        <li><a href="profile.php">Change Password/Edit Profile</a></li>
                        <li><a href="#">Payments History</a></li>
                        <li><a href="#">Update Credit Card Info</a></li>
                        <li><a href="#">Advertise our website to your friends and earn money</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="box">
                <h3>Rithmic Account</h3>
                <div class="box white">
                    <p>Username: <strong>PT01234</strong></p>
                    <div class="rithmic-password">
                        <p>Password: •••••••••</p>
                        <a href="#">👁</a>
                    </div>
                </div>

            </div>

            <div class="box">
                <h3>E-Mail Preferences</h3>
                <div class="box white">
                    <label><input type="checkbox"> Unsubscribe from all e-mail messages</label>
                </div>

            </div>
        </div>

        <div class="box" style="margin-top: 20px;">
            <h3>Ninja Trader</h3>
            <div class="box white">
                <p><strong>Free Ninja Trader License Key</strong></p>
                <p>@RPT-PROF-ITR1-TRAD-E729-K1L2-1H21-DB77</p>
                <a href="#">NinjaTrader 8 on Mobile</a>
            </div>

        </div>

        <div class="footer">
            Created on <a href="#">the www</a><br>
            © 2025 - Profitrade
        </div>
    </div>

</body>

</html>