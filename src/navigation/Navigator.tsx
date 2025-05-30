import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login/Login';
import HomeScreen from '../screens/Home/Home';
import RegistroScreen from '../screens/Registro/Registro';
import VerMascota from '../screens/VerMascota/VerMascota';
import ConsultamedicaScreen from '../screens/ConsultaMedica/Consultamedica';
import EditarMascota from '../screens/VerMascota/EditarMascota';

// Definición de las rutas disponibles 
export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Dashboard: undefined;
  VerMascota: undefined;
  Registro: undefined;
  Consultamedica: undefined;
  EditarMascota: {
    mascota: {
      id: number;
      nombre: string;
      especie: string;
      edad: number;
      raza: string;
      sexo: string;
      peso: number;
      dueno: {
        cedula: string;
        nombre: string;
        apellido: string;
        telefono: string;
        correo: string;
        direccion: string;
      };
    };
  };
};

// Tipos para navegación
export type HomeScreenNavigation = NativeStackNavigationProp<RootStackParamList, 'Home'>;
export type VerMascotaNavigation = NativeStackNavigationProp<RootStackParamList, 'VerMascota'>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigator = () => {
  return (
    <NavigationContainer> 
      <Stack.Navigator initialRouteName="Login"> 
        <Stack.Screen 
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registro"
          component={RegistroScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VerMascota"
          component={VerMascota}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Consultamedica"
          component={ConsultamedicaScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditarMascota"
          component={EditarMascota}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};