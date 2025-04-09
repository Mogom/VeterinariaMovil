<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json"); // Siempre devolvemos JSON

include 'db.php';

// Obtener datos POST
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$password = password_hash($_POST['password'] ?? '', PASSWORD_BCRYPT);
$phone = $_POST['phone'] ?? '';
$petName = $_POST['petName'] ?? '';
$petType = $_POST['petType'] ?? '';

$response = ['success' => false, 'message' => ''];

// Validaciones
if (empty($name) || empty($email) || empty($_POST['password']) || empty($phone)) {
    $response['message'] = 'Por favor complete todos los campos';
    echo json_encode($response);
    exit;
}

// Comenzar transacción
$conn->begin_transaction();

try {
    // Insertar propietario
    $stmt = $conn->prepare("INSERT INTO propietarios (name, email, password, phone) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $email, $password, $phone);
    
    if ($stmt->execute()) {
        $propietario_id = $conn->insert_id;
        
        // Insertar mascota
        $stmt2 = $conn->prepare("INSERT INTO mascotas (pet_name, pet_type, propietario_id) VALUES (?, ?, ?)");
        $stmt2->bind_param("ssi", $petName, $petType, $propietario_id);
        
        if ($stmt2->execute()) {
            $conn->commit();
            $response['success'] = true;
            $response['message'] = 'Registro exitoso';
        } else {
            $conn->rollback();
            $response['message'] = 'Error al registrar la mascota';
        }
    } else {
        $conn->rollback();
        $response['message'] = 'Error al registrar el propietario: ' . $conn->error;
    }
} catch (Exception $e) {
    $conn->rollback();
    $response['message'] = 'Error: ' . $e->getMessage();
}

echo json_encode($response);
$conn->close();
?>