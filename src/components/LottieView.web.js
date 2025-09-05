import React from 'react';
import { Image } from 'react-native';

export default function LottieViewWeb(props) {
  // Simple web fallback: render image or nothing
  const uri = props.source && props.source.uri;
  return uri ? <Image source={{uri}} style={props.style} /> : null;
}
