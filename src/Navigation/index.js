import {
  StyleSheet,
  Text,
  View,
  Modal as RNModal,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {hideAlert} from '../Store/Actions/GeneralActions';
import {Snackbar} from 'react-native-paper';
import {Colors} from '../Config/Colors';
import {Fold, Grid} from 'react-native-animated-spinkit';
import {useDispatch, useSelector} from 'react-redux';
import AuthStack from './Auth/AuthStack';
import AppStack from './App/AppStack';
import {Animatedlogo} from '../Components/Assets';

import {Logout, login, userData} from '../Store/Actions/AuthAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActionTypes from '../Store/Actions/ActionTypes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TextComponent} from '../Components';
import Modal from '../Components/Modal';
import {AuthMiddleware} from '../Store/Middleware/AuthMiddleware';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const AppNavigation = () => {
  const loading = useSelector(state => state.GeneralReducer.loading);
  const showAlert = useSelector(state => state.GeneralReducer.showAlert);
  const alert = useSelector(state => state.GeneralReducer.alertOptions);
  const dispatch = useDispatch();
  const islogin = useSelector(state => state.AuthReducer.isLogin);
  const user = useSelector(state => state.AuthReducer.user);
  const insets = useSafeAreaInsets();
  const checkSession = async () => {
    if (Platform.OS == 'ios') {
      await AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove);
      dispatch(Logout());
    } else {
      await AsyncStorage.clear();
      dispatch(Logout());
    }
  };

  const isAuth = async () => {
    let userdata = await AsyncStorage.getItem('@userData');
    if (userdata != null) {
      const user = JSON.parse(userdata);
      dispatch(userData(user));
      setTimeout(() => {
        dispatch(login(true));
      }, 2500);
    } else {
      setTimeout(() => {
        dispatch(login(false));
      }, 2500);
    }
  };

  useEffect(() => {
    SplashScreen.hide();
    isAuth();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle={'dark-content'} />
      {islogin == undefined ? (
        <View
          style={{
            ...StyleSheet.absoluteFill,
            backgroundColor: Colors.Dark_Blue,
            justifyContent: 'center',
          }}>
          <Image
            resizeMode="contain"
            style={{
              width: '80%',
              height: 100,
              alignSelf: 'center',
              marginBottom: 10,
              marginRight: 12,
            }}
            source={Animatedlogo}
          />
        </View>
      ) : islogin ? (
        <AppStack />
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.White,
            paddingVertical:
              Platform.OS == 'ios' ? (insets.top != 20 ? 25 : 0) : 0,
          }}>
          <AuthStack />
        </View>
      )}

      <RNModal visible={loading} transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Grid size={48} color={Colors.White} />
          <Text style={{color: '#fff', margin: 15}}>Loading please wait..</Text>
        </View>
      </RNModal>
      {alert?.message == 'Authentication token missing' ? (
        <Modal
          animationType={'fade'}
          visible={showAlert}
          close={true}
          text={'Sign In'}
          OnClose={() => {
            checkSession();
          }}>
          <View
            style={{
              height: 150,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <Ionicons
              name={'alert-circle-outline'}
              size={50}
              color={Colors.textColor}
            />
            <TextComponent
              text={
                user?.role == 'GUEST'
                  ? "You're Not Authorized!\nPlease Signup"
                  : 'Session Expire\nPlease Login Again'
              }
              style={{
                fontSize: 20,
                color: Colors.textColor,
                textAlign: 'center',
              }}
            />
          </View>
        </Modal>
      ) : (
        <Snackbar
          onDismiss={() => dispatch(hideAlert())}
          duration={4000}
          style={{
            backgroundColor:
              alert?.status == 'Error' ? Colors.cancel_red : Colors.SuccessGreen,
          }}
          visible={showAlert}>
          <Text style={{color: alert?.status === 'Error' ? Colors.White : Colors.Dark_Blue}}>
            {alert?.message ? alert?.message : 'Something went wrong!'}
          </Text>
        </Snackbar>
      )}
    </NavigationContainer>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});
