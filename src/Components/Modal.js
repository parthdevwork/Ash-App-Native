import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal as RNModal,
} from 'react-native';
import React from 'react';
import {Colors} from '../Config/Colors';
import TextComponent from './TextComponent';
import {useTranslation} from 'react-i18next';

const Modal = props => {
  const {t, i18n} = useTranslation();

  return (
    <RNModal
      animationType={props.animationType ? props.animationType : 'fade'}
      transparent={true}
      visible={props.visible}
      onRequestClose={() => {}}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.ModalContainer}>
          {props.children}
          {props.close ? (
            <TouchableOpacity
              style={[styles.ViewFooter, {...props.styles}]}
              onPress={props.OnClose}>
              <TextComponent
                style={[styles.lang, {...props.textStyle}]}
                text={t(props.text ? props.text : 'Close')}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </RNModal>
  );
};

export default Modal;

const styles = StyleSheet.create({
  ModalContainer: {
    backgroundColor: Colors.White,
    marginTop: 25,
    borderRadius: 20,
    width: '85%',
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lang: {
    fontSize: 16,
    color: Colors.White,
    textAlign: 'center',
  },
  ViewFooter: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.Dark_Blue,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems:'center',
  },
});
