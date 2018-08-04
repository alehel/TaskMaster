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

<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Master</title>
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

        <form id="login" class="shadow" action="" method="post">
            <h1>Login</h1><br>
            Email:<br>
            <input class="input-text" type="text" name="email"><br> 
            Password:<br>
            <input class="input-text" type="password" name="password"><br>
            <br>
            <div id="btn-login-container">
                <a href="register.php" class="btn btn-ok">New User</a>
                <input class="btn btn-ok" type="submit" value="Login"> 
            </div>
        </form>
    </div>
</body>
</html>