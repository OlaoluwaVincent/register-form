<?php
require_once __DIR__ . '/../src/bootstrap.php';

$errors = [];
$inputs = [];

if (is_post_request()) {
    $fields = [
        'username' => 'string | required | alphanumeric | between: 3, 25 | unique: users, username',
        'password' => 'string | required | secure',
    ];

    $values = filter_input_array(INPUT_POST, $_POST);


    if (!login($values['username'], $values['password'])) {

        $errors['login'] = 'Invalid username or password';
        $inputs['username'] = $values['username'];

        redirect_with('../public/login.php', [
            'errors' => $errors,
            'inputs' => $inputs
        ]);
    }

    redirect_to('../public/index.php');
} else if (is_get_request()) {
    [$errors, $inputs] = session_flash('errors', 'inputs');
}
