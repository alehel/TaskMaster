<?php
session_start();
include_once './API/config/database.php';
include_once './API/object/user.php';
// establish db connection
$user = new User();
    
$valid = $user->verify($_POST["email"], $_POST["password"]);
    
// check if user exists
if($valid) {
        $_SESSION["user"] = $_POST["email"];
        echo "
            <script type=\"text/javascript\">
                window.location.href = './index.php';
            </script>
        ";
    } else {
        echo "
            <script type=\"text/javascript\">
                window.location.href = './index.php?error=login';
            </script>
        ";
    }

        
$conn->close();
