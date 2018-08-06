<?php
header("Content-Type: application/json; charset=UTF-8");
include_once '../config/database.php';
session_start();

if(isset($_SESSION["user"]) && isset($_GET["old_listname"]) && isset($_GET["new_listname"])) {
    $conn = (new Database())->get_connection();
    $email = $conn->real_escape_string($_SESSION["user"]);
    $old_listname = $conn->real_escape_string($_GET["old_listname"]);
    $new_listname = $conn->real_escape_string($_GET["new_listname"]);


    $sql = "UPDATE list SET listname='$new_listname' WHERE listname='$old_listname'";
    $result = $conn->query($sql);

    if($conn->affected_rows === 1) {
        echo json_encode(array("success" => "List name changed"));
    } else {
        echo json_encode(array("error"=>"Failed to change list name..."));
    }

    $conn->close();
} else {
    echo json_encode(array("error"=>"Authentication failed."));
}