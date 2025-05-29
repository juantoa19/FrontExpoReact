import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import axios from 'axios';
import VerMascotaStyle from './VerMascotaStyles';
import Navbar from '@/src/components/Navbar/Navbar';
import Sidebar from '@/src/components/Sidebar/Sidebar';

interface Dueno {
  cedula: string;
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
  direccion: string;
}

interface Mascota {
  id: number;
  nombre: string;
  especie: string;
  edad: number;
  raza: string;
  sexo: string;
  peso: number;
  dueno: Dueno;
}

const VerMascota = () => {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const response = await axios.get('https://vetjjg.byronrm.com/animales');
        setMascotas(response.data);
        setError(null);
      } catch (err) {
        setError('Error al cargar las mascotas');
        console.error('Error fetching mascotas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMascotas();
  }, []);

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

    <View style={VerMascotaStyle.ownerSection}>
      <Text style={VerMascotaStyle.subtitle}>Información del Dueño</Text>
      <Text style={VerMascotaStyle.text}>
        <Text style={{ fontWeight: '600' }}>Nombre:</Text> {item.dueno.nombre} {item.dueno.apellido}
      </Text>
      <Text style={VerMascotaStyle.text}>
        <Text style={{ fontWeight: '600' }}>Cédula:</Text> {item.dueno.cedula}
      </Text>
      <Text style={VerMascotaStyle.text}>
        <Text style={{ fontWeight: '600' }}>Teléfono:</Text> {item.dueno.telefono}
      </Text>
      <Text style={VerMascotaStyle.text}>
        <Text style={{ fontWeight: '600' }}>Correo:</Text> {item.dueno.correo}
      </Text>
      <Text style={VerMascotaStyle.text}>
        <Text style={{ fontWeight: '600' }}>Dirección:</Text> {item.dueno.direccion}
      </Text>
    </View>
  </View>
);

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
          />
        </View>
      </View>
    </View>
  );
};

export default VerMascota;