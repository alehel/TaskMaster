<?php
    $list_arr = array();

    if(isset($_SESSION["user"])) {
        for($i = 0; $i < 4; $i++) {
            array_push($list_arr, '<a href="#">List '.($i+1).'</a>');
        }
    } else {
        array_push($list_arr, '<div class="sidenav-error">Login to see your task lists.</div>');
    }
?>

<div class="sidenav" id="sidenav">
    <a href="#" id="btnCloseSidenav">&times;</a>
    <span>Task Lists</span>
    <div class="tasklist">
        <?php
        foreach($list_arr as $value) {
            echo $value;
        }
        ?>
    </div>
</div>