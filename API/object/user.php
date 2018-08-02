<?php
class User {
    private $table = 'user';
    
    function verify($email, $password) {
        // establish db connection
        $conn = (new Database())->get_connection();
        
        // secure the email string
        $email = $conn->real_escape_string($email);
        
        // get the users hashed password from the db
        $sql = "SELECT password FROM $this->table WHERE email='$email';";
        $result = $conn->query($sql);
        
        // check if user exists
        if($result->num_rows === 1) {
            $row= $result->fetch_assoc();
            $db_password = $row["password"];
            
            // check if the password matches
            if(password_verify($password, $db_password)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false; // user not in DB
        }
        
        $conn->close();
    }
}