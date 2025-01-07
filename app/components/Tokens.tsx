import React from 'react';
import { View, StyleSheet } from 'react-native';

interface TokenProps {
  color: string;
  size: number;
}

const Token: React.FC<TokenProps> = ({ color, size }) => (
  <View style={[styles.token, { backgroundColor: color, width: size, height: size }]} />
);

const styles = StyleSheet.create({
  token: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#000',
  },
});

export default Token;