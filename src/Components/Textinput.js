import React from 'react';
import {I18nManager, StyleSheet, TextInput, View} from 'react-native';
import {Colors} from '../Config/Colors';
import {useTranslation} from 'react-i18next';

const Textinput = props => {
  const {t, i18n} = useTranslation();
  return (
    <View>
      <TextInput
        style={props?.style}
        keyboardType={props.keyboardType}
        numberOfLines={props?.numberOfLines}
        maxLength={props.maxLength}
        placeholderTextColor={'#B1B1B1'}
        placeholder={t(props?.placeholder)}
        textAlign={I18nManager.isRTL ? 'right' : 'left'}
        value={props?.value}
        onChangeText={props?.onChangeText}
        {...props}
      />
    </View>
  );
};

export default Textinput;

const styles = StyleSheet.create({});
