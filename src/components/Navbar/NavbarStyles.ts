import { StyleSheet } from 'react-native';

export const NavbarStyles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#2c3e50',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    elevation: 3,
    zIndex: 10,
    marginTop: 30,
  },
  leftContainer: {
    width: 40,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rightContainer: {
    width: 40,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuButton: {
    padding: 5,
  },
  menuIcon: {
    width: 24,
    height: 18,
    justifyContent: 'space-between',
  },
  menuLine: {
    height: 2,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 2,
  },
  menuLineTopActive: {
    transform: [{ rotate: '45deg' }, { translateY: 8 }],
    width: '100%',
  },
  menuLineMiddleActive: {
    opacity: 0,
  },
  menuLineBottomActive: {
    transform: [{ rotate: '-45deg' }, { translateY: -8 }],
    width: '100%',
  },
  backIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
  },
  backLine: {
    height: 2,
    width: '70%',
    backgroundColor: 'white',
    borderRadius: 2,
  },
});