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
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Master</title>
    <link rel="stylesheet" href="stylesheet.css">
</head>

<body>
    <div class="modal" id="modal-newlist">
        <div class="modal-content">
            <form action="" onsubmit="event.preventDefault()">
                Name:<br>
                <input class="input-text" id="input-text-listname" type="text" name="listname" autocomplete="off"><br> 

                <div class="modal-buttons">
                    <input id="btn-add-newlist" class="btn btn-ok" type="submit" value="Submit"> 
                    <input id="btn-cancel-newlist" class="btn btn-danger" type="button" value="Cancel">
                </div>
            </form>
        </div>
    </div>

    <div class="sidenav" id="sidenav">
        <button id="btnCloseSidenav">&times;</button>
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
        
        <div id="tasklist-settings">
            <div class="flex-row">
                <div id="title"></div>
                <div id="tasklist-controls">
                    <button id="btn-edit-name" class="btn btn-dark">Edit Name</a>
                    <button id="btn-delete-list" class="btn btn-danger">Delete</a>
                </div>
            </div>
            <div id="new-task-control">
                <input type="text" class="input-text" id="input-text-task" autocomplete="off" />
                <button id="btn-add-task" class="btn btn-ok">+</button>
            </div>
        </div>

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
