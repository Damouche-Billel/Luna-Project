<?php
/**
 * LUNA Newsletter Subscription API
 * Handles newsletter form submissions and stores emails in MySQL database
 */

// Set proper headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Enable error reporting for debugging (remove/adjust in production)
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// Central config (DB + Brevo)
require_once __DIR__ . '/../../config.php';

// Throw exceptions on mysqli errors so we can catch them below
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

// Email helper
require_once __DIR__ . '/email-service.php';

/**
 * Validate email address
 * @param string $email Email to validate
 * @return bool True if valid
 */
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Sanitize email input
 * @param string $email Email to sanitize
 * @return string Sanitized email
 */
function sanitizeEmail($email) {
    return strtolower(trim($email));
}

/**
 * Check if email already exists in database
 * @param mysqli $conn Database connection
 * @param string $email Email to check
 * @return array|null Row data if exists, null otherwise
 */
function emailExists($conn, $email) {
    $stmt = $conn->prepare("SELECT id, is_active FROM NewsletterEmails WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $stmt->close();
    
    return $row;
}

/**
 * Insert new email subscription
 * @param mysqli $conn Database connection
 * @param string $email Email to insert
 * @return bool True on success
 */
function insertEmail($conn, $email) {
    $stmt = $conn->prepare("INSERT INTO NewsletterEmails (email, is_active, created_at) VALUES (?, 1, NOW())");
    $stmt->bind_param("s", $email);
    $success = $stmt->execute();
    $stmt->close();
    
    return $success;
}

/**
 * Reactivate existing inactive email
 * @param mysqli $conn Database connection
 * @param string $email Email to reactivate
 * @return bool True on success
 */
function reactivateEmail($conn, $email) {
    $stmt = $conn->prepare("UPDATE NewsletterEmails SET is_active = 1, created_at = NOW() WHERE email = ?");
    $stmt->bind_param("s", $email);
    $success = $stmt->execute();
    $stmt->close();
    
    return $success;
}

/**
 * Send JSON response
 * @param bool $success Success status
 * @param string $message Response message
 * @param int $code HTTP status code
 */
function sendResponse($success, $message, $code = 200) {
    http_response_code($code);
    echo json_encode([
        'success' => $success,
        'message' => $message
    ]);
    exit();
}

// Main execution
try {
    // Connect to database using shared config
    $conn = getDBConnection();
    if (!$conn) {
        sendResponse(false, 'Database connection failed.', 500);
    }
    $conn->set_charset('utf8mb4');

    // Only accept POST requests
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        sendResponse(false, 'Invalid request method. Only POST is allowed.', 405);
    }
    
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Get email from input
    $email = isset($input['email']) ? $input['email'] : '';
    
    // Fallback to POST form data if JSON is empty
    if (empty($email) && isset($_POST['email'])) {
        $email = $_POST['email'];
    }
    
    // Validate email presence
    if (empty($email)) {
        sendResponse(false, 'Email address is required.', 400);
    }
    
    // Sanitize email
    $email = sanitizeEmail($email);
    
    // Validate email format
    if (!validateEmail($email)) {
        sendResponse(false, 'Invalid email address format.', 400);
    }
    
    // Check if email already exists
    $existingEmail = emailExists($conn, $email);
    
    if ($existingEmail) {
        if (!$existingEmail['is_active']) {
            // Reactivate inactive subscription
            if (reactivateEmail($conn, $email)) {
                $conn->close();
                // fire-and-forget email, but do not fail the API if email send fails
                try {
                    sendWelcomeEmail($email, true);
                } catch (Exception $mailEx) {
                    error_log('Newsletter reactivation email failed: ' . $mailEx->getMessage());
                }
                sendResponse(true, 'Welcome back! Your subscription has been reactivated.', 200);
            } else {
                $conn->close();
                sendResponse(false, 'Failed to reactivate subscription.', 500);
            }
        } else {
            // Already active
            $conn->close();
            sendResponse(true, 'You are already subscribed to our newsletter.', 200);
        }
    }
    
    // Insert new email
    if (insertEmail($conn, $email)) {
        $conn->close();
        try {
            sendWelcomeEmail($email, false);
        } catch (Exception $mailEx) {
            error_log('Newsletter welcome email failed: ' . $mailEx->getMessage());
        }
        sendResponse(true, 'Thank you for subscribing! You\'ll receive updates soon.', 201);
    } else {
        $conn->close();
        sendResponse(false, 'Failed to subscribe. Please try again later.', 500);
    }
    
} catch (mysqli_sql_exception $e) {
    error_log("Newsletter database error: " . $e->getMessage());
    if (isset($conn) && $conn instanceof mysqli) {
        $conn->close();
    }
    sendResponse(false, 'Database error. Please try again later.', 500);
} catch (Exception $e) {
    error_log("Newsletter subscription error: " . $e->getMessage());
    if (isset($conn)) {
        $conn->close();
    }
    sendResponse(false, 'An unexpected error occurred. Please try again later.', 500);
}
?>
