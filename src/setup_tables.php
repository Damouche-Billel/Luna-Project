<?php
// Unified table setup. Idempotent: safe to run repeatedly.

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
require_once __DIR__ . '/../config.php';

/**
 * Ensure database and required tables exist.
 *
 * @param bool $verbose Whether to echo progress (useful for CLI).
 * @return bool Success flag
 */
function ensureSchema(bool $verbose = false): bool {
    $conn = null;
    try {
        // Connect without selecting DB so we can create it if missing.
        $conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD);
        $conn->set_charset('utf8mb4');

        // Create database if needed.
        $conn->query(sprintf(
            "CREATE DATABASE IF NOT EXISTS `%s` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci",
            DB_NAME
        ));

        // Switch to the target database.
        $conn->select_db(DB_NAME);

        // Table DDLs.
        $tableStatements = [
            'NewsletterEmails' => "CREATE TABLE IF NOT EXISTS `NewsletterEmails` (
                id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL UNIQUE,
                is_active TINYINT(1) DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_email (email)
            )",
            'Contact_Details' => "CREATE TABLE IF NOT EXISTS `Contact_Details` (
                id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                Firstname VARCHAR(50) NOT NULL,
                Surname VARCHAR(50) NOT NULL,
                Email VARCHAR(100) NOT NULL,
                Message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )",
            'reviews' => "CREATE TABLE IF NOT EXISTS `reviews` (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                rating INT NOT NULL,
                message TEXT NOT NULL,
                approved TINYINT(1) DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )"
        ];

        foreach ($tableStatements as $table => $ddl) {
            $conn->query($ddl);
            if ($verbose) {
                echo "Ensured table {$table}\n";
            }
        }

        if ($verbose) {
            echo "Setup complete.\n";
        }

        return true;
    } catch (mysqli_sql_exception $e) {
        error_log('Schema setup failed: ' . $e->getMessage());
        if ($verbose) {
            echo 'Schema setup failed: ' . $e->getMessage() . "\n";
        }
        return false;
    } finally {
        if ($conn instanceof mysqli) {
            $conn->close();
        }
    }
}

// When executed directly via CLI (e.g., php setup_tables.php), run with verbose output.
if (php_sapi_name() === 'cli' && basename(__FILE__) === basename($_SERVER['SCRIPT_FILENAME'])) {
    ensureSchema(true);
}
?>
