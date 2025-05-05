import { StyleSheet } from 'react-native';

export const SidebarStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '75%', // O el ancho que prefieras (puede ser 300)
    backgroundColor: '#2c3e50',
    zIndex: 1000, // Asegúrate que esté por encima de todo
    elevation: 50, // Para Android
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#34495e',
  },
  item:{

  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  menuItemsContainer: {
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  closeButton:
  {

  },
  menuIcon: {
    marginRight: 15,
    width: 24,
  },
  menuText: {
    color: 'white',
    fontSize: 16,
  },
});