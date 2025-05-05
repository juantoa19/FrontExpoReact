import { StyleSheet } from 'react-native';

export const BuscarDuenoStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f7',
  },
  
  // Estilos para la búsqueda
  searchContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  searchInput: {
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#e1e5e9',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 45,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  searchIcon: {
    position: 'absolute',
    right: 20,
    top: 13,
  },

  // Estilos para la tarjeta
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#4a90e2',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 8,
  },

  // Estilos para el avatar
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#4a90e2',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4a90e2',
  },
  ownerInfo: {
    flex: 1,
  },
  ownerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  ownerId: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
  },

  // Estilos para la mascota
  petHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  petName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3498db',
    marginLeft: 8,
  },
  petInfoContainer: {
    marginTop: 8,
  },
  petInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  petInfoLabel: {
    fontSize: 14,
    color: '#7f8c8d', //izquierod
    fontWeight: '500',
  },
  petInfoValue: {
    fontSize: 14,
    color: '#34495e',
  },
});