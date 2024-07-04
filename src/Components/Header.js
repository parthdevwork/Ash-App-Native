import React from 'react';
import {
  StyleSheet,
  Platform,
  TouchableOpacity,
  View,
  I18nManager,
  Text,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import TextComponent from './TextComponent';
import { awards } from '../Components/Assets';
import Image from './Image';

import { Colors } from '../Config/Colors';

const Header = (props) => {
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.header,
        {
          paddingTop: Platform.OS === 'ios' ? 40 : 15,
          height: Platform.OS === 'ios' ? 90 : 70,
        },
      ]}
    >
      {props?.leftIcon ? (
        <TouchableOpacity
          style={{ width: 30, height: 25,}}
          onPress={() => navigation.goBack()}
        >
          <Feather
            name={I18nManager.isRTL ? 'chevron-right' : 'chevron-left'}
            size={32}
            color={Colors.Dark_Blue}
          />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 24 }} />
      )}
      <View style={{ alignItems:"center", flex: 1,  }}>
        <TextComponent text={props?.title} style={styles.heading} />
      </View>
      <View>
        {props?.rightIcon ? (
          <TouchableOpacity onPress={props?.onPressRightIcon}>
            {props?.IconRight}
          </TouchableOpacity>
        ) : (
          <View style={{ width: 24 }} />
        )}
      </View>
      {props.showAward && (
        <TouchableOpacity onPress={props.showList}>
          <Image
            source={awards}
            style={{ width: 16, height: 20, marginRight: 3 }}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: '#EEEEEE',
    borderBottomColor: Colors.Placeholder,
    borderBottomWidth: 0.2,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  heading: {
    color: Colors.Blue,
    fontSize: 17,
    fontFamily: I18nManager.isRTL
      ? 'NotoSansArabic-SemiBold'
      : 'OpenSans-SemiBold',
  },
});
