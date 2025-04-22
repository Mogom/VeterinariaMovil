<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include 'db.php';

// Obtener datos enviados desde el cliente
$data = json_decode(file_get_contents("php://input"), true);

$response = ['success' => false, 'message' => ''];

if (isset($data['email']) && isset($data['password'])) {
    $email = $conn->real_escape_string($data['email']);
    $password = $data['password'];

    // Consulta para verificar las credenciales
    $sql = "SELECT id, password, name FROM propietarios WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();

        // Verificar la contraseña
        if (password_verify($password, $row['password'])) {
            // Credenciales correctas
            $response['success'] = true;
            $response['message'] = 'Inicio de sesión exitoso';
            $response['user'] = [
                'id' => $row['id'],
                'name' => $row['name'],
                'email' => $email
            ];
        } else {
            // Contraseña incorrecta
            $response['message'] = 'Contraseña incorrecta';
        }
    } else {
        // Usuario no encontrado
        $response['message'] = 'Usuario no encontrado';
    }
} else {
    // Datos incompletos
    $response['message'] = 'Por favor, proporciona email y contraseña';
}

echo json_encode($response);
$conn->close();
?>