import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Navigator } from './src/navigation/Navigator';
import { StyleSheet } from 'react-native';
import { CitasProvider } from './src/context/CitasContext';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <CitasProvider>
        <Navigator />
      </CitasProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});