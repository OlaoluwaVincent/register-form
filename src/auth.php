<?php

/**
 * Register a user
 *
 * @param string $email
 * @param string $username
 * @param string $password
 * @param bool $is_admin
 * @return bool
 */
// function register_user(string $email, string $username, string $password, bool $is_admin = false): bool
// {
//     $sql = 'INSERT INTO users(username, email, password, is_admin)
//             VALUES(:username, :email, :password, :is_admin)';

//     $statement = db()->prepare($sql);

//     $statement->bindValue(':username', $username, PDO::PARAM_STR);
//     $statement->bindValue(':email', $email, PDO::PARAM_STR);
//     $statement->bindValue(':password', password_hash($password, PASSWORD_BCRYPT), PDO::PARAM_STR);
//     $statement->bindValue(':is_admin', (int)$is_admin, PDO::PARAM_INT);


//     return $statement->execute();
// }

function register_user(string $email, string $username, string $password, bool $is_admin = false): bool
{

    $userByUsername = find_user_by_username($username);
    $userByEmail = find_user_by_email($email);

    if ($userByUsername) {
        $errors['register'] = 'Username has been used';
        redirect_with('../public/register.php', [
            "errors" => $errors,
        ]);
    }
    if ($userByEmail) {
        $errors['register'] = 'Email has been used';
        redirect_with('../public/register.php', [
            "errors" => $errors,
        ]);
    }

    $sql = 'INSERT INTO users(username, email, password, is_admin)
            VALUES(:username, :email, :password, :is_admin)';

    $statement = db()->prepare($sql);

    return $statement->execute([
        ':username' => $username,
        ':email'    => $email,
        ':password' => password_hash($password, PASSWORD_BCRYPT),
        ':is_admin' => (int)$is_admin
    ]);
}



function is_user_logged_in(): bool
{
    return isset($_SESSION['username']);
}


function require_login(): void
{
    if (!is_user_logged_in()) {
        redirect_to('../public/login.php');
    }
}
