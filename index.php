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
            include 'includes/loginmodal.html';
            include 'includes/sidenav.php';
        ?>

        <div id="main">
            <?php
                include 'includes/topnav.html';
            ?>


            <div class="tasklist">
                <?php
                    if(isset($_GET["failed"])) {
                        include 'includes/loginfailed.html';
                    } else if(!$logged_in) {
                        include 'includes/welcome.html';
                    }
                ?>
            </div>
        </div>

    </body>
    <script src="script.js"></script>
    </html>
