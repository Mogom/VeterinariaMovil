import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
// import axios from 'axios';

// const bd = "http//192.168.64.197/veterinaria";

export default function RegisterForm({ navigation }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        petType: 'Perro',
        petName: ''
    });

    const handleChange = (name, value) => {
        setFormData({
        ...formData,
        [name]: value
        });
    };


    const petTypes = ['Perro', 'Gato', 'Conejo', 'Ave', 'Reptil', 'Otro'];



    const handleRegister = async () => {
        // Validaciones (se mantienen igual)
        if (!formData.email || !formData.name || !formData.password || !formData.phone) {
            Alert.alert('Error', 'Por favor complete todos los campos obligatorios');
            return;
        }
    
        if (formData.password !== formData.confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return;
        }
    
        if (formData.password.length < 6) {
            Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
            return;
        }
    
        try {
            const response = await fetch('http://172.30.4.150/veterinaria/insertPropietario.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}&password=${encodeURIComponent(formData.password)}&phone=${encodeURIComponent(formData.phone)}&petName=${encodeURIComponent(formData.petName)}&petType=${encodeURIComponent(formData.petType)}`
            });
    
            const resultText = await response.text(); // Primero obtenemos el texto
            console.log('Respuesta del servidor:', resultText);
    
            // Verificamos si es JSON válido
            let result;
            try {
                result = JSON.parse(resultText);
            } catch {
                result = { message: resultText };
            }
    
            if (response.ok) {
                if (result.message === 'Registro exitoso' || resultText === 'Registro exitoso') {
                    Alert.alert(
                        'Registro Exitoso',
                        `Bienvenido ${formData.name}! Tu cuenta ha sido creada.`,
                        [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
                    );
                } else {
                    Alert.alert('Error', result.message || resultText || 'Error en el registro');
                }
            } else {
                Alert.alert('Error', result.message || resultText || 'Error en la conexión con el servidor');
            }
        } catch (error) {
            console.error('Error en el registro:', error);
            Alert.alert('Error', 'No se pudo conectar con el servidor. Intente nuevamente.');
        }
    };


    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
            <Image 
            source={{uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"}} 
            style={styles.logo}
            />
            <Text style={styles.title}>Registro en ReactPets</Text>
            <Text style={styles.subtitle}>Únete a nuestra comunidad de amantes de mascotas</Text>
        </View>

        <View style={styles.formContainer}>
            {/* Información Personal */}
            <Text style={styles.sectionHeader}>Información Personal</Text>
            
            <TextInput
            style={styles.input}
            placeholder="Nombre completo"
            value={formData.name}
            onChangeText={(text) => handleChange('name', text)}
            />

            <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => handleChange('email', text)}
            />

            <TextInput
            style={styles.input}
            placeholder="Teléfono"
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={(text) => handleChange('phone', text)}
            />

            {/* Contraseña */}
            <Text style={styles.sectionHeader}>Seguridad</Text>
            
            <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) => handleChange('password', text)}
            />

            <TextInput
            style={styles.input}
            placeholder="Confirmar contraseña"
            secureTextEntry
            value={formData.confirmPassword}
            onChangeText={(text) => handleChange('confirmPassword', text)}
            />

            {/* Información de la Mascota */}
            <Text style={styles.sectionHeader}>Tu Mascota</Text>
            
            <TextInput
            style={styles.input}
            placeholder="Nombre de tu mascota"
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

            {/* Términos y condiciones */}
            <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
                Al registrarte, aceptas nuestros Términos de Servicio y Política de Privacidad
            </Text>
            </View>

            {/* Botón de registro */}
            <TouchableOpacity 
            style={styles.registerButton}
            onPress={handleRegister}
            >
            <Text style={styles.registerButtonText}>Crear Cuenta</Text>
            </TouchableOpacity>

            {/* Enlace a login */}
            <TouchableOpacity 
            style={styles.loginLink}
            onPress={() => navigation.navigate('Login')}
            >
            <Text style={styles.loginLinkText}>¿Ya tienes cuenta? Inicia sesión</Text>
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
    textAlign: 'center',
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
  termsContainer: {
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  termsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  registerButton: {
    backgroundColor: '#c175e4',
    borderRadius: 10,
    padding: 18,
    marginTop: 10,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginLinkText: {
    color: '#944bb6',
    fontSize: 16,
    fontWeight: '600',
  },
});