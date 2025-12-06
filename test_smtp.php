<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './phpmailer/src/PHPMailer.php';
require './phpmailer/src/SMTP.php';
require './phpmailer/src/Exception.php';

$mail = new PHPMailer(true);

try {
    echo "<h3>SMTP Test</h3>";

    $mail->isSMTP();
    $mail->Host       = 'smtp.ukr.net';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'knzv@ukr.net';    
    $mail->Password   = 'NfEubX5M6VrNEqdC';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;

    $mail->setFrom('knzv@ukr.net', 'Test');
    $mail->addAddress('knzv@ukr.net');

    $mail->isHTML(true);
    $mail->Subject = 'SMTP Test';
    $mail->Body    = 'SMTP test email';

    echo "<p>Trying to send email...</p>";

    $mail->send();

    echo "<p style='color: green;'>SUCCESS — mail sent!</p>";

} catch (Exception $e) {
    echo "<p style='color: red;'><b>SMTP ERROR:</b><br>";
    echo $e->getMessage() . "</p>";
}
