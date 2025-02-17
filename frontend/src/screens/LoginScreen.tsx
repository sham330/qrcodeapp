import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/AppNavigator';
import QRScanner from '../components/QrScanner';

// Ensure auth session is completed if app was backgrounded
WebBrowser.maybeCompleteAuthSession();

// Define Type for Navigation
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  // Initialize Google Sign-In with Android client ID
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '402334929185-bveprn1nq76dis2dhfd5cme3tcc6vp5p.apps.googleusercontent.com', // Replace with your actual Android OAuth Client ID
  });

  useEffect(() => {
    if (response?.type === 'success') {
      console.log('Google Sign-In Success:', response);
      navigation.navigate('Home'); // Navigate to Home on successful login
    }
  }, [response]);

  return (
    <View>
      <Text>Login Screen</Text>
      <Button title="Sign in with Google" disabled={!request} onPress={() => promptAsync()} />
        <QRScanner/>
    </View>
  );
};

export default LoginScreen;
