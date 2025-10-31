<?php
header("Content-Type:
application/json");
header("Access-Control-Allow-Origin:*");//para pruebas con fontend en otra carpeta
header("Access-Control-Allow-Methods: POST,GET,OPTIONS");
header("Acces-Control-Allow-Headers:Content-Type");
if($_SERVER['REQUEST-METHOD]'==='OPTIONS') {
    http_response_code(200);
    exit();
}
include "db.php";

//Leer datos del POST
$data = json_decode(file_get_contents("p hp://input"));
$username=$data->username;
$password=md5($data-> password); //Encriptado simple con MD5 (puedes mejorar con password_hash)

$sql="SELECT*FROM contraseña WHERE documento=? AND passaword=?";
$stmt=$conn->prepare(query: $sql);
$smst->bind_param(types: "ss", var: &$username, vars: &$password);
$stmt->excute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["success" => true, "message" => "Login correcto" "rol" => $user["admin"]]);
} else {
    echo json_encode(value: ["success" => false, "message" => "Usuario o contraseña incorrectos"]);
}

    $stmt->close();
    $conn->close();

?>