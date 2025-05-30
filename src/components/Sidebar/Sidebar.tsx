import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/Navigator';

type SidebarProps = {
  isVisible: boolean;
  onClose: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isVisible, onClose }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const translateX = useSharedValue(-300);

  const sidebarStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  React.useEffect(() => {
    translateX.value = withTiming(isVisible ? 0 : -300, { duration: 300 });
  }, [isVisible]);

 // Cambia la definición de menuItems a:
const menuItems: {
  id: string;
  title: string;
  icon: string;
  screen: Exclude<keyof RootStackParamList, 'EditarMascota'>;
}[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: 'dashboard',
    screen: 'Home',
  },
  {
    id: 'registro',
    title: 'Registro Citas',
    icon: 'pets',
    screen: 'Registro',
  },
  {
    id: 'ver-mascota',
    title: 'Ver Mascota',
    icon: 'history',
    screen: 'VerMascota',
  },
  {
    id: 'consulta-medica',
    title: 'Consulta Médica',
    icon: 'medical-services',
    screen: 'Consultamedica',
  },
];

  return (
    <Animated.View style={[styles.container, sidebarStyle]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Icon name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.menuItemsContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              navigation.navigate(item.screen);
              onClose();
            }}
            style={styles.menuItem}
          >
            <Icon name={item.icon} size={24} color="white" style={styles.menuIcon} />
            <Text style={styles.menuText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 280,
    backgroundColor: '#2c3e50',
    zIndex: 1000,
    paddingTop: 60,
    paddingHorizontal: 20,
    elevation: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#34495e',
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  menuItemsContainer: {
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Sidebar;