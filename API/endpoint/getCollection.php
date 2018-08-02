<?php
header("Content-Type: application/json; charset=UTF-8");

include_once '../object/tasklist.php';

$tasklist = new Tasklist();
echo $tasklist->get_all();