// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Platform } from 'react-native';

// export const MapScreen = () => {
//   const [MapView, setMapView] = useState(null);
//   const [Marker, setMarker] = useState(null);

//   useEffect(() => {
//     if (Platform.OS !== 'web') {
//       const { default: RNMapView, Marker: RNMarker } = require('react-native-maps');
//       setMapView(() => RNMapView);
//       setMarker(() => RNMarker);
//     }
//   }, []);

//   if (Platform.OS === 'web') {
//     return (
//       <View style={styles.mapFallback}>
//         <Text>Mapa no disponible en web</Text>
//       </View>
//     );
//   }

//   if (!MapView) return null; // Mientras carga

//   return (
//     <MapView style={styles.map}>
//       <Marker coordinate={{ latitude: 19.432608, longitude: -99.133209 }} />
//     </MapView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginVertical: 20,
//   },
//   mapFallback: {
//     height: 300,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//     margin: 15,
//     borderRadius: 10,
//     padding: 20,
//   },
//   map: {
//     width: '90%',
//     height: 300,
//     alignSelf: 'center',
//     borderRadius: 10,
//     marginTop: 10,
//   },
//   mapTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#944bb6',
//     marginBottom: 5,
//   },
//   mapAddress: {
//     fontSize: 16,
//     textAlign: 'center',
//     color: '#666',
//     marginBottom: 15,
//   },
//   mapPlaceholder: {
//     alignItems: 'center',
//   },
// });