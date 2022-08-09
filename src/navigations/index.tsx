import {
  NavigationContainer, DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { useColorScheme, StatusBar } from 'react-native';
import { useState, useEffect } from "react";
import * as SecureStore from 'expo-secure-store';

import AppTab from "./AppTab";
import AuthStack from "./AuthStack";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";

import type { IUser } from "../types/appTypes";
import { SafeAreaProvider } from 'react-native-safe-area-context';




export default function Navigations() {

  const { _id }: IUser = useAppSelector((state: RootState) => state.auth)
  const [token, setToken] = useState(false);

  // const scheme = useColorScheme();
  useEffect(() => {

    const authenticate = async () => setToken(Boolean(await SecureStore.getItemAsync("userAuthToken")));
    authenticate();

  }, [token, setToken, _id]);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content"  />
      <NavigationContainer theme={DarkTheme}>
        {token ?
          <>
            <AppTab />
          </>
          :
          <>
            <AuthStack />
          </>}
      </NavigationContainer>
    </SafeAreaProvider>
  )
}