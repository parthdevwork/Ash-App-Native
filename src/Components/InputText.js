import {
  StyleSheet,
  Text,
  View,
  TextInput,
  I18nManager,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Colors} from '../Config/Colors';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextComponent from './TextComponent';
import {useTranslation} from 'react-i18next';
const InputText = props => {
  const {t, i18n} = useTranslation();
  return props?.sidebar ? (
    <View
      style={[
        styles.inputContainer,
        {
          flexDirection: 'row',
          paddingHorizontal: 5,
          backgroundColor: ' rgba(118, 118, 128, 0.12)',
        },
      ]}>
      <View
        style={{
          justifyContent: 'center',
          borderBottomLeftRadius: 9,
          borderTopLeftRadius: 9,
        }}>
        <EvilIcons name={props.iconname} color={props.iconColor} size={30} />
      </View>
      <View
        style={{
          width: '90%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TextInput
          style={[styles.input, {...props?.style}]}
          placeholderTextColor={Colors.Placeholder}
          placeholder={t(props?.placeholder)}
          textAlign={I18nManager.isRTL ? 'right' : 'left'}
          value={props?.value}
          onChangeText={props?.onChangeText}
          {...props}
        />
        {props?.cross ? (
          <TouchableOpacity onPress={props.onPressCross}>
            <Ionicons
              name={'ios-close-circle-outline'}
              size={24}
              color={'#B1B1B1'}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  ) : (
    <>
      <View
        style={[
          styles.inputContainer,
          {
            ...props.containterStyle,
            borderColor: props.TypeColor ? props.TypeColor : Colors.Light_gray,
          },
        ]}>
        <TextInput
          style={[styles.input, {...props?.style}]}
          placeholderTextColor={Colors.Placeholder}
          textAlign={I18nManager.isRTL ? 'right' : 'left'}
          {...props}
        />
      </View>
      {props.error ? (
        <TextComponent
          text={props.errorMessage}
          style={[styles.text, {color: '#FF0000'}]}
        />
      ) : null}
    </>
  );
};

export default InputText;

const styles = StyleSheet.create({
  inputContainer: {
    borderColor: Colors.Light_gray,
    backgroundColor: Colors.Light_gray,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  text: {
    color: Colors.Light_gray,
    fontFamily: I18nManager.isRTL
      ? 'NotoSansArabic-Regular'
      : 'OpenSans-Regular',
    fontSize: 14,
  },
  input: {
    color: '#000',
    minHeight: 50,
    fontSize: 16,
    fontFamily: I18nManager.isRTL ? 'NotoSansArabic-Medium' : 'OpenSans-Medium',
  },
});
