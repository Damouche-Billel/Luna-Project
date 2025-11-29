<?php
/**
 * Email Service for LUNA Newsletter
 * Handles sending welcome emails via Brevo API
 */

require_once __DIR__ . '/config.php';

/**
 * Send welcome email to new subscriber using Brevo API
 * @param string $email Recipient email address
 * @param bool $isReactivation Whether this is a reactivation (true) or new subscription (false)
 * @return bool True on success
 */
function sendWelcomeEmail($email, $isReactivation = false) {
    // Brevo API configuration
    $rest_api_key = BREVO_API_KEY;
    $api_url = 'https://api.brevo.com/v3/smtp/email';
    
    $api_user = '9bc124001@smtp-brevo.com';
    $api_pass = BREVO_API_PASSWORD;
    
    // Email subject and content
    $subject = $isReactivation ? 'Welcome Back to LUNA' : 'Welcome to LUNA';
    
    // Load email template
    $templatePath = __DIR__ . '/email-templates/welcome-email.html';
    $htmlContent = file_get_contents($templatePath);
    
    // Replace placeholders
    $title = $isReactivation ? 'Welcome Back' : 'Welcome to LUNA';
    $greetingMessage = $isReactivation 
        ? 'We\'re delighted to have you back. Your subscription to the LUNA newsletter has been successfully reactivated.'
        : 'Thank you for joining our community. Your subscription to the LUNA newsletter is now active.';
    
    $htmlContent = str_replace('{{TITLE}}', $title, $htmlContent);
    $htmlContent = str_replace('{{GREETING_MESSAGE}}', $greetingMessage, $htmlContent);

    // Plain text version
    $textContent = ($isReactivation ? 'Welcome Back to LUNA!' : 'Welcome to LUNA!') . "\n\n"
        . ($isReactivation 
            ? "We're thrilled to have you back! You've successfully reactivated your subscription to the LUNA newsletter.\n\n"
            : "Thank you for joining the LUNA community! You've successfully subscribed to our newsletter.\n\n")
        . "You'll be the first to receive:\n"
        . "• Exclusive behind-the-scenes content\n"
        . "• Festival updates and screenings\n"
        . "• Director insights and stories from the set\n"
        . "• Early access to new releases\n\n"
        . "Experience love, passion, and emotion through the lens of London nights.\n\n"
        . "LUNA - A Short Romance Film © 2025";
    
    // Prepare API request data
    $data = array(
        'sender' => array(
            'name' => 'LUNA Film',
            'email' => 'damouchee@outlook.com'
        ),
        'to' => array(
            array(
                'email' => $email
            )
        ),
        'subject' => $subject,
        'htmlContent' => $htmlContent,
        'textContent' => $textContent
    );
    
    // Send via Brevo API using cURL
    if (!function_exists('curl_init')) {
        error_log("cURL not available - email not sent");
        return false;
    }
    
    $ch = curl_init($api_url);
    
    if ($ch === false) {
        error_log("Failed to initialize cURL");
        return false;
    }
    
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'accept: application/json',
        'api-key: ' . $rest_api_key,
        'content-type: application/json'
    ));
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    
    curl_close($ch);
    
    error_log("Email API Response - HTTP Code: $http_code, Response: $response");
    
    if ($error) {
        error_log("Email sending failed - cURL error: " . $error);
        return false;
    }
    
    if ($http_code >= 200 && $http_code < 300) {
        error_log("Email sent successfully to: $email");
        return true;
    } else {
        error_log("Email API error (HTTP $http_code): " . $response);
        return false;
    }
}
?>
