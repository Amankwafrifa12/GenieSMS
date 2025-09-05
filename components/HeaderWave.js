import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

export const HeaderWave = ({ width = Dimensions.get('window').width, height = 150 }) => {
  return (
    <View style={styles.container}>
      <Svg width={width} height={height} viewBox="0 0 400 150">
        <Path
          d="M0,0 L400,0 L400,120 Q350,150 300,130 Q250,110 200,130 Q150,150 100,130 Q50,110 0,130 Z"
          fill="#4A90E2"
        />
        <Circle cx="350" cy="40" r="8" fill="#FFFFFF" opacity="0.3" />
        <Circle cx="320" cy="60" r="6" fill="#FFFFFF" opacity="0.2" />
        <Circle cx="380" cy="80" r="5" fill="#FFFFFF" opacity="0.4" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});
