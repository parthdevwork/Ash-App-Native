import { I18nManager, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import { Colors } from '../Config/Colors';

const Button = props => {
  return (
    <TouchableOpacity style={[styles.btn, props?.styles]} {...props}>
      {props.icon ? (
        { ...props.icon }
      ) : (
        <TextComponent style={{ ...styles.text, ...props.textStyle }} text={props?.text} />
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.btn_Color,
    // borderRadius: 5,
    height: 55,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: I18nManager.isRTL ? 'NotoSansArabic-Medium' : 'OpenSans-Medium',
    fontSize: 18,
    color: Colors.White
  },
});
