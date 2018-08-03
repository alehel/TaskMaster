<?php
include_once '../config/database.php';
session_start();

if(isset($_POST["email"]) && isset($_POST["password"])) {
    $conn = (new Database())->get_connection();

    $email = $conn->real_escape_string($_POST["email"]);
    $password = $conn->real_escape_string($_POST["password"]);
    
    // get the users hashed password from the db
    $sql = "SELECT password FROM user WHERE email='$email';";
    $result = $conn->query($sql);
    
    // check if user exists
    if($result->num_rows === 1) {
        $row= $result->fetch_assoc();
        $db_password = $row["password"];
        
        // check if the password matches
        if(password_verify($password, $db_password)) {
            $_SESSION["user"] = $email;
            echo "
            <script type=\"text/javascript\">
                window.location.href = '../../taskmaster.php';
            </script>
        ";
        } else {
            // Wrong password
            echo '<div class="error-login">Incorrect username and/or password.</div>';
        }
    } else {
        // Wrong username
        echo '<div class="error-login">Incorrect username and/or password.</div>';
    }
    
    $conn->close();
}
