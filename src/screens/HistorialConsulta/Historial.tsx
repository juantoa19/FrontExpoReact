import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  TextInput,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from "react-native";
import Sidebar from "@/src/components/Sidebar/Sidebar";
import Navbar from "@/src/components/Navbar/Navbar";
import { Ionicons } from '@expo/vector-icons';
import { HistorialStyles } from "./HistorialStyles";
import axios from 'axios';

interface Consulta {
  id: number;
  animalId: number;
  fechaConsulta: string;
  motivoConsulta: string;
  sintomas: string;
  diagnostico: string;
  tratamiento: string;
  vacunasAdministradas: string;
  notasAdicionales: string;
  requiereSeguimiento: boolean;
  deleted_at?: string | null;
  animal: {
    nombre: string;
    especie: string;
    raza: string;
    edad: number;
    dueno: {
      nombre: string;
      apellido: string;
      cedula: string;
      telefono: string;
    };
  };
}

const HistorialConsultaScreen = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [expandedCards, setExpandedCards] = useState<number[]>([]);
  const [animation] = useState(new Animated.Value(0));
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Obtener consultas activas al cargar el componente
  useEffect(() => {
    const fetchConsultas = async () => {
      try {
        const response = await axios.get<Consulta[]>('https://vetjjg.byronrm.com/consultas');
        setConsultas(response.data.filter(consulta => !consulta.deleted_at));
        setLoading(false);
      } catch (err) {
        console.error('Error al obtener consultas:', err);
        setError('No se pudieron cargar las consultas');
        setLoading(false);
      }
    };

    fetchConsultas();
  }, []);

  // Función para eliminar una consulta con confirmación
  const handleDeleteConsulta = async (id: number, nombreMascota: string) => {
    setDeletingId(id);
    try {
      await axios.delete(`https://vetjjg.byronrm.com/consultas/${id}`);
      setConsultas(prev => prev.filter(c => c.id !== id));
      Alert.alert('Éxito', 'Consulta eliminada correctamente');
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'No se pudo eliminar la consulta');
    } finally {
      setDeletingId(null);
    }
  };

  // Filtrar consultas basado en la búsqueda
  const filteredConsultas = consultas.filter((consulta: Consulta) =>
    consulta.animal.nombre.toLowerCase().includes(search.toLowerCase()) ||
    consulta.fechaConsulta.includes(search) ||
    `${consulta.animal.dueno.nombre} ${consulta.animal.dueno.apellido}`.toLowerCase().includes(search.toLowerCase())
  );

  // Determinar color de tarjeta basado en fecha
  const getCardColor = (fecha: string) => {
    const today = new Date();
    const citaDate = new Date(fecha);
    return citaDate > today ? '#e8f5e9' : '#E0E1DD';
  };

  // Animación para expandir/contraer tarjetas
  const toggleCard = (id: number) => {
    setExpandedCards(prev => 
      prev.includes(id) ? prev.filter(cardId => cardId !== id) : [...prev, id]
    );
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

  // Estados de carga y error
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red', fontSize: 18 }}>{error}</Text>
        <TouchableOpacity 
          style={{ marginTop: 20, padding: 10, backgroundColor: '#007bff', borderRadius: 5 }}
          onPress={() => window.location.reload()}
        >
          <Text style={{ color: 'white' }}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <Sidebar isVisible={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <View style={{ flex: 1 }}>
        <Navbar 
          onMenuPress={() => setIsMenuOpen(!isMenuOpen)} 
          isMenuOpen={isMenuOpen} 
          title={'Historial de Consultas'} 
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
            {filteredConsultas.map((consulta) => (
              <Animated.View 
                key={consulta.id}
                style={[
                  HistorialStyles.card, 
                  { 
                    backgroundColor: getCardColor(consulta.fechaConsulta),
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                  }
                ]}
              >
                <TouchableOpacity 
                  onPress={() => toggleCard(consulta.id)}
                  style={HistorialStyles.cardHeader}
                >
                  <View>
                    <Text style={HistorialStyles.petName}>{consulta.animal.nombre}</Text>
                    <Text style={HistorialStyles.petInfo}>
                      {consulta.animal.especie} • {consulta.animal.raza} • {consulta.animal.edad} años
                    </Text>
                    <Text style={HistorialStyles.date}>
                      {new Date(consulta.fechaConsulta).toLocaleDateString()}
                    </Text>
                    <Text style={HistorialStyles.owner}>
                      Dueño: {consulta.animal.dueno.nombre} {consulta.animal.dueno.apellido}
                    </Text>
                  </View>
                  <Animated.View style={{ transform: [{ rotate: expandedCards.includes(consulta.id) ? rotateIcon : '0deg' }] }}>
                    <Ionicons name="chevron-down" size={24} color="#555" />
                  </Animated.View>
                </TouchableOpacity>

                {expandedCards.includes(consulta.id) && (
                  <Animated.View 
                    style={[
                      HistorialStyles.cardContent,
                      {
                        opacity: animation,
                        transform: [{ translateY: animation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-10, 0],
                        })}],
                      },
                    ]}
                  >
                    <View style={HistorialStyles.detailRow}>
                      <Text style={HistorialStyles.label}>Dueño:</Text>
                      <Text style={HistorialStyles.value}>
                        {consulta.animal.dueno.nombre} {consulta.animal.dueno.apellido}
                      </Text>
                    </View>

                    <View style={HistorialStyles.detailRow}>
                      <Text style={HistorialStyles.label}>Cédula:</Text>
                      <Text style={HistorialStyles.value}>{consulta.animal.dueno.cedula}</Text>
                    </View>

                    <View style={HistorialStyles.detailRow}>
                      <Text style={HistorialStyles.label}>Teléfono:</Text>
                      <Text style={HistorialStyles.value}>{consulta.animal.dueno.telefono}</Text>
                    </View>

                    <View style={HistorialStyles.detailRow}>
                      <Text style={HistorialStyles.label}>Motivo:</Text>
                      <Text style={HistorialStyles.value}>{consulta.motivoConsulta}</Text>
                    </View>

                    <View style={HistorialStyles.detailRow}>
                      <Text style={HistorialStyles.label}>Síntomas:</Text>
                      <Text style={HistorialStyles.value}>{consulta.sintomas}</Text>
                    </View>

                    <View style={HistorialStyles.detailRow}>
                      <Text style={HistorialStyles.label}>Diagnóstico:</Text>
                      <Text style={[HistorialStyles.value, consulta.diagnostico === 'Saludable' ? HistorialStyles.healthy : HistorialStyles.observation]}>
                        {consulta.diagnostico}
                      </Text>
                    </View>

                    <View style={HistorialStyles.detailRow}>
                      <Text style={HistorialStyles.label}>Tratamiento:</Text>
                      <Text style={HistorialStyles.value}>{consulta.tratamiento}</Text>
                    </View>

                    <View style={HistorialStyles.detailRow}>
                      <Text style={HistorialStyles.label}>Vacunas:</Text>
                      <Text style={HistorialStyles.value}>{consulta.vacunasAdministradas}</Text>
                    </View>

                    <View style={HistorialStyles.detailRow}>
                      <Text style={HistorialStyles.label}>Notas:</Text>
                      <Text style={HistorialStyles.value}>{consulta.notasAdicionales}</Text>
                    </View>

                    <View style={[HistorialStyles.detailRow, { justifyContent: 'space-between' }]}>
                      <View>
                        <Text style={HistorialStyles.label}>Seguimiento:</Text>
                        <Text style={[HistorialStyles.value, consulta.requiereSeguimiento ? HistorialStyles.followUp : {}]}>
                          {consulta.requiereSeguimiento ? 'Sí' : 'No'}
                        </Text>
                      </View>
                      
                      <TouchableOpacity 
                        style={[
                          HistorialStyles.deleteButton,
                          deletingId === consulta.id && HistorialStyles.deleteButtonDisabled
                        ]}
                        onPress={() => {
                          Alert.alert(
                            'Confirmar eliminación',
                            `¿Estás seguro que deseas eliminar la consulta de ${consulta.animal.nombre}?`,
                            [
                              { text: 'Cancelar', style: 'cancel' },
                              { 
                                text: 'Eliminar', 
                                onPress: () => handleDeleteConsulta(consulta.id, consulta.animal.nombre),
                                style: 'destructive'
                              }
                            ]
                          );
                        }}
                        disabled={deletingId === consulta.id}
                      >
                        {deletingId === consulta.id ? (
                          <ActivityIndicator size="small" color="white" />
                        ) : (
                          <Text style={HistorialStyles.deleteButtonText}>Eliminar Consulta</Text>
                        )}
                      </TouchableOpacity>
                    </View>

                    {consulta.requiereSeguimiento && (
                      <TouchableOpacity style={HistorialStyles.followUpButton}>
                        <Text style={HistorialStyles.followUpButtonText}>Programar seguimiento</Text>
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

export default HistorialConsultaScreen;