import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ConsultamedicaStyles } from './ConsultamedicaStyles';
import Sidebar from '@/src/components/Sidebar/Sidebar';
import Navbar from '@/src/components/Navbar/Navbar';

const ConsultamedicaScreen = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      {/* Sidebar */}
      <Sidebar isVisible={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Contenido principal */}
      <View style={{ flex: 1 }}>
        {/* Navbar */}
        <Navbar
          onMenuPress={() => setIsMenuOpen(!isMenuOpen)}
          isMenuOpen={isMenuOpen}
          title={'Consulta Médica'}
        />

        {/* Aquí puedes colocar el contenido específico de la pantalla */}
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <Text style={{ fontSize: 18 }}>Contenido de la pantalla de consulta médica.</Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default ConsultamedicaScreen;
