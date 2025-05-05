import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing, cancelAnimation } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LoginStyles } from './LoginStyles';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

const Login = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const borderAnimation = useSharedValue(0);

  const snowflakes = Array(30).fill(0).map((_, i) => ({
    id: i,
    left: Math.random() * Dimensions.get('window').width,
    top: -20,
    size: Math.random() * 5 + 3,
    speed: Math.random() * 3 + 1,
    opacity: Math.random() * 0.5 + 0.3
  }));

  const [snowflakesState, setSnowflakesState] = useState(snowflakes);

  useEffect(() => {
    borderAnimation.value = withRepeat(
      withTiming(1, { duration: 3000, easing: Easing.linear }),
      -1,
      false
    );

    const interval = setInterval(() => {
      setSnowflakesState(prev => prev.map(flake => ({
        ...flake,
        top: flake.top > Dimensions.get('window').height ? -20 : flake.top + flake.speed,
        left: flake.left + (Math.random() * 2 - 1)
      })));
    }, 50);

    return () => {
      cancelAnimation(borderAnimation);
      clearInterval(interval);
    };
  }, []);

  const animatedBorder = useAnimatedStyle(() => {
    const colors = ["#00FFFF", "#FF00FF", "#FFFF00", "#00FF00"];
    const colorIndex = Math.floor(borderAnimation.value * colors.length) % colors.length;
    const nextColorIndex = (colorIndex + 1) % colors.length;
    const progress = (borderAnimation.value * colors.length) % 1;

    const interpolateColor = (c1: string, c2: string, p: number) => {
      return `rgba(${
        Math.floor(parseInt(c1.slice(1, 3), 16) * (1 - p) + parseInt(c2.slice(1, 3), 16) * p)
      }, ${
        Math.floor(parseInt(c1.slice(3, 5), 16) * (1 - p) + parseInt(c2.slice(3, 5), 16) * p)
      }, ${
        Math.floor(parseInt(c1.slice(5, 7), 16) * (1 - p) + parseInt(c2.slice(5, 7), 16) * p)
      }, 1)`;
    };

    return {
      borderColor: interpolateColor(colors[colorIndex], colors[nextColorIndex], progress),
    };
  });

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({ ...formData, password: '' });
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    if (isLogin) {
      console.log('Iniciando sesión con:', formData.email, formData.password);
      navigation.navigate('Home'); // ✅ Navega correctamente
    } else {
      console.log('Registrando con:', formData.name, formData.email, formData.password);
    }
  };

  return (
    <View style={LoginStyles.container}>
      {snowflakesState.map((flake) => (
        <View
          key={flake.id}
          style={[
            LoginStyles.snowflake,
            {
              left: flake.left,
              top: flake.top,
              width: flake.size,
              height: flake.size,
              borderRadius: flake.size / 2,
              opacity: flake.opacity
            }
          ]}
        />
      ))}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={LoginStyles.keyboardAvoidingView}
      >
        <Animated.View style={[LoginStyles.formContainer, LoginStyles.animatedBorder, animatedBorder]}>
          <Text style={LoginStyles.title}>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</Text>

          {!isLogin && (
            <TextInput
              style={LoginStyles.input}
              placeholder="Nombre"
              value={formData.name}
              onChangeText={(text) => handleInputChange('name', text)}
            />
          )}

          <TextInput
            style={[LoginStyles.input, { color: 'white' }]}
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
          />

          <TextInput
            style={LoginStyles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) => handleInputChange('password', text)}
          />

          <TouchableOpacity style={LoginStyles.button} onPress={handleSubmit}>
            <Text style={LoginStyles.buttonText}>{isLogin ? 'Entrar' : 'Registrarse'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleAuthMode} style={LoginStyles.toggleButton}>
            <Text style={LoginStyles.toggleText}>
              {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;
