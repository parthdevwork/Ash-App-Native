import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import {Colors} from '../Config/Colors';

const IconButton = props => {
  return (
    <TouchableOpacity style={[styles.btn, props?.styles]} {...props}>
      {props.icon}
      <TextComponent style={props.textStyle} text={props?.text} />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.BtnColor,
    borderRadius: 5,
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
