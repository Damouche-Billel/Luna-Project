<?php
if(isset($_GET['submit']))
{
    if((!empty($_GET['email']))&&(!empty($_GET['password'])))
    {
        session_start();

        $_SESSION['email']=$_GET['email'];
        // $_SESSION['password']=$_GET['password'];
        $pass=$_GET['password'];

        echo $_SESSION['email'];
        // echo $_SESSION['password'];

        header("location:dashboard.php");
    } else {
        echo ("Please enter email/password");
    }
    // $name=$_GET['email'];
    // $pass=$_GET['password'];
}
?>

<?php
session_start();
include_once "database_connection.php";

// Если форма отправлена
if (isset($_POST['login'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Поиск пользователя по email
    $query = "SELECT * FROM traders_beginners WHERE email = '$email'";
    $result = mysqli_query($conn, $query);

    if ($result && mysqli_num_rows($result) > 0) {
        $user = mysqli_fetch_assoc($result);

        // Проверка пароля
        if ($password === $user['password']) { 
            $_SESSION['user_id'] = $user['id']; // сохранить ID в сессии
            header("Location: dashboard.php");
            exit();
        } else {
            $error = "❌ Incorrect password.";
        }
    } else {
        $error = "❌ User not found.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f9f8f4;
        }

        .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 2rem;
            margin-left: 6rem;
            margin-right: 6rem;
        }

        .logo-nav {
            display: flex;
            align-items: center;
            gap: 40px;
        }

        header {
            border-bottom: 1px solid #f4f4f4;
            background-color: #f8f5e2;
        }

        .logo img {
            width: 108px;
            height: 70px;
            border-radius: 10px;
        }

        .burger {
            display: none;
            /* По умолчанию скрыта на больших экранах */
            flex-direction: column;
            gap: 5px;
            cursor: pointer;
        }

        .burger span {
            display: block;
            width: 25px;
            height: 3px;
            background-color: #3A2A06;
            transition: all 0.3s ease;
        }

        .menu {
            display: flex;
            /* desktop */
        }

        .menu ul {
            display: flex;
            gap: 2rem;
            list-style: none;
        }

        .menu a {
            text-decoration: none;
            color: #333;
            font-weight: 600;
        }

        .auth-buttons button {
            display: flex;
            flex-direction: column;
            padding: 0.5rem 1rem;
            gap: 1.5rem;
            font-size: 16px;
            font-weight: 600;
            border: none;
        }

        .auth-buttons .signup {
            background-color: #3A2A06;
            font-size: 16px;
            font-weight: bold;
            color: #CD9441;
            border-radius: 6px;
            padding: 10px;
            width: auto;
            transition: background-color 0.3s ease, color 0.3s ease;
            cursor: pointer;
        }

        .auth-buttons .signup:hover {
            background-color: #777355;
            color: white;
            cursor: pointer;
            transition: background-color 0.3s ease, color 0.3s ease;
        }

        .login {
            display: flex;
            justify-content: center;
        }

        .login h2 {
            display: flex;
            justify-content: flex-start;
            margin-top: 50px;
            margin-bottom: 10px;
            font-size: 32px;
            font-weight: 400;
        }

        .login-form {
            display: grid;
            /* justify-content: flex-start; */
            align-content: flex-start;
            width: 500px;
            height: auto;
            border: 1px solid rgb(188, 185, 185);
            border-radius: 10px;
            padding: 20px;
            background-color: rgb(225, 221, 206);
            margin-bottom: 100px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .login-form label {
            font-size: 16px;
            font-weight: 600;
            color: #5a5858;
            margin-top: 10px;
            margin-bottom: 6px;
        }

        .login-form input {
            border: 1px solid rgb(188, 185, 185);
            border-radius: 6px;
            padding: 8px;
            /* margin-bottom: 14px; */
            width: 100%;
            font-size: 16px;
            outline: none;
            box-sizing: border-box;
        }

        .login-form input:focus {
            border-color: #0064f9;
        }

        .login-form div {
            display: flex;
            flex-direction: column;
        }

        .message .error {
            font-size: 10px;
            height: 6px;
            margin-top: 6px;
            display: none;
        }

        .login-form .message {
            color: gray;
            display: none;
        }

        .error {
            color: red;
        }

        .login-form button {
            background-color: #3A2A06;
            font-size: 18px;
            font-weight: bold;
            color: #CD9441;
            border-radius: 8px;
            margin-top: 40px;
            margin-bottom: 10px;
            padding: 6px;
            width: auto;
            transition: background-color 0.3s ease, color 0.3s ease;
        }

        .login-form button:hover {
            background-color: #777355;
            color: white;
            cursor: pointer;
        }

        footer {
            background-color: #222;
            color: #fff;
            padding: 2rem;
            font-size: 14px;
        }

        .footer-container {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            border-bottom: 1px solid #444;
            padding-bottom: 2rem;
        }

        .footer-column {
            flex: 1;
            margin: 0 1rem;
        }

        .footer-column img {
            width: 138px;
            height: 96px;
            margin-bottom: 1rem;
            border-radius: 10px;
        }

        .footer-column h3 {
            font-size: 16px;
            margin-bottom: 1rem;
            color: #f0c040;
        }

        .footer-column ul {
            list-style: none;
            padding: 0;
        }

        .footer-column ul li {
            margin-bottom: 0.5rem;
        }

        .footer-column ul li a {
            color: #fff;
            text-decoration: none;
        }

        .footer-column ul li a:hover {
            text-decoration: underline;
        }

        .footer-column p {
            margin-bottom: 0.5rem;
        }

        .footer-column p a {
            color: #f0c040;
            text-decoration: none;
        }

        .footer-column p a:hover {
            text-decoration: underline;
        }

        .footer-disclaimer {
            margin-top: 2rem;
            font-size: 12px;
            color: #aaa;
            line-height: 1.5;
        }

        @media (max-width: 481px) {
            body {
                color: rgb(48, 113, 18);
            }

            /* Показываем бургер-иконку */
            .burger {
                display: flex
            }

            /* Скрываем меню */
            .menu {
                display: none;
                flex-direction: column;
                position: absolute;
                top: 60px;
                left: 0;
                width: 100%;
                background-color: #333;
                padding: 10px 0;
                text-align: center;
            }

            .menu .active {
                display: flex;
                /* Показываем при активации */
            }

            .menu ul {
                flex-direction: column;
                gap: 10px;
            }

            .menu a {
                font-size: 18px;
            }

            /* Анимация для бургер-иконки */
            .burger.active span:nth-child(1) {
                transform: translateY(8px) rotate(45deg);
            }

            .burger.active span:nth-child(2) {
                opacity: 0;
            }

            .burger.active span:nth-child(3) {
                transform: translateY(-8px) rotate(-45deg);
            }

            header {
                text-align: center;
            }

            .container {
                margin: 0;
                padding: 0.4rem 0.8rem;
                justify-content: space-around;
            }

            .logo img {
                width: 60px;
                height: auto;
                display: flex;
                justify-items: start;
            }

            nav ul {
                align-items: center;
            }

            .auth-buttons button {
                padding: 0.2rem 0.4rem;
                font-size: 12px;
                font-weight: 600;
            }

            .hero {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 40vh;
            }

            .hero h1 {
                max-width: 80%;
                margin-bottom: 0.5rem;
                font-size: 20px;
            }

            .hero p {
                max-width: 70%;
                font-size: 12px;
            }

            .form input {
                width: 170px;
                height: 32px;
                padding: 10px;
                border: 1px solid #ccc;
                font-size: 12px;
            }

            .form button {
                width: 100px;
                height: 32px;
                display: block;
                text-align: center;

                padding: 6px 4px;
                font-size: 12px;
                font-weight: 600;
            }

            .reviews {
                gap: 6px;
            }

            .reviews span {
                font-size: 8px;
            }

            .reviews .stars {
                width: 80px;
                height: 18px;
            }

            .trustpilot img {
                width: 16px;
                height: 20px;
            }

            .video-container {
                width: 76%;
            }

            .video-container img {
                display: none;
            }

            video {
                width: 100%;
                height: auto;
                border-radius: 10px;
            }

            .tools-logos {
                gap: 16px;
            }

            .tools p {
                margin-bottom: 30px;
            }

            .tools-logos img {
                width: 142px;
                height: auto;
                margin: 0rem 0rem;
                margin-top: 0px;

                /* width: 100px;
                height: auto; */
            }

            .plans-buttons button {
                width: 168px;
                height: 46px;
                font-size: 14px;
            }

            .plan-cards {
                flex-direction: column;
                gap: 1rem;
            }

            .card-header h3 {
                font-size: 30px;
            }

            .career {
                width: 80%;
                padding: 1rem;
                height: 160px;
                gap: 24px;
            }

            .career h1 {
                font-size: 20px;
            }

            .career input {
                width: 220px;
                height: 34px;
                padding: 10px;
                font-size: 12px;
            }

            .career button {
                width: 90px;
                height: 34px;
                padding: 4px 4px;
                font-size: 12px;
            }

            .faq h2 {
                font-size: 30px;
            }

            .list li {
                font-size: 16px;
                margin-top: 10px;
            }

            .questions img {
                display: none;
            }

            .contact {
                margin-left: 10px;
                background-color: #F1F6F7;
                height: 26vh;
                gap: 26px;

                background-color: #F1F6F7;
                height: 20vh;
                gap: 10px;
            }

            .contact h2 {
                font-size: 14px;
                width: 94%;
                padding: 20px;
            }

            .contact button {
                width: 160px;
                height: 40px;
                padding: 2px;
                gap: 6px;
            }

            .contact button img {
                width: 34px;
                height: 18px;
            }

            .contact button span {
                font-size: 12px;
            }

            .footer-column {
                flex: 1;
                margin: 0 0.2rem;
            }

            .footer-column img {
                width: 70px;
                height: auto;
            }

            .footer-column h3 {
                font-size: 14px;
                margin-bottom: 1rem;
            }

            .footer-column ul li a {
                font-size: 12px;
            }

            .footer-column p {
                font-size: 12px;
            }

            .footer-disclaimer p {
                font-size: 10px;
            }
        }

        @media (min-width: 481px) and (max-width: 768px) {
            body {
                color: rgb(17, 65, 38);
            }

            .burger {
                display: flex
            }

            /* .burger span {
                display: block;
                width: 25px;
                height: 3px;
                background-color: #fff;
                transition: all 0.3s ease;
            } */

            .menu {
                display: none;
                flex-direction: column;
                position: absolute;
                top: 60px;
                left: 0;
                width: 100%;
                background-color: #333;
                padding: 10px 0;
                text-align: center;
            }

            .menu .active {
                display: flex;
            }

            .menu ul {
                flex-direction: column;
                gap: 10px;
            }

            .menu a {
                font-size: 18px;
            }

            .burger.active span:nth-child(1) {
                transform: translateY(8px) rotate(45deg);
            }

            .burger.active span:nth-child(2) {
                opacity: 0;
            }

            .burger.active span:nth-child(3) {
                transform: translateY(-8px) rotate(-45deg);
            }

            header {
                text-align: center;
            }

            .container {
                margin: 0;
                padding: 1rem;
            }

            .logo img {
                width: 70px;
                height: auto;
            }

            nav ul {
                align-items: center;
            }

            .auth-buttons button {
                padding: 0.5rem 1rem;
                gap: 1rem;
                font-size: 16px;
                font-weight: 600;
            }

            .hero {
                display: flex;
                /* flex-direction: column; */
                /* justify-content: center; */
                /* align-items: center; */
                height: 40vh;
                /* text-align: center; */
                /* padding: 0 20px; */
                /* margin-top: 16px; */
            }

            .hero h1 {
                max-width: 80%;
                margin-bottom: 0.5rem;
                font-size: 28px;
            }

            .hero p {
                max-width: 60%;
                font-size: 16px;
            }

            .form input {
                width: 250px;
                height: 32px;
                padding: 10px;
                border: 1px solid #ccc;
            }

            .form button {
                height: 32px;
                padding: 8px 6px;
                font-size: 12px;
                font-weight: 600;
            }

            .video-container {
                width: 70%;
            }

            video {
                width: 100%;
                height: auto;
                border-radius: 10px;
            }

            .video-container img {
                display: none;
            }

            .reviews span {
                font-size: 12px;
            }

            .tools-logos {
                gap: 16px;
            }

            .tools p {
                margin-bottom: 30px;
            }

            .tools-logos img {
                width: 142px;
                height: auto;
                margin: 0rem 0rem;
                margin-top: 0px;

                /* width: 100px;
                height: auto; */
            }

            .plan-cards {
                flex-direction: column;
                gap: 1rem;
            }

            .career {
                width: 80%;
                padding: 1rem;
                height: 226px;
                gap: 28px;
            }

            .career h1 {
                font-size: 26px;
            }

            .career input {
                width: 260px;
                height: 42px;
                padding: 10px;
            }

            .career button {
                width: 120px;
                height: 42px;
                padding: 4px 4px;
                font-size: 16px;
                font-weight: 600;
            }

            .questions img {
                display: none;
            }

            .contact {
                margin-left: 10px;
                background-color: #F1F6F7;
                height: 26vh;
                gap: 26px;
            }

            .contact h2 {
                font-size: 20px;
                width: 80%;
                padding: 20px;
            }

            .contact button {
                width: 160px;
                height: 42px;
                padding: 2px;
                gap: 10px;
            }

            .contact button img {
                width: 38px;
                height: 22px;
            }

            .contact button span {
                font-size: 16px;
            }

            /* footer {
                text-align: center;
            } */

            .footer-column img {
                width: 80px;
                height: auto;
            }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
            body {
                color: rgb(105, 91, 91);
            }

            .container {
                margin: 0;
                padding: 1rem;
            }

            .logo img {
                width: 90px;
                height: auto;
            }

            nav ul {
                display: flex;
                gap: 1rem;
            }

            .auth-buttons {
                display: flex;
                gap: 8px;
            }

            .hero {
                height: 44vh;
            }

            .hero h1 {
                font-size: 32px;
                max-width: 70%;
            }

            .hero p {
                font-size: 16px;
                max-width: 70%;
            }

            .video-container {
                width: 80%;
                max-width: 900px;
            }

            video {
                width: 100%;
                height: auto;
                border-radius: 10px;
            }

            .tools {
                height: 44vh;
            }

            .tools p {
                margin-bottom: 30px;
            }

            .tools-logos img {
                width: 180px;
                height: auto;
                margin: 0rem 0rem;
                margin-top: 0px;
            }

            .card-header h3 {
                font-size: 30px;
            }

            .card-body button {
                width: 214px;
                height: 44px;
                color: #d6c4ab;
                cursor: pointer;
            }

            .career {
                width: 80%;
                padding: 1rem;
                height: 236px;
            }

            .career h1 {
                font-size: 28px;
            }

            .career input {
                width: 280px;
                height: 42px;
                padding: 10px;
            }

            .career button {
                width: 120px;
                height: 42px;
                padding: 4px 4px;
                font-size: 16px;
                font-weight: 600;
            }

            .contact {
                /* width: 90%; */
                margin-left: 0;
                background-color: #e0f5f9;
                height: 26vh;
                gap: 60px;
            }

            .contact h2 {
                font-size: 24px;
                width: 76%;
            }

            .contact button {
                width: 204px;
                height: 48px;
                padding: 2px;
                display: flex;
                gap: 8px;
            }

            .contact button img {
                width: 40px;
                height: 24px;
            }

            .contact button span {
                font-size: 18px;
            }
        }

        @media (min-width: 1025px) and (max-width: 1200px) {
            body {
                color: rgb(96, 56, 21);
            }

            .container {
                margin-left: 8rem;
                margin-right: 8rem;
            }

            .hero h1 {
                font-size: 36px;
                max-width: 70%;
            }

            .hero p {
                font-size: 22px;
                max-width: 50%;
            }

            .tools p {
                margin-bottom: 50px;
            }

            .tools-logos img {
                width: 220px;
                height: 130px;
                margin: 0 0.3rem;
                margin-top: 0px;
            }

            .plan-cards {
                gap: 2rem;
            }

            .career {
                width: 80%;
                height: 266px;
                background-color: #2B271E;
                border-radius: 10px;
                display: grid;
                /* justify-content: center;
                align-items: center;
                align-content: center;
                justify-items: center; */
                margin: 8rem auto;
                gap: 28px;
            }
        }
    </style>
</head>

<body>
    <?php include "header.php" ; 
    ?>

    <main>
        <section class="login">
            <div>
                <h2>Log in</h2>

                <?php if (!empty($error)): ?>
                    <p class="error"><?= $error ?></p>
                <?php endif; ?>

                <!-- <form action="<?php $_SERVER['PHP_SELF'] ?>" method="get" class="login-form"> -->
                
                <form action="" method="POST" class="login-form">
                    <div>
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="youremail@gmail.com" required>
                        <span class="message" id="emailMessage">Enter your email</span>
                        <span class="error" id="emailError"></span>
                    </div>

                    <div>
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" required>
                        <span class="message" id="passwordMessage">Enter your password</span>
                        <span class="error" id="passwordError"></span>
                    </div>

                    <button type="submit" id="submit" name="login">Log in</button>
                </form>

                <script src="">

                </script>
            </div>
        </section>
    </main>

    <?php include "footer.php" ; 
    ?>

    <script src="script.js">
    </script>
</body>

</html>


