<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

echo "<h3>PHPMailer loading test</h3>";

require './phpmailer/src/PHPMailer.php';
require './phpmailer/src/SMTP.php';
require './phpmailer/src/Exception.php';

echo "<p>PHPMailer included successfully</p>";
