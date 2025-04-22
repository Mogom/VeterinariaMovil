import React, { useEffect, useState } from 'react';
import { View,Image, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';

export default function Profile({ navigation, route }) {
  const { userId } = route.params;
  const [userInfo, setUserInfo] = useState(null);
  const [mascotas, setMascotas] = useState([]);

  useEffect(() => {
    // Obtener información del usuario y sus mascotas
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`http://192.168.0.15/BackCode/getProfile.php?userId=${userId}`);
        const result = await response.json();
        if (result.success) {
          setUserInfo(result.user);
          setMascotas(result.mascotas);
        } else {
          Alert.alert('Error', 'No se pudo cargar la información del perfil.');
        }
      } catch (error) {
        console.error('Error al obtener el perfil:', error);
        Alert.alert('Error', 'No se pudo conectar con el servidor.');
      }
    };

    fetchProfileData();
  }, [userId]);

  return (
    <View style={styles.container}>
      {userInfo && (
       <View style={styles.userInfo}>
       <View style={styles.profileHeader}>
         <Image 
           source={('https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg')}
           style={styles.profileImage}
         />
         <View>
           <Text style={styles.name}>{userInfo.name}</Text>
           <Text style={styles.email}>{userInfo.email}</Text>
         </View>
       </View>
       <Text style={styles.phone}>{userInfo.phone}</Text>
     </View>
      )}

      <Text style={styles.sectionTitle}>Mis Mascotas</Text>
      <FlatList
        data={mascotas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.petItem}>
            <Text style={styles.petName}>{item.pet_name}</Text>
            <Text style={styles.petType}>{item.pet_type}</Text>
            <TouchableOpacity 
              style={styles.scheduleButton}
              onPress={() => navigation.navigate('FormCita', { propietario_id: userId, petId: item.id })}
            >
              <Text style={styles.scheduleButtonText}>Agendar Cita</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity 
        style={styles.addPetButton}
        onPress={() => navigation.navigate('AddPet', { userId })}
      >
        <Text style={styles.addPetButtonText}>Registrar Nueva Mascota</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  userInfo: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    backgroundColor: '#eee',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  phone: {
    fontSize: 16,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#944bb6',
    marginBottom: 15,
    marginLeft: 5,
  },
  petItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  petName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 2,
  },
  petType: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#f0d6ff',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 15,
    marginHorizontal: 10,
    flex: 1,
    textAlign: 'center',
  },
  scheduleButton: {
    backgroundColor: '#c175e4',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flex: 1,
  },
  scheduleButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addPetButton: {
    backgroundColor: '#944bb6',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addPetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
