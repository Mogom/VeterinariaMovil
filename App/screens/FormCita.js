import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function FormCita({ navigation }) {
  const [formData, setFormData] = useState({
    petName: '',
    petType: 'Perro',
    service: 'Consulta General',
    ownerName: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    notes: ''
  });

  const petTypes = ['Perro', 'Gato', 'Conejo', 'Ave', 'Reptil', 'Otro'];
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

  const handleSubmit = () => {
    if (!formData.date || !formData.time) {
      alert('Por favor selecciona fecha y hora');
      return;
    }
    alert(`Cita reservada para ${formData.petName} el ${formData.date} a las ${formData.time}`);
    navigation.goBack();
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
        {/* Información de la Mascota */}
        <Text style={styles.sectionHeader}>Información de la Mascota</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Nombre de la mascota"
          value={formData.petName}
          onChangeText={(text) => handleChange('petName', text)}
        />

        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Tipo de mascota:</Text>
          <Picker
            selectedValue={formData.petType}
            style={styles.picker}
            onValueChange={(itemValue) => handleChange('petType', itemValue)}>
            {petTypes.map((type, index) => (
              <Picker.Item key={index} label={type} value={type} />
            ))}
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Servicio requerido:</Text>
          <Picker
            selectedValue={formData.service}
            style={styles.picker}
            onValueChange={(itemValue) => handleChange('service', itemValue)}>
            {services.map((service, index) => (
              <Picker.Item key={index} label={service} value={service} />
            ))}
          </Picker>
        </View>

        {/* Información del Dueño */}
        <Text style={styles.sectionHeader}>Información del Dueño</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Tu nombre completo"
          value={formData.ownerName}
          onChangeText={(text) => handleChange('ownerName', text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Teléfono de contacto"
          keyboardType="phone-pad"
          value={formData.phone}
          onChangeText={(text) => handleChange('phone', text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
        />

        {/* Fecha y Hora - Versión simplificada */}
        <Text style={styles.sectionHeader}>Fecha y Hora</Text>
        
        <TextInput
          style={styles.input}
          placeholder="DD/MM/AAAA"
          value={formData.date}
          onChangeText={(text) => handleChange('date', text)}
          keyboardType="numeric"
        />

        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Hora disponible:</Text>
          <Picker
            selectedValue={formData.time}
            style={styles.picker}
            onValueChange={(itemValue) => handleChange('time', itemValue)}>
            <Picker.Item label="Selecciona una hora" value="" />
            {availableTimes.map((time, index) => (
              <Picker.Item key={index} label={time} value={time} />
            ))}
          </Picker>
        </View>

        {/* Notas adicionales */}
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Notas adicionales (síntomas, comportamientos, etc.)"
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