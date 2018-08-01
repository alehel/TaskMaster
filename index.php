<?php
    session_start();
    $logged_in = isset($_SESSION["user"]);
?>

    <html>

    <head>
        <meta charset="UTF-8">
        <title>Task Master</title>
        <link rel="stylesheet" href="stylesheet.css">
        <script src="script.js"></script>
    </head>

    <body>
         <?php
            include 'includes/loginmodal.html';
            include 'includes/sidenav.html';
        ?>

        <div id="main">
            <nav class="menu-container">
                <div class="menu">
                    <div class="lists" onclick="showSidenav()">
                        <div class="burger"></div>
                        <div class="burger"></div>
                        <div class="burger"></div>
                    </div>
                    <div class="logo">Task Master</div>
                    <?php
                    if($logged_in) {
                        echo '<div class="logout"><a href="logout.php">Logout</a></div>';
                    } else {
                        echo '<div class="login"><a href="#" onclick="showModal()">Login</a></div>';
                    }
                ?>
                </div>
            </nav>


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

    </html>
