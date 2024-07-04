import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, OTP} from '../../Screens';

const AuthStack = () => {
  const AuthStack = createNativeStackNavigator();
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <AuthStack.Screen name={'Login'} component={Login} />
      <AuthStack.Screen name={'OTP'} component={OTP} />

    </AuthStack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
