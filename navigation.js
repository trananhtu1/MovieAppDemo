import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import React from 'react'
import HomeScreen from './screens/HomeScreen';
import MovieScreen from './screens/MovieScreen';
import PersonScreen from './screens/PersonScreen';
import SearchScreen from './screens/SearchScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import useAuth from './hook/useAuth';

export default function Navigation() {
  const { user } = useAuth();
  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator 
        >
          <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
          <Stack.Screen name="Movie" options={{ headerShown: false }} component={MovieScreen} />
          <Stack.Screen name="Person" options={{presentation: 'modal', headerShown: false }} component={PersonScreen} />
          <Stack.Screen name="Search" options={{ headerShown: false }} component={SearchScreen} />
          <Stack.Screen name="Favorite" options={{ headerShown: false }} component={FavoriteScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcomes'
        >
          <Stack.Screen name="Welcomes" options={{ headerShown: false }} component={WelcomeScreen} />
          <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUpScreen} />
          <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}