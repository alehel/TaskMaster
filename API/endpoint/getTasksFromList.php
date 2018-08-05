<?php
header("Content-Type: application/json; charset=UTF-8");
include_once '../config/database.php';
session_start();

if(isset($_SESSION["user"]) && isset($_GET["listname"])) {
    $email = $_SESSION["user"];
    $conn = (new Database())->get_connection();
    $email = $conn->real_escape_string($email);
    $listname = $conn->real_escape_string($_GET["listname"]);

    $sql = "SELECT * FROM task WHERE email='$email' AND listname='$listname' ORDER BY taskid DESC;";
    $result = $conn->query($sql);

    if($result->num_rows > 0) {
        echo json_encode($result->fetch_all(MYSQLI_ASSOC), JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(array());
    }

    $conn->close();
} else {
    echo json_encode(array("error"=>"Authentication failed."));
}