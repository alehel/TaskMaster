<?php
    $error_message = "Oops! Something went wrong!";

    if(isset($_GET["error"])) {
        $error_message = $_GET["error"];
    }
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Task Master: Login Failed</title>
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
    
            <div id="login-error">
                <h1><?php echo $error_message ?></h1>
                <img src="assets/error.svg" alt="Illustrative image of confused man" />
                <div>
                    <a href="login.php" class="btn btn-ok">&#8592; Back to login</a>
                </div>
            </div>
        </div>
    </body>
</html>