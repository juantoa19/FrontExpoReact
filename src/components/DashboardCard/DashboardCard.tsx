import React, { useEffect, useRef } from 'react';
import { Animated, Text, View, StyleSheet, Dimensions } from 'react-native';

interface DashboardCardProps {
  label: string;
  backgroundColor?: string;
  textColor?: string;
}

const { width } = Dimensions.get('window');

const DashboardCard: React.FC<DashboardCardProps> = ({
  label,
  backgroundColor = '#1f1f2e',
  textColor = '#fff',
}) => {
  const borderAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(borderAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false,
      }),
    ).start();
  }, []);

  const borderInterpolation = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.cardContainer, { backgroundColor }]}>
      {/* Animación de borde */}
      <Animated.View
        style={[
          styles.animatedBorder,
          {
            borderColor: textColor,
            borderTopWidth: 2,
            borderLeftWidth: 2,
            width: borderInterpolation,
            height: borderInterpolation,
          },
        ]}
      />
      {/* Capa transparente arriba */}
      <View style={styles.overlay}>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: width * 0.9,
    height: 120,
    borderRadius: 20,
    marginBottom: 20,
    justifyContent: 'flex-start',
    overflow: 'hidden',
    alignSelf: 'center',
  },
  overlay: {
    height: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  animatedBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
  },
});

export default DashboardCard;
