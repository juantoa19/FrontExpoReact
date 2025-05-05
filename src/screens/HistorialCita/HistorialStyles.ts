import { StyleSheet } from 'react-native';

export const HistorialStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    color: '#333',
    fontSize: 16,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  card: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  petInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  cardContent: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: 'rgba(152, 0, 0, 0.1)',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: '600',
    color: '#555',
    width: 120,
  },
  value: {
    flex: 1,
    color: '#333',
  },
  healthy: {
    color: '#2e7d32',
    fontWeight: 'bold',
  },
  observation: {
    color: '#d32f2f',
    fontWeight: 'bold',
  },
  followUp: {
    color: '#ff8f00',
    fontWeight: 'bold',
  },
  followUpButton: {
    backgroundColor: '#ff9800',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  followUpButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  owner: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  

})