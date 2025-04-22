import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack'; // Navegador en pila
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


import Login from './screens/Login';
import Home from './screens/Home';
import FormCita from './screens/FormCita';
import Registro from './screens/Registro'
import ForgotPsw from './screens/ForgotPsw';
import Profile from './screens/Profile';

// Crear el Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Login" >
        <Stack.Screen name="Login" component={Login} options={{title:"Inicio Sesion"}} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={({ navigation, route }) => ({
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Profile', { userId: route.params.userId })}>
                <Text style={{ marginRight: 15, color: '#944bb6', fontWeight: 'bold' }}>Perfil</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="FormCita" component={FormCita} options={{title:"Formulario de Cita"}} />
        <Stack.Screen name="ForgotPsw" component={ForgotPsw} options={{title:"Recuperacion de Contraseña"}}/>
        <Stack.Screen name="Profile" component={Profile} options={{title:"Perfil de usuario"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


