<?php
require __DIR__ . '/../src/bootstrap.php';
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

if (is_get_request()) {
    // Unset all session variables
    $_SESSION = [];

    // Destroy the session
    session_destroy();

    redirect_to('../../public/login.php');
}
