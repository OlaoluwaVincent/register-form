<?php
require __DIR__ . '/../src/bootstrap.php';
require_login();

$username = is_user_logged_in() ? $_SESSION['username'] : "";
$id  = is_user_logged_in() ? $_SESSION['user_id'] : "";

?>
<h1>Hi there</h1>
<h3>Welcome "<?= $username . " " . $id ?>"</h3>


<a href="./logout.php">Logout</a>