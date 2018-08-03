<?php
if(isset($_POST["email"]) && isset($_POST["password"])) {
    session_start();
    include_once 'API/config/database.php';
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
                window.location.href = './index.php';
            </script>
        ";
        } else { // Wrong password
            echo "
            <script type=\"text/javascript\">
                window.location.href = './loginfailed.html';
            </script>
        ";
        }
    } else { // Wrong username
        echo "
        <script type=\"text/javascript\">
            window.location.href = './loginfailed.html';
        </script>
    ";
    }
    
    $conn->close();
}
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Task Master</title>
</head>

<body>
    <div class="modal" id="modal-login">
        <div class="modal-content">
            <form action="" method="post">
                Email:<br>
                <input class="input-data" type="text" name="email"><br> 
                Password:<br>
                <input class="input-data" type="password" name="password"><br>
                <br>
                <div class="modal-buttons">
                    <input id="btnSubmitLogin" class="btnSubmit" type="submit" value="Submit"> 
                    <input id="btnCloseLogin" class="btnCancel" type="button" value="Cancel">
                </div>
            </form>
        </div>
    </div>
</body>
</html>