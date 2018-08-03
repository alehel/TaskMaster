<?php
    session_start();
    if(!isset($_SESSION["user"])) {
        echo "
        <script type=\"text/javascript\">
            window.location.href = './login.php';
        </script>
    ";
    }
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Task Master</title>
    <link rel="stylesheet" href="stylesheet.css">
</head>

<body>
    <?php
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
        <nav class="menu-container">
            <div class="menu">
                <div id="burger-hidden"></div>
                <div id="burger">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div id="logo">Task Master</div>
                <div id="links">
                    <a id="btnLogout" href="logout.php">Logout</a>
                </div>
            </div>
        </nav>
        <div id="todolist">
            <div id="welcome-message">
                <h1>Welcome to Task Master</h1>
                <p>Please select one of your task lists from the left pane.</p>
            </div>
        </div>
    </div>
    <script src="scripts/script.js"></script>

</body>

</html>
