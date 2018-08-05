<?php
if(isset($_POST["email"]) && isset($_POST["password"])) {
    session_start();
    include_once 'API/config/database.php';
    $conn = (new Database())->get_connection();

    $email = $conn->real_escape_string($_POST["email"]);
    $password = $conn->real_escape_string($_POST["password"]);
    
    // get the users hashed password from the db
    $sql = "SELECT * FROM user WHERE email='$email';";
    $result = $conn->query($sql);
    
    // check if user exists
    if($conn->affected_rows === 1) { // user exists
        echo "
        <script type=\"text/javascript\">
            window.location.href = './logregfailed.php?error=Account already exists for that email.';
        </script>
        ";
    } else { // user does not exist
        $password = password_hash($password, PASSWORD_DEFAULT);
        $sql = "INSERT INTO user VALUES ('$email', '$password')";
        $result = $conn->query($sql);
        if($conn->affected_rows === 1)  {
            $_SESSION["user"] = $email;
            echo "
            <script type=\"text/javascript\">
                window.location.href = './index.php';
            </script>
            ";
        } else {
            echo "
            <script type=\"text/javascript\">
                window.location.href = './logregfailed.php;
            </script>
            ";
        }
    }
    
    $conn->close();
}
?>

<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Master: Register</title>
    <link rel="stylesheet" href="stylesheet.css">
</head>

<body>
    <div id="main">
        <nav class="menu-container">
            <div class="menu">
                <div></div>
                <div id="logo">Task Master</div>
                <div></div>
            </div>
        </nav>

        <form id="register" class="shadow" action="" method="post">
            <h1>Register</h1><br>
            Email:<br>
            <input class="input-text" type="text" name="email"><br> 
            Password:<br>
            <input class="input-text" type="password" name="password"><br>
            Repeat password:<br>
            <input class="input-text" type="password" name="repeat-password"><br>
            <br>
            <div id="btn-login-container">
                <input class="btn btn-ok" type="submit" value="Register">
                <a href="login.php" class="btn btn-danger">Cancel</a>
            </div>
        </form>
    </div>
</body>
</html>