<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// IMPORTANT: FIRST include PHPMailer classes
require '../phpmailer/src/PHPMailer.php';
require '../phpmailer/src/SMTP.php';
require '../phpmailer/src/Exception.php';

// THEN declare namespaces
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// then include your database
require '../database.php';

header('Content-Type: application/json; charset=utf-8');

// Check request method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status'=>'error','message'=>'Invalid request']);
    exit;
}

// Read POST data safely
$name    = trim($_POST['name'] ?? '');
$rating  = (int)($_POST['rating'] ?? 0);
$message = trim($_POST['message'] ?? '');

if ($name === '' || $message === '' || $rating < 1 || $rating > 5) {
    echo json_encode(['status'=>'error','message'=>'Invalid input']);
    exit;
}

// Insert into database
$stmt = $conn->prepare("INSERT INTO reviews (name, rating, message, approved) VALUES (?, ?, ?, 1)");
$stmt->bind_param("sis", $name, $rating, $message);

if (!$stmt->execute()) {
    echo json_encode(['status'=>'error','message'=>'DB error']);
    exit;
}

// ========== SEND EMAIL ==========

/* BUGGY CODE - PLEASE FIX LATER
$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.ukr.net';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'knzv@ukr.net';
    $mail->Password   = 'NfEubX5M6VrNEqdC';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;

    $mail->setFrom('knzv@ukr.net', 'LUNA Website');
    $mail->addAddress('knzv@ukr.net'); // admin email

    $mail->isHTML(true);
    $mail->Subject = "New Review Submitted";

    $safeMessage = nl2br(htmlspecialchars($message));

    $mail->Body = "
        <h2>New Review Submitted</h2>
        <p><strong>Name:</strong> {$name}</p>
        <p><strong>Rating:</strong> {$rating} / 5</p>
        <p><strong>Message:</strong></p>
        <p>{$safeMessage}</p>
        <hr>
        <p>Sent automatically from LUNA website.</p>
    ";

    $mail->send();

} catch (Exception $e) {
    // Do not break JSON!
    // Optional: log error to file
}*/

// SUCCESS response
echo json_encode(['status' => 'ok']);

// Close DB
$stmt->close();
$conn->close();
