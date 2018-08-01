<?php
header("Content-Type: application/json; charset=UTF-8");
session_start();

include_once '../object/user.php';
echo($_SESSION["user"]);

