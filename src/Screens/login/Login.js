import {
  I18nManager,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors} from '../../Config/Colors';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {logo} from '../../Components/Assets';
import InputText from '../../Components/InputText';
import TextComponent from '../../Components/TextComponent';
import Button from '../../Components/Button';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import Modal from '../../Components/Modal';
import RNRestart from 'react-native-restart';
import {login, userData} from '../../Store/Actions/AuthAction';
import {useDispatch} from 'react-redux';
import {AuthMiddleware} from '../../Store/Middleware/AuthMiddleware';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Login = () => {
  const [phone, setphone] = useState('');
  const [isValid, setisValid] = useState(false);

  const navigation = useNavigation();

  const {t, i18n} = useTranslation();

  const [IsOpen, setIsOpen] = useState(false);

  const [isFocus, setisFocus] = useState(false);
  const dispatch = useDispatch();

  const insets = useSafeAreaInsets();

  const changeLanguage = lang => {
    if (i18n.language == lang) {
      setIsOpen(false);
    } else {
      try {
        i18n.changeLanguage(lang).then(() => {
          I18nManager.forceRTL(i18n.language == 'ar' ? true : false);
          setIsOpen(false);
          RNRestart.restart();
        });
      } catch (error) {}
    }
  };

  const onsubmit = () => {
    Keyboard.dismiss();
    dispatch(AuthMiddleware.SendOtp({phone}))
      .then(({data}) => {
        navigation.navigate('OTP', {phone, token: data.rememberToken, data}),
          setphone(''),
          setisValid(false);
      })
      .catch(() => {
        setisValid(true);
      });
  };

  const guestLogin = () => {
    Keyboard.dismiss();
    let data = {
      role: 'GUEST',
      fullName: 'GUEST',
    };
    dispatch(userData(data));
    dispatch(login(true));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{width: 30, height: 30}}
          onPress={() => setIsOpen(!IsOpen)}>
          <Fontisto name={'world-o'} size={24} color={Colors.Blue} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: 'center',
          height: 120,
          justifyContent: 'center',
        }}>
        <Image source={logo} resizeMode={'cover'} />
      </View>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={
          Platform.OS == 'ios' ? (insets.top != 20 ? 25 : 0) : 0
        }>
        <View
          style={{
            flex: 1,
            marginHorizontal: 15,
            marginTop: 20,
          }}>
          <TextComponent style={styles.txt} text={t('Mobile Number')} />
          <InputText
            value={phone}
            // maxLength={10}
            onChangeText={val => {
              setisValid(false), setphone(val);
            }}
            error={phone ? (phone.length > 9 ? false : true) : false}
            // TypeColor={
            //   phone
            //     ? !isValid
            //       ? phone.length > 9
            //         ? Colors.SuccessGreen
            //         : Colors.ErrorRed
            //       : Colors.ErrorRed
            //     : false
            // }
            // errorMessage={'The mobile number must be 10 digits'}
            keyboardType={'phone-pad'}
            placeholder={'05xxxxxxxx'}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={guestLogin}>
            <TextComponent
              style={{color: Colors.Dark_Blue, marginBottom: 20}}
              text={t('Continue as Guest')}
            />
          </TouchableOpacity>
          <Button
            text={'Sign In'}
            disabled={phone.length > 9 ? false : true}
            styles={{opacity: phone.length < 10 ? 0.5 : 1}}
            onPress={() => {
              onsubmit();
            }}
          />
        </View>
      </KeyboardAvoidingView>
      <Modal
        animationType={'fade'}
        visible={IsOpen}
        close={true}
        OnClose={() => setIsOpen(false)}>
        <View
          style={{
            height: 180,
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <Fontisto
            name={'world-o'}
            size={34}
            color={Colors.Dark_Blue}
            style={{alignSelf: 'center', marginBottom: 10}}
          />
          <TouchableOpacity
            style={styles.langbtn}
            onPress={() => changeLanguage('en')}>
            <TextComponent style={styles.lang} text={t('English')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.langbtn}
            onPress={() => changeLanguage('ar')}>
            <TextComponent style={styles.lang} text={t('Arabic')} />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  header: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginVertical: 15,
  },
  txt: {
    fontSize: 16,
    color: Colors.textColor,
  },
  heading: {
    fontSize: 22,
    color: Colors.textColor,
    fontWeight: 'bold',
  },
  lang: {
    fontSize: 16,
    color: Colors.Dark_Blue,
    textAlign: 'center',
  },
  langbtn: {
    width: 200,
    height: 35,
    backgroundColor: Colors.bottomTabColor,
    color: Colors.White,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
});
