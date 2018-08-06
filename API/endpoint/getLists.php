<?php
header("Content-Type: application/json; charset=UTF-8");
include_once '../config/database.php';
session_start();

if(isset($_SESSION["user"])) {
    $email = $_SESSION["user"];
    $conn = (new Database())->get_connection();
    $email = $conn->real_escape_string($email);

    $sql = "SELECT * FROM list WHERE email='$email';";
    $result = $conn->query($sql);

    if($result->num_rows > 0) {
        echo json_encode($result->fetch_all(MYSQLI_ASSOC), JSON_UNESCAPED_UNICODE);
    } else {
        // no lists - create base list.
        echo json_encode(array());
    }

    $conn->close();
} else {
    echo json_encode(array("error"=>"Not logged inn"));
}