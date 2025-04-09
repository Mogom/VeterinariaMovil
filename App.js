import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack'; // Navegador en pila
import { View, Text, StyleSheet } from 'react-native';


import Login from './screens/Login';
import Home from './screens/Home';
import FormCita from './screens/FormCita';
import Registro from './screens/Registro'
import ForgotPsw from './screens/ForgotPsw';

// Crear el Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Login" >
        <Stack.Screen name="Login" component={Login} options={{title:"Inicio Sesion"}} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="FormCita" component={FormCita} options={{title:"Formulario de Cita"}} />
        <Stack.Screen name="ForgotPsw" component={ForgotPsw} options={{title:"Recuperacion de Contraseña"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


