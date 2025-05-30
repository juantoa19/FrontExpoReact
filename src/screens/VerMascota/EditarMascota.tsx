import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import Navbar from '@/src/components/Navbar/Navbar';
import Sidebar from '@/src/components/Sidebar/Sidebar';
import { RootStackParamList } from '@/src/navigation/Navigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

type EditarMascotaRouteProp = RouteProp<RootStackParamList, 'EditarMascota'>;

const EditarMascota = () => {
  const route = useRoute<EditarMascotaRouteProp>();
  const { mascota } = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    nombre: mascota.nombre,
    especie: mascota.especie,
    raza: mascota.raza,
    sexo: mascota.sexo,
    peso: mascota.peso.toString(),
    edad: mascota.edad.toString(),
    dueño: mascota.dueno.nombre,
    apellidoDuenio: mascota.dueno.apellido,
    telefonoDuenio: mascota.dueno.telefono,
    correoDuenio: mascota.dueno.correo,
    direccionDuenio: mascota.dueno.direccion,
    cedulaDuenio: mascota.dueno.cedula,
  });

  const handleInputChange = (name: keyof typeof formData, value: string) => {
    if (name === 'edad' && value !== '' && !/^\d+$/.test(value)) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formData.nombre || !formData.especie || !formData.cedulaDuenio) {
      showMessage({
        message: "Campos requeridos",
        description: "Por favor complete los campos obligatorios",
        type: "danger",
      });
      return;
    }

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
        direccion: formData.direccionDuenio,
      },
    };

    try {
      setIsLoading(true);
      const response = await axios.put(`https://vetjjg.byronrm.com/animales/${mascota.id}`, dataToSend);

      if (response.status === 200) {
        showMessage({
          message: 'Mascota actualizada',
          description: 'Los cambios se han guardado correctamente',
          type: 'success',
        });
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error al actualizar mascota:', error);
      let errorMessage = 'Ocurrió un error al actualizar la mascota';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }

      showMessage({
        message: 'Error',
        description: errorMessage,
        type: 'danger',
      });
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
          title={'Editar Mascota'}
        />

        <ScrollView contentContainerStyle={styles.container}>
          {/* Pet Information Section */}
          <Text style={styles.sectionTitle}>Información de la Mascota</Text>

          <View style={styles.inputContainer}>
            <MaterialIcons name="pets" size={20} color="#555" />
            <TextInput
              style={styles.input}
              placeholder="Nombre de la Mascota *"
              value={formData.nombre}
              onChangeText={(value) => handleInputChange('nombre', value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons name="category" size={20} color="#555" />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Picker
                selectedValue={formData.especie}
                onValueChange={(value) => handleInputChange('especie', value)}
                style={styles.picker}
              >
                <Picker.Item label="Seleccionar especie *" value="" />
                <Picker.Item label="Perro" value="Perro" />
                <Picker.Item label="Gato" value="Gato" />
                <Picker.Item label="Ave" value="Ave" />
                <Picker.Item label="Roedor" value="Roedor" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons name="pets" size={20} color="#555" />
            <TextInput
              style={styles.input}
              placeholder="Raza"
              value={formData.raza}
              onChangeText={(value) => handleInputChange('raza', value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons name="wc" size={20} color="#555" />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Picker
                selectedValue={formData.sexo}
                onValueChange={(value) => handleInputChange('sexo', value)}
                style={styles.picker}
              >
                <Picker.Item label="Seleccionar sexo" value="" />
                <Picker.Item label="Macho" value="Macho" />
                <Picker.Item label="Hembra" value="Hembra" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons name="fitness-center" size={20} color="#555" />
            <TextInput
              style={styles.input}
              placeholder="Peso (kg)"
              keyboardType="numeric"
              value={formData.peso}
              onChangeText={(value) => handleInputChange('peso', value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons name="cake" size={20} color="#555" />
            <TextInput
              style={styles.input}
              placeholder="Edad"
              keyboardType="numeric"
              value={formData.edad}
              onChangeText={(value) => handleInputChange('edad', value)}
            />
          </View>

          {/* Owner Information Section */}
          <Text style={styles.sectionTitle}>Información del Dueño</Text>

          <View style={styles.inputContainer}>
            <MaterialIcons name="person" size={20} color="#555" />
            <TextInput
              style={styles.input}
              placeholder="Nombre del dueño *"
              value={formData.dueño}
              onChangeText={(value) => handleInputChange('dueño', value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons name="person" size={20} color="#555" />
            <TextInput
              style={styles.input}
              placeholder="Apellido del dueño"
              value={formData.apellidoDuenio}
              onChangeText={(value) => handleInputChange('apellidoDuenio', value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons name="credit-card" size={20} color="#555" />
            <TextInput
              style={styles.input}
              placeholder="Cédula del dueño *"
              keyboardType="numeric"
              value={formData.cedulaDuenio}
              onChangeText={(value) => handleInputChange('cedulaDuenio', value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons name="phone" size={20} color="#555" />
            <TextInput
              style={styles.input}
              placeholder="Teléfono"
              keyboardType="phone-pad"
              value={formData.telefonoDuenio}
              onChangeText={(value) => handleInputChange('telefonoDuenio', value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons name="email" size={20} color="#555" />
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              keyboardType="email-address"
              value={formData.correoDuenio}
              onChangeText={(value) => handleInputChange('correoDuenio', value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons name="home" size={20} color="#555" />
            <TextInput
              style={styles.input}
              placeholder="Dirección"
              value={formData.direccionDuenio}
              onChangeText={(value) => handleInputChange('direccionDuenio', value)}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, isLoading && { opacity: 0.7 }]}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <MaterialIcons name="save" size={20} color="#fff" />
                <Text style={styles.buttonText}>Guardar Cambios</Text>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  picker: {
    flex: 1,
    color: '#333',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default EditarMascota;