<?php
require_once __DIR__ . '/../src/bootstrap.php';
// error_reporting(E_ALL);
// ini_set('display_errors', 1);
$errors = [];
$inputs = [];


if (is_post_request()) {
    $values = filter_input_array(INPUT_POST, $_POST);

    if (register_user($values['email'], $values['username'], $values['password'])) {
        redirect_with_message(
            '../public/login.php',
            'Your account has been created successfully. Please login here.'
        );
    }
} else if (is_get_request()) {
    [$inputs, $errors] = session_flash('inputs', 'errors');
}
