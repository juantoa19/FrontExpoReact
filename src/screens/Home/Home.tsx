import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, ScrollView, TouchableOpacity, ImageBackground, Modal, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';

const { width } = Dimensions.get('window');

const cardBackgrounds = [
  require('../../assets/images/veterinaria1.jpg'),
  require('../../assets/images/veterinaria2.jpg'),
  require('../../assets/images/veterinaria3.jpg'),
  require('../../assets/images/veterinaria4.jpg'),
];

// Contenido informativo para cada modal
const cardInfo = {
  citas: {
    title: "Información de Citas",
    content: "Aquí puedes ver todas las citas programadas para hoy. Total de citas agendadas este mes: 27."
  },
  historial: {
    title: "Historial de Mascotas",
    content: "Registro completo de todas las mascotas atendidas en la clínica. Total registrado: 153."
  },
  vacunas: {
    title: "Control de Vacunas",
    content: "Registro de vacunas aplicadas este mes. Total administradas: 120."
  },
  dueno: {
    title: "Historial de Dueños",
    content: "Información detallada de los dueños y sus mascotas. Total registrados: 85."
  }
};

interface CardProps {
  title: string;
  icon: string;
  statLabel: string;
  statValue: string;
  bgImage: any;
  cardKey: string;
  onPressInfo: (key: string) => void;
}

const Card: React.FC<CardProps> = ({ title, icon, statLabel, statValue, bgImage, cardKey, onPressInfo }) => {
  const borderAnim = useRef(new Animated.Value(0)).current;
  const [expanded, setExpanded] = useState(false);  // Controla si está abierto/cerrado
  const contentHeight = useRef(new Animated.Value(0)).current; // Altura animada

  useEffect(() => {
    Animated.loop(
      Animated.timing(borderAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  useEffect(() => {
    Animated.timing(contentHeight, {
      toValue: expanded ? 100 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [expanded]);

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FFA07A', '#20B2AA'],
  });

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Animated.View style={[styles.card, { borderColor }]}>
      <ImageBackground 
        source={bgImage} 
        style={styles.backgroundImage}
        imageStyle={{ borderRadius: 10, opacity: 0.3 }}
      >
        <View style={styles.header}>
          <Icon name={icon} size={24} color="#333" style={styles.icon} />
          <Text style={styles.title}>{title}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.overlay} 
          onPress={toggleExpand}
          activeOpacity={0.7}
        >
          <Text style={styles.overlayText}>Contenido de veterinaria aquí</Text>
          
          <Animated.View style={[styles.expandableContent, { height: contentHeight }]}>
            <Text style={styles.expandedText}>
              {cardInfo[cardKey as keyof typeof cardInfo].content}
            </Text>
            <TouchableOpacity 
              style={styles.infoButton}
              onPress={() => onPressInfo(cardKey)}
            >
              <Text style={styles.infoButtonText}>Más información</Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
        
        <View style={styles.footer}>
          <Text style={styles.statLabel}>{statLabel}</Text>
          <Text style={styles.statValue}>{statValue}</Text>
        </View>
      </ImageBackground>
    </Animated.View>
  );
};

const HomeScreen = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); //Navbbar y sidebar
  const [modalVisible, setModalVisible] = useState(false);
  const [currentInfo, setCurrentInfo] = useState({ title: '', content: '' });

  const handleInfoPress = (cardKey: string) => {
    setCurrentInfo(cardInfo[cardKey as keyof typeof cardInfo]);
    setModalVisible(true);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Sidebar */}
      <Sidebar 
        isVisible={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />
      
      <View style={{ flex: 1 }}>
        {/* Navbar */}
        <Navbar 
          onMenuPress={() => setIsMenuOpen(!isMenuOpen)}
          isMenuOpen={isMenuOpen} 
          title={'Dashboard'} 
        />
        
        {/* Main Content */}
        <View style={styles.mainContent}>
          <ScrollView contentContainerStyle={styles.container}>
            <Card 
              title="Citas Mascotas" 
              icon="calendar-check" 
              statLabel="Agendadas" 
              statValue="27" 
              bgImage={cardBackgrounds[0]}
              cardKey="citas"
              onPressInfo={handleInfoPress}
            />
            
            <Card 
              title="Historial Mascotas" 
              icon="dog" 
              statLabel="Registradas" 
              statValue="153" 
              bgImage={cardBackgrounds[1]}
              cardKey="historial"
              onPressInfo={handleInfoPress}
            />
            
            <Card 
              title="Vacunas" 
              icon="needle" 
              statLabel="Vendidas" 
              statValue="120" 
              bgImage={cardBackgrounds[2]}
              cardKey="vacunas"
              onPressInfo={handleInfoPress}
            />
            
            <Card 
              title="Historial Dueño" 
              icon="account" 
              statLabel="Registrados" 
              statValue="85" 
              bgImage={cardBackgrounds[3]}
              cardKey="dueno"
              onPressInfo={handleInfoPress}
            />
          </ScrollView>
        </View>
      </View>

      {/* Modal de información */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{currentInfo.title}</Text>
            <Text style={styles.modalText}>{currentInfo.content}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingBottom: 30,
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    height: 220,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 2,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'space-between',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 5,
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
  overlayText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  expandableContent: {
    width: '100%',
    overflow: 'hidden',
    marginTop: 10,
  },
  expandedText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 10,
    textAlign: 'center',
  },
  infoButton: {
    backgroundColor: '#20B2AA',
    padding: 8,
    borderRadius: 5,
    alignSelf: 'center',
  },
  infoButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 10,
    borderRadius: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#555',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: width * 0.8,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555',
  },
  modalButton: {
    backgroundColor: '#20B2AA',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;