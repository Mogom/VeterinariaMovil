<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include 'db.php';

$userId = $_GET['userId'] ?? null;

$response = ['success' => false];

if ($userId) {
    $userQuery = "SELECT name, email, phone FROM propietarios WHERE id = $userId";
    $petsQuery = "SELECT id, pet_name, pet_type FROM mascotas WHERE propietario_id = $userId";

    $userResult = $conn->query($userQuery);
    $petsResult = $conn->query($petsQuery);

    if ($userResult && $petsResult) {
        $response['success'] = true;
        $response['user'] = $userResult->fetch_assoc();
        $response['mascotas'] = $petsResult->fetch_all(MYSQLI_ASSOC);
    } else {
        $response['message'] = 'Error al obtener los datos.';
    }
} else {
    $response['message'] = 'ID de usuario no proporcionado.';
}

echo json_encode($response);
$conn->close();
?>