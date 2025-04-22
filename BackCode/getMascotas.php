<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include 'db.php';

$response = ['success' => false, 'message' => ''];

if (isset($_GET['propietario_id'])) {
    $propietario_id = $conn->real_escape_string($_GET['propietario_id']);

    // Obtener todas las mascotas del usuario
    $query = "SELECT id, pet_name, pet_type FROM mascotas WHERE propietario_id = $propietario_id";
    $result = $conn->query($query);

    if ($result) {
        $mascotas = $result->fetch_all(MYSQLI_ASSOC);
        $response['success'] = true;
        $response['mascotas'] = $mascotas;
    } else {
        $response['message'] = 'Error al obtener las mascotas: ' . $conn->error;
    }
} else {
    $response['message'] = 'ID del propietario no proporcionado.';
}

echo json_encode($response);
$conn->close();
?>