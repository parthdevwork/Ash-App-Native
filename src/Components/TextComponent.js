import {I18nManager, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../Config/Colors';
import {useTranslation} from 'react-i18next';

const TextComponent = props => {
  const {t, i18n} = useTranslation();
  return (
    <View style={{flexDirection: 'row'}}>
      <Text
        numberOfLines={props?.numberOfLines}
        style={[styles.text, props.style]}
        allowFontScaling={false}>
        {t(props.text)}
      </Text>
    </View>
  );
};

export default TextComponent;

const styles = StyleSheet.create({
  text: {
    fontFamily: I18nManager.isRTL ? 'NotoSansArabic-Medium' : 'OpenSans-Medium',
    fontSize: 18,
    color: Colors.textColor,
  },
});
