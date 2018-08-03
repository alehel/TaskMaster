<div id="todolist">
    <div class="error">
        <?php
        if(isset($_SESSION["user"])) {
            echo "<h1>Welcome to Task Master</h1>";
            echo "Please select one of your task lists from the left pane.";
        } else {
            echo "Please login or register to continue.";
        }
        ?>
    </div>
</div>
