<?php
include_once '../config/database.php';
session_start();
class TaskList {
    private $table = 'list';
    
    // Gets a list of all the current users task lists.
    function read_all() {
        if(isset($_SESSION["user"])) {
            $email = $_SESSION["user"];
            $conn = (new Database())->get_connection();
            $email = $conn->real_escape_string($email);

            $sql = "SELECT * FROM $this->table WHERE email='$email';";
            $result = $conn->query($sql);

            if($result->num_rows > 0) {
                return json_encode($result->fetch_all(MYSQLI_ASSOC), JSON_UNESCAPED_UNICODE);
            } else {
                return json_encode(array("error"=>"No task lists found for user $email."));
            }

            $conn->close();
        } else {
            return json_encode(array("error"=>"Not logged inn"));
        }
    }
}