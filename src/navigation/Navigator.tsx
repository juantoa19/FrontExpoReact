import { NavigationContainer } from '@react-navigation/native'; //permite moverte entre pantallas.
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login/Login';
import HomeScreen from '../screens/Home/Home';
import AgendarCita from '../screens/AgendarCita/AgendarCita';
import RegistroScreen from '../screens/Registro/Registro';
import HistorialCitasScreen from '../screens/HistorialCita/Historial';
import BuscarDuenoScreen from '../screens/BuscarDueno/BuscarDueno'; // 👈 Importación añadida
import Buscar from '../screens/BuscarDueno/BuscarDueno';

//Definicion de las rutas disponibles 
export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Dashboard: undefined;
  AgendarCita: undefined;
  HistorialCitas: undefined;
  Registro: undefined;
  Buscar: undefined; // 👈 Tipo añadido
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
          name="AgendarCita"
          component={AgendarCita}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HistorialCitas"
          component={HistorialCitasScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Buscar"
          component={Buscar}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};