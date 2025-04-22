import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function FormCita({ navigation, route }) {
  const { propietario_id } = route.params; // Recibir el ID del propietario autenticado
  const [mascotas, setMascotas] = useState([]);
  const [formData, setFormData] = useState({
    petId: '',
    service: 'Consulta General',
    date: '',
    time: '',
    notes: ''
  });

  const services = [
    'Consulta General',
    'Vacunación',
    'Estética',
    'Cirugía',
    'Chequeo Anual',
    'Emergencia'
  ];
  const availableTimes = [
    '09:00 AM', '10:00 AM', '11:00 AM', 
    '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  useEffect(() => {
    // Obtener las mascotas del usuario
    const fetchMascotas = async () => {
      try {
        const response = await fetch(`http://192.168.0.15/BackCode/getMascotas.php?propietario_id=${propietario_id}`);
        const result = await response.json();
        if (result.success) {
          setMascotas(result.mascotas);
        } else {
          Alert.alert('Error', 'No se pudieron cargar las mascotas.');
        }
      } catch (error) {
        console.error('Error al obtener las mascotas:', error);
        Alert.alert('Error', 'No se pudo conectar con el servidor.');
      }
    };

    fetchMascotas();
  }, [propietario_id]);

  const handleSubmit = async () => {
    if (!formData.petId || !formData.date || !formData.time) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    try {
      const response = await fetch('http://192.168.0.15/BackCode/registCita.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          propietario_id,
          pet_id: formData.petId,
          service: formData.service,
          date: formData.date,
          time: formData.time,
          notes: formData.notes,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert('Cita registrada exitosamente');
        navigation.goBack();
      } else {
        alert(result.message || 'Error al registrar la cita');
      }
    } catch (error) {
      console.error('Error al registrar la cita:', error);
      alert('No se pudo conectar con el servidor. Intenta nuevamente.');
    }
  };

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Image 
          source={{uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"}} 
          style={styles.logo}
        />
        <Text style={styles.title}>Reserva tu Cita</Text>
        <Text style={styles.subtitle}>Programa una consulta para tu mascota</Text>
      </View>

      <View style={styles.formContainer}>
        {/* Selección de Mascota */}
        <Text style={styles.sectionHeader}>Selecciona tu Mascota</Text>
        <Picker
          selectedValue={formData.petId}
          style={styles.picker}
          onValueChange={(itemValue) => handleChange('petId', itemValue)}
        >
          <Picker.Item label="Selecciona una mascota" value="" />
          {mascotas.map((mascota) => (
            <Picker.Item key={mascota.id} label={mascota.pet_name} value={mascota.id} />
          ))}
        </Picker>

        {/* Selección de Servicio */}
        <Text style={styles.sectionHeader}>Servicio</Text>
        <Picker
          selectedValue={formData.service}
          style={styles.picker}
          onValueChange={(itemValue) => handleChange('service', itemValue)}
        >
          {services.map((service, index) => (
            <Picker.Item key={index} label={service} value={service} />
          ))}
        </Picker>

        {/* Fecha y Hora */}
        <Text style={styles.sectionHeader}>Fecha y Hora</Text>
        <TextInput
          style={styles.input}
          placeholder="DD/MM/AAAA"
          value={formData.date}
          onChangeText={(text) => handleChange('date', text)}
          keyboardType="numeric"
        />
        <Picker
          selectedValue={formData.time}
          style={styles.picker}
          onValueChange={(itemValue) => handleChange('time', itemValue)}
        >
          <Picker.Item label="Selecciona una hora" value="" />
          {availableTimes.map((time, index) => (
            <Picker.Item key={index} label={time} value={time} />
          ))}
        </Picker>

        {/* Notas adicionales */}
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Notas adicionales (opcional)"
          multiline
          numberOfLines={4}
          value={formData.notes}
          onChangeText={(text) => handleChange('notes', text)}
        />

        {/* Botón de envío */}
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Confirmar Cita</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    padding: 25,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logo: {
    width: 80,
    height: 72,
    marginBottom: 15,
    tintColor: '#944bb6',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  formContainer: {
    padding: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#944bb6',
    marginTop: 15,
    marginBottom: 10,
    paddingLeft: 5,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  pickerLabel: {
    padding: 15,
    paddingBottom: 5,
    fontSize: 14,
    color: '#666',
  },
  picker: {
    width: '100%',
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#c175e4',
    borderRadius: 10,
    padding: 18,
    marginTop: 20,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});