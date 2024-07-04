import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import {Colors} from '../Config/Colors';

const Tag = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        backgroundColor: props.Active ? Colors.Dark_Blue : Colors.White,
        borderColor: Colors.Dark_Blue,
        borderWidth: 1,
        paddingHorizontal: props.pH ? props.pH : 20,
        borderRadius: 20,
        // minWidth: 60,
        width: props.width,
        paddingVertical: 5,
        margin: 5,
        // marginRight: 25,
        marginLeft: props.index == 0 ? 25 : 0,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TextComponent
        text={props.text}
        style={[
          styles.text,
          {
            ...props.TextStyle,
            color: props.Active ? Colors.SuccessGreen : Colors.Dark_Blue,
          },
        ]}
      />
    </TouchableOpacity>
  );
};

export default Tag;

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    marginVertical: 5,
    textAlign: 'center',
    fontWeight: '400',
  },
});
