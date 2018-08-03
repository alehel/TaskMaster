<?php
    session_start();
    $logged_in = isset($_SESSION["user"]);
?>

    <html>

    <head>
        <meta charset="UTF-8">
        <title>Task Master</title>
        <link rel="stylesheet" href="stylesheet.css">
    </head>

    <body>
         <?php
            include 'includes/loginmodal.html';
            include 'includes/newlistmodal.html';
            ?>

        <div class="sidenav" id="sidenav">
            <a href="#" id="btnCloseSidenav">&times;</a>
            <span>Task Lists</span>
            <div id="tasklist" class="tasklist">
                <!-- Populated by AJAX call in scripts/sidenav.js -->
            </div>
        </div>

        <div id="main">
            <?php
                include 'includes/topnav.html';
            ?>
                <?php
                    if(isset($_GET["error"])) {
                        if($_GET["error"] === "login") {
                            echo '<div id="todolist"><div class="error"><h1>Oops!...</h1>Login failed: Wrong username and/or password!</div></div>';
                        }
                    } else {
                        include 'includes/todolist.php';
                    }
                ?>
        </div>
        <script src="scripts/script.js"></script>

    </body>
    
    </html>
