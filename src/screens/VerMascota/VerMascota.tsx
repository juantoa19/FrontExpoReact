import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import VerMascotaStyle from './VerMascotaStyles';
import Navbar from '@/src/components/Navbar/Navbar';
import Sidebar from '@/src/components/Sidebar/Sidebar';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import { RootStackParamList } from '@/src/navigation/Navigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Mascota = RootStackParamList['EditarMascota']['mascota'];

const VerMascota = () => {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'VerMascota'>>();

  const fetchMascotas = async () => {
    try {
      setRefreshing(true);
      const response = await axios.get('https://vetjjg.byronrm.com/animales');
      setMascotas(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las mascotas');
      console.error('Error fetching mascotas:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMascotas();
  }, []);

  const handleEdit = (mascota: Mascota) => {
    navigation.navigate('EditarMascota', { mascota });
  };

  const handleDelete = async (id: number) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar esta mascota?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await axios.delete(`https://vetjjg.byronrm.com/animales/${id}`);
              showMessage({
                message: 'Mascota eliminada',
                description: 'La mascota se ha eliminado correctamente',
                type: 'success',
              });
              fetchMascotas();
            } catch (error) {
              console.error('Error al eliminar mascota:', error);
              showMessage({
                message: 'Error',
                description: 'No se pudo eliminar la mascota',
                type: 'danger',
              });
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }: { item: Mascota }) => (
    <View style={VerMascotaStyle.card}>
      <View style={VerMascotaStyle.petInfoContainer}>
        <View style={VerMascotaStyle.petInfoColumn}>
          <Text style={VerMascotaStyle.title}>{item.nombre}</Text>
          <Text style={VerMascotaStyle.text}>
            <Text style={{ fontWeight: '600' }}>Especie:</Text> {item.especie}
          </Text>
          <Text style={VerMascotaStyle.text}>
            <Text style={{ fontWeight: '600' }}>Edad:</Text> {item.edad} años
          </Text>
        </View>
        <View style={VerMascotaStyle.petInfoColumn}>
          <View style={VerMascotaStyle.chip}>
            <Text style={VerMascotaStyle.chipText}>{item.sexo}</Text>
          </View>
          <Text style={VerMascotaStyle.text}>
            <Text style={{ fontWeight: '600' }}>Raza:</Text> {item.raza}
          </Text>
          <Text style={VerMascotaStyle.text}>
            <Text style={{ fontWeight: '600' }}>Peso:</Text> {item.peso} kg
          </Text>
        </View>
      </View>

      <View style={VerMascotaStyle.actionsContainer}>
        <TouchableOpacity 
          style={[VerMascotaStyle.actionButton, VerMascotaStyle.editButton]}
          onPress={() => handleEdit(item)}
        >
          <MaterialIcons name="edit" size={20} color="#fff" />
          <Text style={VerMascotaStyle.actionButtonText}>Editar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[VerMascotaStyle.actionButton, VerMascotaStyle.deleteButton]}
          onPress={() => handleDelete(item.id)}
        >
          <MaterialIcons name="delete" size={20} color="#fff" />
          <Text style={VerMascotaStyle.actionButtonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        <Sidebar isVisible={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        <View style={{ flex: 1 }}>
          <Navbar
            onMenuPress={() => setIsMenuOpen(!isMenuOpen)}
            isMenuOpen={isMenuOpen}
            title={'Ver Mascotas'}
          />
          <View style={VerMascotaStyle.container}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1 }}>
        <Sidebar isVisible={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        <View style={{ flex: 1 }}>
          <Navbar
            onMenuPress={() => setIsMenuOpen(!isMenuOpen)}
            isMenuOpen={isMenuOpen}
            title={'Ver Mascotas'}
          />
          <View style={VerMascotaStyle.container}>
            <Text style={VerMascotaStyle.errorText}>{error}</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Sidebar isVisible={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <View style={{ flex: 1 }}>
        <Navbar
          onMenuPress={() => setIsMenuOpen(!isMenuOpen)}
          isMenuOpen={isMenuOpen}
          title={'Ver Mascotas'}
        />
        <View style={VerMascotaStyle.container}>
          <FlatList
            data={mascotas}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={VerMascotaStyle.list}
            refreshing={refreshing}
            onRefresh={fetchMascotas}
          />
        </View>
      </View>
    </View>
  );
};

export default VerMascota;