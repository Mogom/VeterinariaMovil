<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include 'db.php';

// Obtener datos enviados desde el cliente
$data = json_decode(file_get_contents("php://input"), true);

$response = ['success' => false, 'message' => ''];

if (isset($data['propietario_id'], $data['pet_id'], $data['service'], $data['date'], $data['time'])) {
    // Registrar una nueva cita
    $propietario_id = $conn->real_escape_string($data['propietario_id']);
    $pet_id = $conn->real_escape_string($data['pet_id']);
    $service = $conn->real_escape_string($data['service']);
    $date = $conn->real_escape_string($data['date']);
    $time = $conn->real_escape_string($data['time']);
    $notes = isset($data['notes']) ? $conn->real_escape_string($data['notes']) : null;

    $query = "INSERT INTO citas (propietario_id, pet_id, service, date, time, notes) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("iissss", $propietario_id, $pet_id, $service, $date, $time, $notes);

    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = 'Cita registrada exitosamente';
    } else {
        $response['message'] = 'Error al registrar la cita: ' . $stmt->error;
    }

    $stmt->close();
} else {
    $response['message'] = 'Datos incompletos para registrar la cita.';
}

echo json_encode($response);
$conn->close();
?>