import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login/Login';
import HomeScreen from '../screens/Home/Home';
import RegistroScreen from '../screens/Registro/Registro';
import VerMascota from '../screens/VerMascota/VerMascota';
import EditarMascota from '../screens/VerMascota/EditarMascota';
import ConsultamedicaScreen from '../screens/ConsultaMedica/Consultamedica';
import HistorialConsultaScreen from '../screens/HistorialConsulta/Historial';

// Definición de las rutas disponibles 
export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Dashboard: undefined;
  VerMascota: undefined;
   EditarMascota: {
    mascota: {
      id: number;
      nombre: string;
      especie: string;
      raza: string;
      sexo: string;
      peso: number;
      edad: number;
       dueno: {
        cedula: string;
        nombre: string;
        apellido: string;
        telefono: string;
        correo: string;
        direccion: string;
      } | null;
    };
  };
  Registro: undefined;
  Consultamedica: undefined;
  Historialconsulta: undefined;
};


//Navegar desde Home hacia otras
export type HomeScreenNavigation = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const Stack = createNativeStackNavigator<RootStackParamList>(); //Contiene las pantallas definidas 

//initialRoutName lo que se va a mostrar primero es la pantalla inicial

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
        name="EditarMascota" 
        component={EditarMascota} 
        options={{ title: 'Editar Mascota' }}
      />
        <Stack.Screen
          name="Consultamedica"
          component={ConsultamedicaScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Historialconsulta"
          component={HistorialConsultaScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};