-- Active: 1743091557662@@127.0.0.1@3306@veterinaria
DROP TABLE IF EXISTS veterinaria.mascotas;

CREATE TABLE veterinaria.mascotas (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pet_name` varchar(255) NOT NULL,
  `pet_type` varchar(50) NOT NULL,
  `propietario_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `propietario_id` (`propietario_id`),
  CONSTRAINT `mascotas_ibfk_1` FOREIGN KEY (`propietario_id`) REFERENCES `propietarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
--

DROP TABLE IF EXISTS veterinaria.propietarios;

CREATE TABLE veterinaria.propietarios (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS veterinaria.citas;

CREATE TABLE veterinaria.citas (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `propietario_id` INT(11) NOT NULL,
  `pet_id` INT(11) NOT NULL,
  `service` VARCHAR(255) NOT NULL,
  `date` DATE NOT NULL,
  `time` TIME NOT NULL,
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `propietario_id` (`propietario_id`),
  KEY `pet_id` (`pet_id`),
  CONSTRAINT `citas_ibfk_1` FOREIGN KEY (`propietario_id`) REFERENCES `propietarios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `citas_ibfk_2` FOREIGN KEY (`pet_id`) REFERENCES `mascotas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Tabla para almacenar los servicios disponibles
CREATE TABLE veterinaria.servicios (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `price` DECIMAL(10, 2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insertar servicios iniciales
INSERT INTO veterinaria.servicios (name, description, price) VALUES
('Consulta General', 'Consulta veterinaria general', 500.00),
('Vacunación', 'Vacunación para mascotas', 300.00),
('Estética', 'Servicio de estética para mascotas', 400.00),
('Cirugía', 'Procedimientos quirúrgicos', 1500.00),
('Chequeo Anual', 'Chequeo médico anual', 600.00),
('Emergencia', 'Atención de emergencias', 1000.00);
