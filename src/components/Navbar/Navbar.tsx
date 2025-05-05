import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native'; // Añade Text aquí
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavbarStyles } from './NavbarStyles';
import { NavbarProps } from './NavbarTypes';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const Navbar: React.FC<NavbarProps> = ({
  title,
  showBackButton = false,
  onMenuPress,
  isMenuOpen,
  onBackPress,
}) => {
  // Animación para el ícono de menú
  const menuRotation = useSharedValue(0);

  const menuStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${menuRotation.value * 45}deg` }],
  }));

  const handleMenuPress = () => {
    menuRotation.value = withTiming(isMenuOpen ? 0 : 1, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });
    onMenuPress();
  };

  return (
    <View style={NavbarStyles.container}>
      <View style={NavbarStyles.leftContainer}>
        {showBackButton ? (
          <TouchableOpacity onPress={onBackPress}>
            <Icon name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        ) : (
          <AnimatedTouchable
            onPress={handleMenuPress}
            style={[menuStyle, NavbarStyles.menuButton]}
          >
            <Icon
              name={isMenuOpen ? 'close' : 'menu'}
              size={24}
              color="white"
            />
          </AnimatedTouchable>
        )}
      </View>
      <View style={NavbarStyles.centerContainer}>
        <Text style={NavbarStyles.title}>{title}</Text>
      </View>
      <View style={NavbarStyles.rightContainer} />
    </View>
  );
};

export default Navbar;