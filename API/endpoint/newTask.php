<?php
header("Content-Type: application/json; charset=UTF-8");
include_once '../config/database.php';
session_start();

if(isset($_SESSION["user"]) && isset($_GET["task"]) && isset($_GET["listname"])) {
    $conn = (new Database())->get_connection();
    $email = $conn->real_escape_string($_SESSION["user"]);
    $listname = $conn->real_escape_string($_GET["listname"]);
    $taskname = $conn->real_escape_string($_GET["task"]);

    $sql = "INSERT INTO task (task, listname, email) VALUES ('$taskname', '$listname', '$email');";
    $result = $conn->query($sql);

    if($conn->affected_rows === 1) {
        echo json_encode(array("success" => "Task added to list."));
    } else {
        echo json_encode(array("error"=>"Failed to add task to list.."));
    }

    $conn->close();
} else {
    echo $_SESSION["user"];
    echo $_GET["task"];
    echo $_GET["listname"];
    echo json_encode(array("error"=>"Authentication failed."));
}