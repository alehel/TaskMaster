<?php
header("Content-Type: application/json; charset=UTF-8");
include_once '../object/user.php';

$user = new User();
$email = $_POST["email"];
$password = $_POST["password"];

$verified = $user->verify($email, $password);

if($verified) {
    $_SESSION["user"] = $email;
    echo "OK";
} else {
    unset($_SESSION["user"]);
    echo "Failed";
}