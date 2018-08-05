<?php
header("Content-Type: application/json; charset=UTF-8");
include_once '../config/database.php';
session_start();

if(isset($_SESSION["user"]) && isset($_GET["task_id"])) {
    $conn = (new Database())->get_connection();
    $email = $conn->real_escape_string($_SESSION["user"]);
    $task_id = $conn->real_escape_string($_GET["task_id"]);

    $sql = "SELECT complete FROM task WHERE taskid='$task_id' AND email='$email';";
    $result = $conn->query($sql);
    if($conn->affected_rows === 1) {
        $row = $result->fetch_assoc();
        $new_state = ($row["complete"] == 1) ? 0 : 1;
        $sql = "UPDATE task SET complete=$new_state WHERE taskid='$task_id' AND email='$email';";
        $result = $conn->query($sql);
        if($conn->affected_rows === 1) {
            echo json_encode(array("success" => "Task updated,"));
        } else {
            echo json_encode(array("error" => "Failed to update task..."));
        }
    } else {
        echo json_encode(array("error" => "Failed to update task..."));
    }
} else {
    echo json_encode(array("error" => "Failed to update task..."));
}