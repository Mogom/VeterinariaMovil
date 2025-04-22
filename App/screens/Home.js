import React from 'react';
import { View, ScrollView, Text, StyleSheet, Image, FlatList, TouchableOpacity, Platform } from 'react-native';
// import {MapScreen} from './Mapa.js'


export default function Home({ navigation, route }) {
  const { userId } = route.params; // Recibir el userId desde la pantalla anterior

  const services = [
    { id: '1', name: 'Consulta Veterinaria', img: "https://peru21.pe/sites/default/efsfiles/2024-02/VZQWYWNAVFBGBOD7322PRODCPU.jpg" },
    { id: '2', name: 'Vacunación', img: "https://www.clinicaraza.com/web/image/32994/Veterinario%20a%20domicilio%20-%20Clinica%20Raza.jpg" },
    { id: '3', name: 'Estética Canina', img: "https://www.kantekpremium.mx/wp-content/uploads/2023/10/estetica_felina_1.jpg" },
    { id: '4', name: 'Chequeo General', img: "https://www.clinicaveterinariamh.com/wp-content/uploads/2023/09/Varios-2-2.png" },
  ];

  const reseñas = [
    { 
      id: '1', 
      name: 'Juan Villalobos',
      img: 'https://img.freepik.com/fotos-premium/hombre-calvo-posa-junto-su-querida-mascota-cama-concepto-amor-canino_505281-918.jpg',
      des: 'Excelente servicio para mi labrador Max. El veterinario fue muy profesional y resolvió todos mis problemas. ¡Totalmente recomendado!',
      rating: 5,
      date: '15/03/2024'
    },
    { 
      id: '2', 
      name: 'Daniel Molina', 
      img: 'https://gatosyrespeto.org/wp-content/uploads/2014/08/tony-stark.jpg?w=640',
      des: 'Llevé a mi gato Loki por una emergencia y lo atendieron inmediatamente. El personal es muy amable y las instalaciones impecables.',
      rating: 4,
      date: '02/04/2024'
    },
    { 
      id: '3', 
      name: 'Kerlin Fonseca', 
      img: 'https://st.depositphotos.com/1000686/4327/i/450/depositphotos_43275945-stock-photo-portrait-of-beautiful-young-woman.jpg',
      des: 'El servicio de estética para mi perrita Lulú fue maravilloso. Quedó hermosa y olía delicioso. Volveré sin duda.',
      rating: 5,
      date: '28/03/2024'
    },
  ];

  const cuidados = [
    {
      id: '1',
      title: 'Cuidados básicos para perros',
      tips: [
        'Alimentación balanceada según su edad y tamaño',
        'Ejercicio diario adecuado a su raza',
        'Cepillado regular del pelaje',
        'Limpieza de oídos semanal',
        'Visitas al veterinario cada 6 meses'
      ],
      img: 'https://naricitas.pet/wp-content/uploads/2024/01/alimentacion-equilibrada-perro.jpg'
    },
    {
      id: '2',
      title: 'Cuidados para gatos adultos',
      tips: [
        'Caja de arena siempre limpia',
        'Juguetes para estimulación mental',
        'Cepillado frecuente para evitar bolas de pelo',
        'Control de peso y alimentación especializada',
        'Revisiones veterinarias anuales'
      ],
      img: 'https://www.publico.es/yo-animal/wp-content/uploads/2022/11/cuidados-basicos-gatos-1-1024x683.jpg'
    },
    {
      id: '3',
      title: 'Señales de alerta en mascotas',
      tips: [
        'Cambios en el apetito o consumo de agua',
        'Letargo o falta de energía',
        'Dificultad para respirar',
        'Cambios en el comportamiento habitual',
        'Heridas que no cicatrizan'
      ],
      img: 'https://cdn.unotv.com/images/2023/11/perro-sordo-175845-1024x576.jpg'
    }
  ];

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <Image source={{ uri: item.img }} style={styles.reviewImage} />
      <View style={styles.reviewContent}>
        <Text style={styles.reviewName}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          {[...Array(item.rating)].map((_, i) => (
            <Text key={i} style={styles.star}>★</Text>
          ))}
        </View>
        <Text style={styles.reviewText}>{item.des}</Text>
        <Text style={styles.reviewDate}>{item.date}</Text>
      </View>
    </View>
  );
  
  const renderCareItem = ({ item }) => (
    <TouchableOpacity style={styles.careItem}>
      <Image source={{ uri: item.img }} style={styles.careImage} />
      <View style={styles.careContent}>
        <Text style={styles.careTitle}>{item.title}</Text>
        <View style={styles.tipsContainer}>
          {item.tips.map((tip, index) => (
            <Text key={index} style={styles.tipItem}>• {tip}</Text>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
  
  const renderServiceItem = ({ item }) => (
    <TouchableOpacity 
    style={styles.serviceItem}
      onPress={() => navigation.navigate('ServiceDetail', { 
        serviceId: item.id, 
        serviceName: item.name 
      })}
    >
      <Image source={{ uri: item.img }} style={styles.serviceImage} />
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{item.name}</Text>
        <TouchableOpacity 
          style={styles.detailButton}
          onPress={() => navigation.navigate('ServiceDetail', { 
            serviceId: item.id, 
            serviceName: item.name 
          })}
        >
          <Text style={styles.detailButtonText}>Ver más</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Hero Banner */}
      <View style={styles.heroContainer}>
        <Image 
          source={{ uri: "https://media.cnn.com/api/v1/images/stellar/prod/cnne-1361799-las-5-razas-de-perro-mas-populares-en-estados-unidos.jpeg?c=original" }} 
          style={styles.heroImage}
        />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>Veterinaria Patitas Felices</Text>
          <Text style={styles.heroSubtitle}>Cuidamos a tu mascota como se merece</Text>
          <TouchableOpacity 
            style={styles.ctaButton}
            onPress={() => navigation.navigate('FormCita', { propietario_id: userId })}
          >
            <Text style={styles.ctaButtonText}>Reservar cita</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Services Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nuestros Servicios</Text>
        <FlatList
          data={services}
          renderItem={renderServiceItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.servicesList}
        />
      </View>

      {/* Quick Info */}
      <View style={styles.infoContainer}>
        <View style={styles.infoCard}>
          <Text style={styles.infoNumber}>24/7</Text>
          <Text style={styles.infoText}>Emergencias</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoNumber}>50+</Text>
          <Text style={styles.infoText}>Especialistas</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoNumber}>10+</Text>
          <Text style={styles.infoText}>Años de experiencia</Text>
        </View>
      </View>
      {/* Reviews Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Opiniones de Clientes</Text>
        <FlatList
          data={reseñas}
          renderItem={renderReviewItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.reviewsList}
        />
      </View>

      {/* Care Tips Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Consejos de Cuidado</Text>
        <FlatList
          data={cuidados}
          renderItem={renderCareItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.careList}
        />
      </View>
      {/* Mapa de veterinaria */}
      {Platform.OS === 'web' ? (
      <View style={styles.contactBox}>
        <Text style={styles.contactTitle}>Visítanos en ReactPets</Text>
        <Text style={styles.contactText}>Av. Veterinaria 123, CDMX</Text>
        <Text style={styles.contactText}>Horario: L-V 9am-8pm, Sáb 10am-4pm</Text>
        <Text style={styles.contactText}>Tel: 55 1234 5678</Text>
      </View>
      ) : (
      <View style={styles.mapContainer}>
        <Image 
          source={require("../assets/Mapa.png")}
          style={styles.mapImage}
        />
        <View style={styles.mapOverlay}>
          <Text style={styles.mapTitle}>ReactPets Veterinaria</Text>
          <Text style={styles.mapAddress}>Av. Principal 123, Ciudad de México</Text>
          <Text style={styles.mapHours}>Horario: Lunes a Viernes 9am - 7pm</Text>
        </View>
      </View>
      )}
      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerSection}>
          <Image source={{uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"}}
          style={styles.logo}/>
          <Text style={styles.footerTitle}>ReactPets</Text>
          <Text style={styles.footerText}>Cuidando a tus mascotas desde 2010</Text>
        </View>
        
        <View style={styles.footerSection}>
          <Text style={styles.footerTitle}>Contacto</Text>
          <Text style={styles.footerText}>Tel: 55 1234 5678</Text>
          <Text style={styles.footerText}>Email: info@reactpets.com</Text>
        </View>
        
        <View style={styles.footerSection}>
          <Text style={styles.footerTitle}>Horario</Text>
          <Text style={styles.footerText}>Lunes-Viernes: 9am - 8pm</Text>
          <Text style={styles.footerText}>Sábados: 10am - 4pm</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  heroContainer: {
    height: 250,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(207, 165, 235, 0.58)',
    padding: 20,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 15,
  },
  ctaButton: {
    backgroundColor: '#c175e4',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
  ctaButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  servicesList: {
    paddingBottom: 10,
  },
  serviceItem: {
    width: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    marginRight: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  serviceImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  serviceInfo: {
    padding: 15,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  detailButton: {
    backgroundColor: '#944bb6',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  detailButtonText: {
    color: 'white',
    fontSize: 14,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#944bb6',
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  infoCard: {
    alignItems: 'center',
  },
  infoNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  infoText: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
  },
  reviewsList: {
    paddingBottom: 10,
  },
  reviewItem: {
    width: 280,
    backgroundColor: 'white',
    borderRadius: 12,
    marginRight: 15,
    padding: 15,
    flexDirection: 'row',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  reviewImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  reviewContent: {
    flex: 1,
  },
  reviewName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  star: {
    color: '#FFD700',
    fontSize: 16,
  },
  reviewText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
  careList: {
    paddingBottom: 20,
  },
  careItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  careImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  careContent: {
    padding: 15,
  },
  careTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#944bb6',
    marginBottom: 10,
  },
  tipsContainer: {
    marginLeft: 10,
  },
  tipItem: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  footer: {
    backgroundColor: '#944bb6',
    padding: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  footerSection: {
    width: '30%',
    minWidth: 150,
    marginBottom: 20,
  },
  footerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  footerText: {
    color: '#f0d6ff',
    fontSize: 14,
    marginBottom: 5,
  },
  logo: {
    width: 90,
    height: 80,
    marginBottom: 15,
    tintColor: 'rgb(215, 173, 235)',
  },
  mapContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mapImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  mapOverlay: {
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#944bb6',
    marginBottom: 5,
  },
  mapAddress: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  mapHours: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});