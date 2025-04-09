import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

let MapComponent;
if (Platform.OS === 'web') {
  // Implementación para web
  MapComponent = () => (
    <View style={styles.mapFallback}>
      <Text style={styles.mapTitle}>Ubicación de ReactPets</Text>
      <Text style={styles.mapAddress}>Av. Veterinaria 123, Ciudad de México</Text>
      <View style={styles.mapPlaceholder}>
        <Text>Mapa no disponible en web</Text>
        <Text>Estamos ubicados en:</Text>
        <Text>Latitud: 19.432608</Text>
        <Text>Longitud: -99.133209</Text>
      </View>
    </View>
  );
} else {
  // Implementación para móvil
  const MapView = require('react-native-maps').default;
  const Marker = require('react-native-maps').Marker;
  
  MapComponent = () => (
    <View style={styles.container}>
      <Text style={styles.mapTitle}>Ubicación de ReactPets</Text>
      <Text style={styles.mapAddress}>Av. Veterinaria 123, Ciudad de México</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 19.432608,
          longitude: -99.133209,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <Marker 
          coordinate={{ latitude: 19.432608, longitude: -99.133209 }} 
          title="ReactPets Veterinaria" 
          description="Clínica veterinaria especializada en cuidado animal"
        />
      </MapView>
    </View>
  );
}

export const MapScreen = MapComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  mapFallback: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    margin: 15,
    borderRadius: 10,
    padding: 20,
  },
  map: {
    width: '90%',
    height: 300,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  mapTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#944bb6',
    marginBottom: 5,
  },
  mapAddress: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 15,
  },
  mapPlaceholder: {
    alignItems: 'center',
  },
});