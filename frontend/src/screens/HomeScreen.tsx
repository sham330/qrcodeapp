import React from 'react';
import { View, Text } from 'react-native';
import QRScanner from '../components/QrScanner';

const HomeScreen = () => {
  return (
    <View>
      <Text>Welcome to Home</Text>
      <QRScanner />
    </View>
  );
};

export default HomeScreen;
