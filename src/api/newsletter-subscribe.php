<?php
/**
 * LUNA Newsletter Subscription API
 * Handles newsletter form submissions and stores emails in SQL Server database
 */

require_once 'config.php';
require_once 'email-service.php';

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
 * @param resource $conn Database connection
 * @param string $email Email to check
 * @return bool True if exists
 */
function emailExists($conn, $email) {
    $sql = "SELECT Id FROM [dbo].[NewsletterEmails] WHERE EmailAddress = ?";
    $params = array($email);
    
    $stmt = sqlsrv_query($conn, $sql, $params);
    
    if ($stmt === false) {
        error_log("Email check query failed: " . print_r(sqlsrv_errors(), true));
        return false;
    }
    
    $exists = sqlsrv_fetch($stmt) !== false;
    sqlsrv_free_stmt($stmt);
    
    return $exists;
}

/**
 * Insert new email subscription
 * @param resource $conn Database connection
 * @param string $email Email to insert
 * @return bool True on success
 */
function insertEmail($conn, $email) {
    $sql = "INSERT INTO [dbo].[NewsletterEmails] (EmailAddress, IsActive, CreatedDate) 
            VALUES (?, 1, GETDATE())";
    $params = array($email);
    
    $stmt = sqlsrv_query($conn, $sql, $params);
    
    if ($stmt === false) {
        error_log("Email insert failed: " . print_r(sqlsrv_errors(), true));
        return false;
    }
    
    sqlsrv_free_stmt($stmt);
    return true;
}

/**
 * Reactivate existing inactive email
 * @param resource $conn Database connection
 * @param string $email Email to reactivate
 * @return bool True on success
 */
function reactivateEmail($conn, $email) {
    $sql = "UPDATE [dbo].[NewsletterEmails] 
            SET IsActive = 1, CreatedDate = GETDATE() 
            WHERE EmailAddress = ?";
    $params = array($email);
    
    $stmt = sqlsrv_query($conn, $sql, $params);
    
    if ($stmt === false) {
        error_log("Email reactivation failed: " . print_r(sqlsrv_errors(), true));
        return false;
    }
    
    sqlsrv_free_stmt($stmt);
    return true;
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
    
    // Get database connection
    $conn = getDBConnection();
    
    if (!$conn) {
        sendResponse(false, 'Database connection failed. Please try again later.', 500);
    }
    
    // Check if email already exists
    if (emailExists($conn, $email)) {
        // Check if inactive and reactivate
        $checkActive = sqlsrv_query($conn, "SELECT IsActive FROM [dbo].[NewsletterEmails] WHERE EmailAddress = ?", array($email));
        $row = sqlsrv_fetch_array($checkActive, SQLSRV_FETCH_ASSOC);
        sqlsrv_free_stmt($checkActive);
        
        if ($row && !$row['IsActive']) {
            // Reactivate inactive subscription
            reactivateEmail($conn, $email);
            closeDBConnection($conn);
            
            // Send welcome back email
            sendWelcomeEmail($email, true);
            
            sendResponse(true, 'Welcome back! Your subscription has been reactivated.', 200);
        } else if ($row && $row['IsActive']) {
            // Already active
            closeDBConnection($conn);
            sendResponse(true, 'You are already subscribed to our newsletter.', 200);
        }
    }
    
    // Insert new email
    if (insertEmail($conn, $email)) {
        closeDBConnection($conn);
        
        // Send welcome email
        sendWelcomeEmail($email, false);
        
        sendResponse(true, 'Thank you for subscribing! You\'ll receive updates soon.', 201);
    } else {
        closeDBConnection($conn);
        sendResponse(false, 'Failed to subscribe. Please try again later.', 500);
    }
    
} catch (Exception $e) {
    error_log("Newsletter subscription error: " . $e->getMessage());
    sendResponse(false, 'An unexpected error occurred. Please try again later.', 500);
}
?>
