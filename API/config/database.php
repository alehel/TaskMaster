<?php
//error_reporting(0);

class Database {
    private $host = 'localhost';
    private $username = 'root';
    private $password = '';
    private $db = 'taskmaster';
    public $conn;
    
    public function get_connection() {
        $this->conn = null;
        
        // create connection
        $this->conn = new mysqli($this->host, $this->username, $this->password, $this->db);
        
        // test connection
        if ($this->conn->connect_error) {
            die(json_encode(array("error"=>"There was a problem connecting to the database.")));
        }
        
        $this->conn->set_charset("utf8");
        return $this->conn;
    }
}