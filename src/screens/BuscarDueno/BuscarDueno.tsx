import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { BuscarDuenoStyles } from './BuscarDuenoStyles';
import Sidebar from '@/src/components/Sidebar/Sidebar';
import Navbar from '@/src/components/Navbar/Navbar';
import { useCitas } from '@/src/context/CitasContext';
import { MascotaDueno } from './BuscarDuenoTypes';

const Buscar = () => {
  const [searchText, setSearchText] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { mascotas } = useCitas();
  const [resultados, setResultados] = useState<MascotaDueno[]>([]);

  useEffect(() => {
    if (searchText.length > 2) {
      const filtered = mascotas.filter(m =>
        m.dueño.toLowerCase().includes(searchText.toLowerCase()) ||
        m.cedulaDuenio.includes(searchText)
      ).map(m => ({
        id: m.id,
        nombreDueno: m.dueño,
        cedulaDueno: m.cedulaDuenio,
        nombreMascota: m.nombre,
        especie: m.especie,
        raza: m.raza || 'Desconocida',
        edad: m.edad,
        peso: m.peso
      }));
      setResultados(filtered);
    } else {
      setResultados([]);
    }
  }, [searchText, mascotas]);

  const getPetIcon = (especie: string) => {
    switch (especie.toLowerCase()) {
      case 'perro': return 'pets';
      case 'gato': return 'cat';
      case 'ave': return 'flutter-dash';
      case 'conejo': return 'rabbit';
      default: return 'pets';
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Sidebar isVisible={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <View style={{ flex: 1 }}>
        <Navbar
          onMenuPress={() => setIsMenuOpen(!isMenuOpen)}
          isMenuOpen={isMenuOpen}
          title={'Buscar Dueño'}
        />

        <View style={BuscarDuenoStyles.container}>
          <View style={BuscarDuenoStyles.searchContainer}>
            <TextInput
              style={BuscarDuenoStyles.searchInput}
              placeholder="Buscar por nombre o cédula del dueño"
              value={searchText}
              onChangeText={setSearchText}
            />
            <MaterialIcons
              name="search"
              size={24}
              color="#7f8c8d"
              style={BuscarDuenoStyles.searchIcon}
            />
          </View>

          <FlatList
            data={resultados}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={BuscarDuenoStyles.card}>
                {/* Encabezado con avatar */}
                <View style={BuscarDuenoStyles.cardHeader}>
                  <View style={BuscarDuenoStyles.avatarContainer}>
                    <Text style={BuscarDuenoStyles.avatarText}>
                      {item.nombreDueno.charAt(0).toUpperCase()}
                    </Text>
                  </View>

                  <View style={BuscarDuenoStyles.ownerInfo}>
                    <Text style={BuscarDuenoStyles.ownerName}>
                      {item.nombreDueno}
                    </Text>
                    <Text style={BuscarDuenoStyles.ownerId}>
                      <MaterialIcons size={14} color="#0D1B2A" />{' '}
                      {item.cedulaDueno}
                    </Text>
                  </View>
                </View>
                <View style={BuscarDuenoStyles.divider} />

                {/* Información de la mascota */}
                <View style={BuscarDuenoStyles.petHeader}>
                  <MaterialIcons name="pets" size={20} color="#3498db" />
                  <Text style={BuscarDuenoStyles.petName}>
                    {item.nombreMascota}
                  </Text>
                </View>

                {/* Detalles de la mascota */}
                <View style={BuscarDuenoStyles.petInfoContainer}>
                  <View style={BuscarDuenoStyles.petInfoRow}>
                    <Text style={BuscarDuenoStyles.petInfoLabel}>
                      <MaterialIcons name="pets" size={14} color="#7f8c8d" /> Especie:
                    </Text>
                    <Text style={BuscarDuenoStyles.petInfoValue}>{item.especie}</Text>
                  </View>

                  <View style={BuscarDuenoStyles.petInfoRow}>
                    <Text style={BuscarDuenoStyles.petInfoLabel}>
                      <MaterialIcons name="straighten" size={14} color="#7f8c8d" /> Raza:
                    </Text>
                    <Text style={BuscarDuenoStyles.petInfoValue}>{item.raza}</Text>
                  </View>

                  <View style={BuscarDuenoStyles.petInfoRow}>
                    <Text style={BuscarDuenoStyles.petInfoLabel}>
                      <MaterialIcons name="cake" size={14} color="#7f8c8d" /> Edad:
                    </Text>
                    <Text style={BuscarDuenoStyles.petInfoValue}>{item.edad} años</Text>
                  </View>

                  <View style={BuscarDuenoStyles.petInfoRow}>
                    <Text style={BuscarDuenoStyles.petInfoLabel}>
                      <MaterialIcons name="fitness-center" size={14} color="#7f8c8d" /> Peso:
                    </Text>
                    <Text style={BuscarDuenoStyles.petInfoValue}>{item.peso} kg</Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default Buscar;