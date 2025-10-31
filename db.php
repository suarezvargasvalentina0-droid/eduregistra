<?php
$host = "127.0.0.1";
$user = "root";
$pass = "";
$dbname = "usuario";

$conn = new mysqli(hostame: $host, username: $user, password: $pass, database: $dbname, por...3306);
if ($conn->connect_error) {
    die("Error de conexion;" . $conn->connect_error);
}
?>