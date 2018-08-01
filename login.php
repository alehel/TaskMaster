<?php
session_start();
include_once './API/config/database.php';
// establish db connection
$conn = (new Database())->get_connection();
    
// secure the email string
$email = $conn->real_escape_string($_POST["email"]);
    
// get the users hashed password from the db
$sql = "SELECT password FROM user WHERE email='$email';";
$result = $conn->query($sql);
    
// check if user exists
if($result->num_rows === 1) {
    $row= $result->fetch_assoc();
    $db_password = $row["password"];
        
    // check if the password matches
    if(password_verify($_POST["password"], $db_password)) {
        $_SESSION["user"] = $email;
        echo "
            <script type=\"text/javascript\">
                window.location.href = './index.php';
            </script>
        ";
    } else {
        echo "
            <script type=\"text/javascript\">
                window.location.href = './index.php?failed=';
            </script>
        ";
    }
} else {
    echo "
        <script type=\"text/javascript\">
            window.location.href = './index.php?failed=';
        </script>
    ";
}
        
$conn->close();
