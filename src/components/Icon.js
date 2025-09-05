import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function Icon({ name = 'md-checkmark-circle', size = 22, color = '#000' }) {
  return <Ionicons name={name} size={size} color={color} />;
}
