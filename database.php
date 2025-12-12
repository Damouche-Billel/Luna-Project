<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/src/setup_tables.php';

// Ensure DB and tables exist on startup (idempotent).
ensureSchema();

$conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

if ($conn->connect_error) {
    die('Database connection failed: ' . $conn->connect_error);
}

$conn->set_charset('utf8mb4');


