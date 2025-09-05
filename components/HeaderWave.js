import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

export const HeaderWave = ({ width = Dimensions.get('window').width, height = 180 }) => {
  return (
    <View style={styles.container}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} 180`}>
        {/* Main wave background */}
        <Path
          d={`M0,0 L${width},0 L${width},120 Q${width * 0.8},150 ${width * 0.6},130 Q${width * 0.4},110 ${width * 0.2},130 Q0,150 0,130 Z`}
          fill="#4A90E2"
        />

        {/* Secondary wave layer */}
        <Path
          d={`M0,30 Q${width * 0.25},10 ${width * 0.5},30 Q${width * 0.75},50 ${width},30 L${width},80 Q${width * 0.75},90 ${width * 0.5},80 Q${width * 0.25},70 0,80 Z`}
          fill="rgba(255, 255, 255, 0.15)"
        />

        {/* Decorative circles */}
        <Circle cx={width * 0.2} cy="40" r="4" fill="#FFFFFF" opacity="0.8" />
        <Circle cx={width * 0.4} cy="25" r="3" fill="#FFFFFF" opacity="0.6" />
        <Circle cx={width * 0.6} cy="45" r="5" fill="#FFFFFF" opacity="0.9" />
        <Circle cx={width * 0.8} cy="30" r="3.5" fill="#FFFFFF" opacity="0.7" />

        {/* Simple sparkle */}
        <Circle cx={width * 0.15} cy="20" r="2" fill="#FFD700" opacity="0.8" />
        <Circle cx={width * 0.85} cy="15" r="2.5" fill="#FFD700" opacity="0.9" />
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
