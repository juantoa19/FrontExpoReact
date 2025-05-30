import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login/Login';
import HomeScreen from '../screens/Home/Home';
import RegistroScreen from '../screens/Registro/Registro';
import VerMascota from '../screens/VerMascota/VerMascota';
import ConsultamedicaScreen from '../screens/ConsultaMedica/Consultamedica';

// Definición de las rutas disponibles 
export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Dashboard: undefined;
  VerMascota: undefined;
  Registro: undefined;
  Consultamedica: undefined;
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
          name="Consultamedica"
          component={ConsultamedicaScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};