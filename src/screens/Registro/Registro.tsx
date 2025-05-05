import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  ScrollView, 
  StyleSheet, 
  ActivityIndicator 
} from 'react-native';
import { RegistroStyles } from './RegistroStyles';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import { MaterialIcons } from '@expo/vector-icons';
import { useCitas } from '../../context/CitasContext';
import axios from 'axios';

interface MascotaFormData {
  nombre: string;
  especie: string;
  raza: string;
  sexo: string;
  peso: string;
  edad: string;
  dueño: string;
  apellidoDuenio: string;
  telefonoDuenio: string;
  correoDuenio: string;
  direccionDuenio: string;
  cedulaDuenio: string;
}

const RegistroScreen = () => {
  const [formData, setFormData] = useState<MascotaFormData>({
    nombre: '',
    especie: '',
    raza: '',
    sexo: '',
    peso: '',
    edad: '',
    dueño: '',
    apellidoDuenio: '',
    telefonoDuenio: '',
    correoDuenio: '',
    direccionDuenio: '',
    cedulaDuenio: ''
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<any>();
  const { agregarMascota } = useCitas();

  const handleInputChange = (name: keyof MascotaFormData, value: string) => {
    // Validate age field to only accept numbers
    if (name === 'edad' && value !== '' && !/^\d+$/.test(value)) {
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formData.nombre || !formData.especie || !formData.cedulaDuenio) {
      Alert.alert('Error', 'Por favor complete los campos requeridos');
      return;
    }

    // Preparar los datos según el formato esperado por la API
    const dataToSend = {
      nombre: formData.nombre,
      especie: formData.especie,
      edad: parseInt(formData.edad) || 0,
      raza: formData.raza,
      sexo: formData.sexo,
      peso: parseFloat(formData.peso) || 0,
      dueno: {
        cedula: formData.cedulaDuenio,
        nombre: formData.dueño,
        apellido: formData.apellidoDuenio,
        telefono: formData.telefonoDuenio,
        correo: formData.correoDuenio,
        direccion: formData.direccionDuenio
      }
    };

    try {
      setIsLoading(true);
      const response = await axios.post('https://vetjjg.byronrm.com/animales', dataToSend);
      
      if (response.status === 201) {
        Alert.alert('Éxito', 'Mascota registrada correctamente');
        // Opcional: agregar también al contexto local
        agregarMascota(formData);
        navigation.navigate('AgendarCita');
      }
    } catch (error) {
      console.error('Error al registrar mascota:', error);
      
      let errorMessage = 'Ocurrió un error al registrar la mascota';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Sidebar isVisible={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <View style={{ flex: 1 }}>
        <Navbar
          onMenuPress={() => setIsMenuOpen(!isMenuOpen)}
          isMenuOpen={isMenuOpen}
          title={'Registro de Mascota'}
        />

        <ScrollView contentContainerStyle={styles.container}>
          {/* Pet Information Section */}
          <Text style={RegistroStyles.sectionTitle}>Información de la Mascota</Text>
          
          <View style={RegistroStyles.inputContainer}>
            <MaterialIcons name="pets" size={20} color="#555" />
            <TextInput
              style={RegistroStyles.input}
              placeholder="Nombre de la Mascota *"
              value={formData.nombre}
              onChangeText={(value) => handleInputChange('nombre', value)}
            />
          </View>

          <View style={RegistroStyles.inputContainer}>
            <MaterialIcons name="category" size={20} color="#555" />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Picker
                selectedValue={formData.especie}
                onValueChange={(value) => handleInputChange('especie', value)}
                style={RegistroStyles.picker}
              >
                <Picker.Item label="Seleccionar especie *" value="" />
                <Picker.Item label="Perro" value="Perro" />
                <Picker.Item label="Gato" value="Gato" />
                <Picker.Item label="Ave" value="Ave" />
                <Picker.Item label="Roedor" value="Roedor" />
              </Picker>
            </View>
          </View>

          <View style={RegistroStyles.inputContainer}>
            <MaterialIcons name="pets" size={20} color="#555" />
            <TextInput
              style={RegistroStyles.input}
              placeholder="Raza"
              value={formData.raza}
              onChangeText={(value) => handleInputChange('raza', value)}
            />
          </View>

          <View style={RegistroStyles.inputContainer}>
            <MaterialIcons name="wc" size={20} color="#555" />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Picker
                selectedValue={formData.sexo}
                onValueChange={(value) => handleInputChange('sexo', value)}
                style={RegistroStyles.picker}
              >
                <Picker.Item label="Seleccionar sexo" value="" />
                <Picker.Item label="Macho" value="Macho" />
                <Picker.Item label="Hembra" value="Hembra" />
              </Picker>
            </View>
          </View>

          <View style={RegistroStyles.inputContainer}>
            <MaterialIcons name="fitness-center" size={20} color="#555" />
            <TextInput
              style={RegistroStyles.input}
              placeholder="Peso (kg)"
              keyboardType="numeric"
              value={formData.peso}
              onChangeText={(value) => handleInputChange('peso', value)}
            />
          </View>

          <View style={RegistroStyles.inputContainer}>
            <MaterialIcons name="cake" size={20} color="#555" />
            <TextInput
              style={RegistroStyles.input}
              placeholder="Edad"
              keyboardType="numeric"
              value={formData.edad}
              onChangeText={(value) => handleInputChange('edad', value)}
            />
          </View>

          {/* Owner Information Section */}
          <Text style={RegistroStyles.sectionTitle}>Información del Dueño</Text>

          <View style={RegistroStyles.inputContainer}>
            <MaterialIcons name="person" size={20} color="#555" />
            <TextInput
              style={RegistroStyles.input}
              placeholder="Nombre del dueño *"
              value={formData.dueño}
              onChangeText={(value) => handleInputChange('dueño', value)}
            />
          </View>

          <View style={RegistroStyles.inputContainer}>
            <MaterialIcons name="person" size={20} color="#555" />
            <TextInput
              style={RegistroStyles.input}
              placeholder="Apellido del dueño"
              value={formData.apellidoDuenio}
              onChangeText={(value) => handleInputChange('apellidoDuenio', value)}
            />
          </View>

          <View style={RegistroStyles.inputContainer}>
            <MaterialIcons name="credit-card" size={20} color="#555" />
            <TextInput
              style={RegistroStyles.input}
              placeholder="Cédula del dueño *"
              keyboardType="numeric"
              value={formData.cedulaDuenio}
              onChangeText={(value) => handleInputChange('cedulaDuenio', value)}
            />
          </View>

          <View style={RegistroStyles.inputContainer}>
            <MaterialIcons name="phone" size={20} color="#555" />
            <TextInput
              style={RegistroStyles.input}
              placeholder="Teléfono"
              keyboardType="phone-pad"
              value={formData.telefonoDuenio}
              onChangeText={(value) => handleInputChange('telefonoDuenio', value)}
            />
          </View>

          <View style={RegistroStyles.inputContainer}>
            <MaterialIcons name="email" size={20} color="#555" />
            <TextInput
              style={RegistroStyles.input}
              placeholder="Correo electrónico"
              keyboardType="email-address"
              value={formData.correoDuenio}
              onChangeText={(value) => handleInputChange('correoDuenio', value)}
            />
          </View>

          <View style={RegistroStyles.inputContainer}>
            <MaterialIcons name="home" size={20} color="#555" />
            <TextInput
              style={RegistroStyles.input}
              placeholder="Dirección"
              value={formData.direccionDuenio}
              onChangeText={(value) => handleInputChange('direccionDuenio', value)}
            />
          </View>

          <TouchableOpacity 
            style={[RegistroStyles.button, isLoading && { opacity: 0.7 }]} 
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <MaterialIcons name="save" size={20} color="#fff" />
                <Text style={RegistroStyles.buttonText}>Registrar Mascota</Text>
              </>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default RegistroScreen;