import { StyleSheet, Text, Platform, Image } from 'react-native';
import React from 'react';
import {
  Home,
  More,
  Notifications,
  Teams,
  Tournament,
} from '../../Screens/index';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../../Config/Colors';
import {
  chat,
  home,
  homeActive,
  Mores,
  Notification,
  Team,
  Tournamentimg,
} from '../../Components/Assets';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const BottomTabs = () => {
  const BottomTab = createBottomTabNavigator();

  const user = useSelector(state => state.AuthReducer.user);

  const { t, i18n } = useTranslation();
  const insets = useSafeAreaInsets();


  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Colors.Dark_Blue,
        tabBarInactiveTintColor: Colors.Blue,
        tabBarLabelStyle: {
          marginBottom: 5,
        },
        tabBarStyle: {
          backgroundColor: Colors.bottomTabColor,
          height: Platform.OS == 'ios' ? insets.top != 20 ? 70 : 60 : 60,
          padding: 5,
          paddingBottom: Platform.OS == 'ios' ? insets.top != 20 ? 20 : 0 : 0
        },
      }}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: t('Home'),
          tabBarIcon: ({ color, size }) => (
            <Image
              source={color == Colors.Dark_Blue ? homeActive : home}
              r
              style={{
                tintColor: color == Colors.Dark_Blue ? color : null,
                width: 25,
                height: 25,
              }}
              resizeMode={'contain'}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Tounaments"
        component={Tournament}
        options={{
          tabBarLabel: t('Tournaments'),
          tabBarIcon: ({ color, size }) => (
            <Image
              source={Tournamentimg}
              style={{
                tintColor: color == Colors.Dark_Blue ? color : null,
                width: 25,
                height: 25,
              }}
              resizeMode={'contain'}
            />
          ),
        }}
      />

      <BottomTab.Screen
        name="Team"
        component={Teams}
        options={{
          tabBarLabel: t('Teams'),
          tabBarIcon: ({ color, size }) => (
            <Image
              source={Team}
              style={{
                tintColor: color == Colors.Dark_Blue ? color : null,
                width: 25,
                height: 25,
              }}
              resizeMode={'contain'}
            />
          ),
        }}
      />

      <BottomTab.Screen
        name="Notification"
        component={Notifications}
        options={{
          tabBarLabel: t('Notification'),
          tabBarIcon: ({ color, size }) => (
            <Image
              source={Notification}
              style={{
                tintColor: color == Colors.Dark_Blue ? color : null,
                width: 25,
                height: 25,
              }}
              resizeMode={'contain'}
            />
          ),
        }}
      />

      <BottomTab.Screen
        name="More"
        component={More}
        options={{
          tabBarLabel: t('More'),
          tabBarIcon: ({ color, size }) => (
            <Image
              source={Mores}
              style={{
                tintColor: color == Colors.Dark_Blue ? color : null,
                width: 25,
                height: 25,
              }}
              resizeMode={'contain'}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({});
