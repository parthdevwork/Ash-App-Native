import { I18nManager, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import { Colors } from '../Config/Colors';

const TagLabel = props => {
  return props.text ? (
    <View
      style={{
        backgroundColor: props.backgroundColor
          ? props.backgroundColor
          : Colors.SuccessGreen,
        borderColor: props.borderColor
          ? props.borderColor
          : Colors.SuccessGreen,
        borderWidth: props.borderColor ? 1 : 0,
        paddingHorizontal: props.pH ? props.pH : 20,
        borderRadius: props.bR ? props.bR : 15,
        width: props.width,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <TextComponent
        text={props.text}
        style={{ ...styles.text, ...props.TextStyle }}
      />
    </View>
  ) : null;
};

export default TagLabel;

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    color: Colors.Dark_Blue,
    marginVertical: 5,
    fontWeight: '700',
    textAlign: 'center',
  },
});
