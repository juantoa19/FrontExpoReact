import { StyleSheet } from 'react-native'; 

export const HomeStyles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'column', // Asegura disposición vertical
  },
  card: {
    marginBottom: 25, // Más espacio entre cartas
    borderWidth: 2,
    borderRadius: 12,
    padding: 20, // Más padding interno
    backgroundColor: '#fff',
    overflow: 'hidden',
    height: 180, // Altura fija pero suficiente
    width: '100%', // Ocupa todo el ancho
    elevation: 3, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 22, // Título más grande
    fontWeight: '600',
    color: '#333',
    marginLeft: 10,
  },
  contentButton: {
    backgroundColor: 'rgba(74, 144, 226, 0.2)',
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  contentButtonText: {
    fontSize: 16,
    color: '#4a90e2',
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto', // Empuja el footer hacia abajo
    backgroundColor: 'rgba(245, 245, 245, 0.9)',
    padding: 10,
    borderRadius: 8,
  },
  statLabel: {
    fontSize: 16, // Texto más legible
    color: '#666',
  },
  statValue: {
    fontSize: 18, // Valor más destacado
    fontWeight: 'bold',
    color: '#333',
  },
  modalContent: {
    width: '90%', // Modal más ancho
    maxHeight: '70%', // Altura máxima
    padding: 25, // Más espacio interno
  },
  });