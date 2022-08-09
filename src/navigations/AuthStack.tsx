import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthStackNavigatorParamList } from "../types/navigationTypes";

import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";

const AuthStackNavigator = createNativeStackNavigator<AuthStackNavigatorParamList>();

export default function AuthStack() {
  return (
    <AuthStackNavigator.Navigator initialRouteName="Home">
      <AuthStackNavigator.Screen name="Home" component={HomeScreen} />
      <AuthStackNavigator.Screen name="Login" component={LoginScreen} />
      <AuthStackNavigator.Screen name="Register" component={RegisterScreen} />
    </AuthStackNavigator.Navigator>
  )
}