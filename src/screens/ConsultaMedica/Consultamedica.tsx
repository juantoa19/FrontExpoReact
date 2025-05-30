import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { ConsultamedicaStyles } from './ConsultamedicaStyles';
import Sidebar from '@/src/components/Sidebar/Sidebar';
import Navbar from '@/src/components/Navbar/Navbar';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const ConsultamedicaScreen = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [animales, setAnimales] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Estado del formulario
  const [formData, setFormData] = useState({
    animalId: '',
    fechaConsulta: new Date().toISOString().split('T')[0],
    motivoConsulta: '',
    sintomas: '',
    diagnostico: '',
    tratamiento: '',
    vacunasAdministradas: '',
    notasAdicionales: '',
    requiereSeguimiento: false
  });

  // Obtener lista de animales al cargar el componente
  useEffect(() => {
    const fetchAnimales = async () => {
      try {
        const response = await axios.get('https://vetjjg.byronrm.com/animales');
        setAnimales(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener animales:', error);
        setLoading(false);
      }
    };
    fetchAnimales();
  }, []);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    setFormData({
      ...formData,
      fechaConsulta: currentDate.toISOString().split('T')[0]
    });
  };

  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    if (!formData.animalId) {
      Alert.alert('Error', 'Por favor selecciona un animal');
      return;
    }

    try {
      const response = await axios.post(
        `https://vetjjg.byronrm.com/consultas/${formData.animalId}`,
        formData
      );

      Alert.alert('Éxito', 'Consulta médica registrada correctamente');
      // Limpiar formulario después de enviar
      setFormData({
        animalId: '',
        fechaConsulta: new Date().toISOString().split('T')[0],
        motivoConsulta: '',
        sintomas: '',
        diagnostico: '',
        tratamiento: '',
        vacunasAdministradas: '',
        notasAdicionales: '',
        requiereSeguimiento: false
      });
    } catch (error) {
      console.error('Error al registrar consulta:', error);
      Alert.alert('Error', 'No se pudo registrar la consulta médica');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Sidebar isVisible={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <View style={{ flex: 1 }}>
        <Navbar
          onMenuPress={() => setIsMenuOpen(!isMenuOpen)}
          isMenuOpen={isMenuOpen}
          title={'Consulta Médica'}
        />

        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Registrar Nueva Consulta Médica</Text>

          {loading ? (
            <Text>Cargando animales...</Text>
          ) : (
            <>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Animal:</Text>
                <Picker
                  selectedValue={formData.animalId}
                  onValueChange={(itemValue) => handleInputChange('animalId', itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Selecciona un animal" value="" />
                  {animales.map((animal) => (
                    <Picker.Item 
                      key={animal.id} 
                      label={`${animal.nombre} (${animal.especie}) | ${animal.dueno.cedula} ${animal.dueno.nombre}${animal.dueno.apellido} `} 
                      value={animal.id} 
                    />
                  ))}
                </Picker>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Fecha de Consulta:</Text>
                <TouchableOpacity 
                  style={styles.dateInput} 
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text>{formData.fechaConsulta}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                  />
                )}
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Motivo de Consulta:</Text>
                <TextInput
                  style={styles.input}
                  value={formData.motivoConsulta}
                  onChangeText={(text) => handleInputChange('motivoConsulta', text)}
                  placeholder="Ingrese el motivo de la consulta"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Síntomas:</Text>
                <TextInput
                  style={[styles.input, styles.multilineInput]}
                  value={formData.sintomas}
                  onChangeText={(text) => handleInputChange('sintomas', text)}
                  placeholder="Describa los síntomas observados"
                  multiline
                  numberOfLines={4}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Diagnóstico:</Text>
                <TextInput
                  style={[styles.input, styles.multilineInput]}
                  value={formData.diagnostico}
                  onChangeText={(text) => handleInputChange('diagnostico', text)}
                  placeholder="Ingrese el diagnóstico"
                  multiline
                  numberOfLines={4}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Tratamiento:</Text>
                <TextInput
                  style={[styles.input, styles.multilineInput]}
                  value={formData.tratamiento}
                  onChangeText={(text) => handleInputChange('tratamiento', text)}
                  placeholder="Describa el tratamiento indicado"
                  multiline
                  numberOfLines={4}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Vacunas Administradas:</Text>
                <TextInput
                  style={styles.input}
                  value={formData.vacunasAdministradas}
                  onChangeText={(text) => handleInputChange('vacunasAdministradas', text)}
                  placeholder="Lista de vacunas aplicadas"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Notas Adicionales:</Text>
                <TextInput
                  style={[styles.input, styles.multilineInput]}
                  value={formData.notasAdicionales}
                  onChangeText={(text) => handleInputChange('notasAdicionales', text)}
                  placeholder="Otras observaciones relevantes"
                  multiline
                  numberOfLines={4}
                />
              </View>

              <View style={styles.formGroup}>
                <View style={styles.checkboxContainer}>
                  <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => handleInputChange('requiereSeguimiento', !formData.requiereSeguimiento)}
                  >
                    {formData.requiereSeguimiento && <View style={styles.checked} />}
                  </TouchableOpacity>
                  <Text style={styles.checkboxLabel}>Requiere seguimiento</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Registrar Consulta</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontWeight: '600',
    color: '#444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    backgroundColor: '#fff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checked: {
    width: 14,
    height: 14,
    borderRadius: 2,
    backgroundColor: '#4CAF50',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#444',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ConsultamedicaScreen;