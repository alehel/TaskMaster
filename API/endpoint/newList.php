<?php
header("Content-Type: application/json; charset=UTF-8");
include_once '../config/database.php';
session_start();

if(isset($_SESSION["user"])) {
    $conn = (new Database())->get_connection();
    $email = $conn->real_escape_string($_SESSION["user"]);
    $listname = $conn->real_escape_string($_GET["listname"]);

    $sql = "INSERT INTO list VALUES ('$listname', '$email');";
    $result = $conn->query($sql);

    if($conn->affected_rows === 1) {
        echo json_encode(array("success" => "Task list added."));
    } else {
        echo json_encode(array("error"=>"Failed to create task list."));
    }

    $conn->close();
} else {
    echo json_encode(array("error"=>"Failed to create task list. Not logged inn."));
}