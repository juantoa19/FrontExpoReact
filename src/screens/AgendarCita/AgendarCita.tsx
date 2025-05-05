import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Switch, ScrollView, StyleSheet } from 'react-native';
import { AgendarCitaStyles } from './AgendarCitasStyles';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Sidebar from '@/src/components/Sidebar/Sidebar';
import Navbar from '@/src/components/Navbar/Navbar';
import { useCitas } from '../../context/CitasContext';

const AgendarCitaScreen = () => {
  const navigation = useNavigation<any>();
  const { mascotas, agregarCita } = useCitas();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [formData, setFormData] = useState({
    animal: '',
    fecha: '',
    hora: '',
    motivo: '',
    tratamiento: '',
    vacunasAdministradas: '',
    notasAdicionales: '',
    diagnostico: '',
    requiereSeguimiento: false,
  });

  // Vaccine options
  const vaccineOptions = [
    'Ninguna',
    'Rabia',
    'Moquillo',
    'Parvovirus',
    'Leptospirosis',
    'Hepatitis canina',
    'Triple felina'
  ];

  // Treatment options
  const treatmentOptions = [
    'Ninguno',
    'Antibióticos',
    'Antiinflamatorios',
    'Analgésicos',
    'Antiparasitarios',
    'Quimioterapia',
    'Fluidoterapia'
  ];

  useEffect(() => {
    const now = new Date();
    const fecha = now.toISOString().split('T')[0];
    const hora = now.toTimeString().split(' ')[0].substring(0, 5);

    setFormData(prev => ({
      ...prev,
      fecha,
      hora,
    }));
  }, []);

  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (!formData.animal || !formData.motivo) {
      Alert.alert('Error', 'Por favor complete todos los campos requeridos');
      return;
    }
  
    const mascotaSeleccionada = mascotas.find(m => m.nombre === formData.animal);
    
    if (!mascotaSeleccionada) {
      Alert.alert('Error', 'Mascota no encontrada');
      return;
    }
  
    const nuevaCita = {
      cedulaDuenio: mascotaSeleccionada.cedulaDuenio,
      nombreMascota: formData.animal,
      tipoMascota: mascotaSeleccionada.especie,
      raza: mascotaSeleccionada.raza,
      edad: mascotaSeleccionada.edad,
      dueño: mascotaSeleccionada.dueño,
      telefonoDuenio: mascotaSeleccionada.telefonoDuenio,
      motivo: formData.motivo,
      tratamiento: formData.tratamiento,
      vacunasAdministradas: formData.vacunasAdministradas,
      notasAdicionales: formData.notasAdicionales,
      diagnostico: formData.diagnostico || 'Sin diagnóstico',
      seguimiento: formData.requiereSeguimiento ? 'Sí' : 'No',
      fecha: formData.fecha,
      hora: formData.hora,
    };
  
    agregarCita(nuevaCita);
    Alert.alert('Cita Agendada', 'La cita se ha registrado correctamente');
    navigation.navigate('HistorialCitas');
  };

  return (
    <View style={{ flex: 1 }}>
      <Sidebar isVisible={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <View style={{ flex: 1 }}>
        <Navbar 
          onMenuPress={() => setIsMenuOpen(!isMenuOpen)} 
          isMenuOpen={isMenuOpen} 
          title={'Agendar Cita'} 
        />

        <ScrollView contentContainerStyle={styles.container}>
          <Text style={AgendarCitaStyles.label}>Animal *</Text>
          <View style={AgendarCitaStyles.picker}>
            <Picker
              selectedValue={formData.animal}
              onValueChange={(value) => handleInputChange('animal', value)}
            >
              <Picker.Item label="Seleccionar Mascota" value="" />
              {mascotas.map((mascota) => (
                <Picker.Item key={mascota.id} label={mascota.nombre} value={mascota.nombre} />
              ))}
            </Picker>
          </View>

          <Text style={AgendarCitaStyles.label}>Fecha</Text>
          <TextInput
            style={AgendarCitaStyles.input}
            value={formData.fecha}
            editable={false}
          />

          <Text style={AgendarCitaStyles.label}>Hora</Text>
          <TextInput
            style={AgendarCitaStyles.input}
            value={formData.hora}
            editable={false}
          />

          <Text style={AgendarCitaStyles.label}>Motivo de la Cita *</Text>
          <TextInput
            style={AgendarCitaStyles.input}
            placeholder="Motivo"
            value={formData.motivo}
            onChangeText={(value) => handleInputChange('motivo', value)}
          />

          <Text style={AgendarCitaStyles.label}>Tratamiento</Text>
          <View style={AgendarCitaStyles.picker}>
            <Picker
              selectedValue={formData.tratamiento}
              onValueChange={(value) => handleInputChange('tratamiento', value)}
            >
              {treatmentOptions.map((option) => (
                <Picker.Item key={option} label={option} value={option} />
              ))}
            </Picker>
          </View>

          <Text style={AgendarCitaStyles.label}>Vacunas Administradas</Text>
          <View style={AgendarCitaStyles.picker}>
            <Picker
              selectedValue={formData.vacunasAdministradas}
              onValueChange={(value) => handleInputChange('vacunasAdministradas', value)}
            >
              {vaccineOptions.map((option) => (
                <Picker.Item key={option} label={option} value={option} />
              ))}
            </Picker>
          </View>

          <Text style={AgendarCitaStyles.label}>Notas Adicionales</Text>
          <TextInput
            style={[AgendarCitaStyles.input, { height: 100 }]}
            placeholder="Notas adicionales"
            multiline
            value={formData.notasAdicionales}
            onChangeText={(value) => handleInputChange('notasAdicionales', value)}
          />

          <Text style={AgendarCitaStyles.label}>Diagnóstico</Text>
          <TextInput
            style={[AgendarCitaStyles.input, { height: 100 }]}
            placeholder="Diagnóstico"
            multiline
            value={formData.diagnostico}
            onChangeText={(value) => handleInputChange('diagnostico', value)}
          />

          <View style={AgendarCitaStyles.switchContainer}>
            <Switch
              value={formData.requiereSeguimiento}
              onValueChange={(value) => handleInputChange('requiereSeguimiento', value)}
            />
            <Text style={AgendarCitaStyles.switchLabel}>¿Requiere Seguimiento?</Text>
          </View>

          <TouchableOpacity style={AgendarCitaStyles.button} onPress={handleSubmit}>
            <Text style={AgendarCitaStyles.buttonText}>Registrar Cita</Text>
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

export default AgendarCitaScreen;