<?php
// error_reporting(E_ALL);
// ini_set('display_errors', 1);
require __DIR__ . '/../src/bootstrap.php';
require __DIR__ . '/../src/register.php';

if (is_user_logged_in()) {
    redirect_to('./index.php');
}
?>

<?php view('header', ['title' => 'Login']) ?>

<?php if (isset($errors['login'])) : ?>
    <div class="alert alert-error">
        <?= $errors['login'] ?>
    </div>
<?php endif ?>

<form action="../src/login.php" method="post" id="login_form">
    <h1>Login</h1>
    <div>
        <label for="username">Username:</label>
        <input type="text" name="username" id="username" value="<?= $inputs['username'] ?? '' ?>">
        <small id="username_error"></small>
    </div>
    <div>
        <label for="password">Password:</label>
        <input type="password" name="password" id="password">
        <small id="password_error"></small>
    </div>
    <section>
        <button type="submit" id="login">Login</button>
        <a href="register.php">Register</a>
    </section>
    <span id="submit_error" style="color: lightcoral;" />
</form>

<?php view('footer', ['title' => 'login']) ?>