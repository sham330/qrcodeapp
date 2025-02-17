import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
// Define Type for Stack Navigator
export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
  }

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
  );
};

export default AppNavigator;
