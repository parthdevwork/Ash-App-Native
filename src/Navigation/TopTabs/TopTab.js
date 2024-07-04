import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Colors} from '../../Config/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import { I18nManager } from 'react-native';

const Tab = createMaterialTopTabNavigator();

const TopTab = props => {
  return (
    <Tab.Navigator
      initialRouteName={
        props?.initialRouteName ? props?.initialRouteName : undefined
      }
      screenOptions={{
        tabBarActiveTintColor: Colors?.SuccessGreen,
        tabBarInactiveTintColor: Colors?.textColor,
        tabBarStyle: {
          backgroundColor: Colors.White,
          borderRadius: 8,
          elevation: 0,
          margin: 10,
          height: 39,
          justifyContent: 'center',
        },
        tabBarContentContainerStyle: {
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          textTransform: 'capitalize',
          fontFamily: I18nManager.isRTL ? 'NotoSansArabic-Medium' : 'OpenSans-Medium',
        },
        tabBarIndicatorStyle: {
          height: 39,
          backgroundColor: Colors.Dark_Blue,
          borderRadius: 8,
        },
      }}>
      {props.components?.map((component, index) => (
        <Tab.Screen
          key={index}
          name={component?.name}
          component={component?.component}
          options={{
            tabBarItemStyle: {
              flexDirection: 'row-reverse',
            },
            tabBarLabel: component?.label,
            tabBarIconStyle: component.icon
              ? {
                  marginTop: -10,
                  marginLeft: -5,
                }
              : undefined,
            tabBarIcon: component.icon
              ? () => (
                  <Entypo
                    name={'dot-single'}
                    size={30}
                    color={Colors.ErrorRed}
                  />
                )
              : undefined,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TopTab;
