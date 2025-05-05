import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput,
  Animated,
  TouchableOpacity
} from "react-native";
import Sidebar from "@/src/components/Sidebar/Sidebar";
import Navbar from "@/src/components/Navbar/Navbar";
import { Ionicons } from '@expo/vector-icons';
import { HistorialStyles } from "./HistorialStyles";
import { useCitas } from '../../context/CitasContext';

const HistorialCitasScreen = () => {
  const { citas } = useCitas();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [expandedCards, setExpandedCards] = useState<number[]>([]);
  const [animation] = useState(new Animated.Value(0));

  const filteredCitas = citas.filter(cita =>
    cita.nombreMascota.toLowerCase().includes(search.toLowerCase()) ||
    cita.fecha.includes(search) ||
    cita.dueño.toLowerCase().includes(search.toLowerCase())
  );

  const getCardColor = (fecha: string) => {
    const today = new Date();
    const citaDate = new Date(fecha);
    return citaDate > today ? '#e8f5e9' : '#E0E1DD';
  };

  const toggleCard = (id: number) => {
    if (expandedCards.includes(id)) {
      setExpandedCards(expandedCards.filter(cardId => cardId !== id));
    } else {
      setExpandedCards([...expandedCards, id]);
    }
    
    animation.setValue(0);
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const rotateIcon = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={{flex: 1}}>
      <Sidebar isVisible={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <View style={{ flex: 1 }}>
        <Navbar 
          onMenuPress={() => setIsMenuOpen(!isMenuOpen)} 
          isMenuOpen={isMenuOpen} 
          title={'Historial Citas'} 
        />

        <View style={HistorialStyles.container}>
          <View style={HistorialStyles.searchContainer}>
            <Ionicons name="search" size={20} color="#666" style={HistorialStyles.searchIcon} />
            <TextInput
              placeholder="Buscar por mascota, dueño o fecha"
              value={search}
              onChangeText={setSearch}
              style={HistorialStyles.searchInput}
              placeholderTextColor="#888"
            />
          </View>

          <ScrollView contentContainerStyle={HistorialStyles.scrollContainer}>
            {filteredCitas.map((cita) => (
              <Animated.View 
                key={cita.id}
                style={[
                  HistorialStyles.card, 
                  { 
                    backgroundColor: getCardColor(cita.fecha),
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                  }
                ]}
              >
                <TouchableOpacity 
                  onPress={() => toggleCard(cita.id)}
                  style={HistorialStyles.cardHeader}
                >
                  <View>
                    <Text style={HistorialStyles.petName}>{cita.nombreMascota}</Text>
                    <Text style={HistorialStyles.petInfo}>
                      {cita.tipoMascota} • {cita.raza} • {cita.edad}
                    </Text>
                    <Text style={HistorialStyles.date}>{cita.fecha} - {cita.hora}</Text>
                    <Text style={HistorialStyles.owner}>Dueño: {cita.dueño}</Text>
                  </View>
                  <Animated.View style={{ transform: [{ rotate: expandedCards.includes(cita.id) ? rotateIcon : '0deg' }] }}>
                    <Ionicons name="chevron-down" size={24} color="#555" />
                  </Animated.View>
                </TouchableOpacity>

                {expandedCards.includes(cita.id) && (
                  <Animated.View 
                    style={[
                      HistorialStyles.cardContent,
                      {
                        opacity: animation,
                        transform: [
                          {
                            translateY: animation.interpolate({
                              inputRange: [0, 1],
                              outputRange: [-10, 0],
                            }),
                          },
                        ],
                      },
                    ]}
                  >
                    <View style={HistorialStyles.detailRow}>
                      <Text style={HistorialStyles.label}>Dueño:</Text>
                      <Text style={HistorialStyles.value}>{cita.dueño}</Text>
                    </View>

                    <View style={HistorialStyles.detailRow}>
                      <Text style={HistorialStyles.label}>Cédula:</Text>
                      <Text style={HistorialStyles.value}>{cita.cedulaDuenio}</Text>
                    </View>

                    <View style={HistorialStyles.detailRow}>
                      <Text style={HistorialStyles.label}>Teléfono:</Text>
                      <Text style={HistorialStyles.value}>{cita.telefonoDuenio}</Text>
                    </View>

                    <View style={HistorialStyles.detailRow}>
                      <Text style={HistorialStyles.label}>Motivo:</Text>
                      <Text style={HistorialStyles.value}>{cita.motivo}</Text>
                    </View>

                    <View style={HistorialStyles.detailRow}>
                      <Text style={HistorialStyles.label}>Tratamiento:</Text>
                      <Text style={HistorialStyles.value}>{cita.tratamiento}</Text>
                    </View>

                    <View style={HistorialStyles.detailRow}>
                      <Text style={HistorialStyles.label}>Vacunas:</Text>
                      <Text style={HistorialStyles.value}>{cita.vacunasAdministradas}</Text>
                    </View>

                    <View style={HistorialStyles.detailRow}>
                      <Text style={HistorialStyles.label}>Notas:</Text>
                      <Text style={HistorialStyles.value}>{cita.notasAdicionales}</Text>
                    </View>

                    <View style={HistorialStyles.detailRow}>
                      <Text style={HistorialStyles.label}>Diagnóstico:</Text>
                      <Text style={[HistorialStyles.value, cita.diagnostico === 'Saludable' ? HistorialStyles.healthy : HistorialStyles.observation]}>
                        {cita.diagnostico}
                      </Text>
                    </View>

                    <View style={HistorialStyles.detailRow}>
                      <Text style={HistorialStyles.label}>Seguimiento:</Text>
                      <Text style={[HistorialStyles.value, cita.seguimiento === 'Sí' ? HistorialStyles.followUp : {}]}>
                        {cita.seguimiento}
                      </Text>
                    </View>

                    {cita.seguimiento === 'Sí' && (
                      <TouchableOpacity style={HistorialStyles.followUpButton}>
                        <Text style={HistorialStyles.followUpButtonText}>Programar seguimiento </Text>
                      </TouchableOpacity>
                    )}
                  </Animated.View>
                )}
              </Animated.View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default HistorialCitasScreen;