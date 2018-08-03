<?php
session_start();
if(isset($_SESSION["user"])) {
    unset($_SESSION["user"]);
}

echo "
    <script type=\"text/javascript\">
        window.location.href = './login.php';
    </script>
";