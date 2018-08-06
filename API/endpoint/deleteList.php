<?php
header("Content-Type: application/json; charset=UTF-8");
include_once '../config/database.php';
session_start();

if(isset($_SESSION["user"]) && isset($_GET["listname"])) {
    $conn = (new Database())->get_connection();
    $email = $conn->real_escape_string($_SESSION["user"]);
    $listname = $conn->real_escape_string($_GET["listname"]);


    $sql = "DELETE FROM list WHERE listname='$listname';";
    $result = $conn->query($sql);

    if($conn->affected_rows === 1) {
        $sql = "DELETE FROM task WHERE listname='$listname';"
        $conn->query($sql);
        echo json_encode(array("success" => "List deleted"));
    } else {
        echo json_encode(array("error"=>"Failed to delete list..."));
    }

    $conn->close();
} else {
    echo json_encode(array("error"=>"Authentication failed."));
}