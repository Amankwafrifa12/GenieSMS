import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

export const FooterWave = ({ width = Dimensions.get('window').width, height = 150 }) => {
  return (
    <View style={styles.container}>
      <Svg width={width} height={height} viewBox="0 0 400 150">
        <Path
          d="M0,30 Q50,10 100,30 Q150,50 200,30 Q250,10 300,30 Q350,50 400,30 L400,150 L0,150 Z"
          fill="#4A90E2"
        />
        <Circle cx="50" cy="100" r="6" fill="#FFFFFF" opacity="0.2" />
        <Circle cx="80" cy="120" r="4" fill="#FFFFFF" opacity="0.3" />
        <Circle cx="120" cy="90" r="5" fill="#FFFFFF" opacity="0.4" />
        <Circle cx="280" cy="110" r="7" fill="#FFFFFF" opacity="0.2" />
        <Circle cx="320" cy="95" r="5" fill="#FFFFFF" opacity="0.3" />
        <Circle cx="360" cy="125" r="4" fill="#FFFFFF" opacity="0.4" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
