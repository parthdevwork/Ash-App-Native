import {
  I18nManager,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { Colors } from '../../Config/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { password } from '../../Components/Assets';
import InputText from '../../Components/InputText';
import TextComponent from '../../Components/TextComponent';
import Button from '../../Components/Button';
import { useNavigation } from '@react-navigation/native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Store/Actions/GeneralActions';
import { login } from '../../Store/Actions/AuthAction';
import { AuthMiddleware } from '../../Store/Middleware/AuthMiddleware';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';


const OTP = props => {
  const data = props.route.params;
  const [minutes, setMinutes] = useState(1);
  const [timer, setTimer] = useState(59);
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }

      if (timer === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setTimer(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });


  const navigation = useNavigation();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();


  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [restprops, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [enableMask, setEnableMask] = useState(false);
  const [Resent, setResent] = useState(false);
  const [isValid, setisValid] = useState(false);

  const CELL_COUNT = 4;

  const renderCell = ({ index, symbol, isFocused }) => {

    let textChild = null;

    if (symbol) {
      textChild = enableMask ? '•' : symbol;
    } else if (isFocused) {
      textChild = <Cursor />;
    }

    return (
      <Text
        key={index}
        style={[
          styles.cell,
          isFocused && styles.focusCell,
          {
            borderColor: value
              ? !isValid
                ? value.length < 4
                  ? Colors.ErrorRed
                  : Colors.SuccessGreen
                : Colors.ErrorRed
              : '#eee',
          },
        ]}
        onLayout={getCellOnLayoutHandler(index)}>
        {textChild}
      </Text>
    );
  };

  const onPress = () => {
    dispatch(
      AuthMiddleware.VerifyOtp({
        phone: data.phone,
        token: data.token,
        code: value,
      }),
    )
      .then()
      .catch(() => setisValid(true));
  };

  const resendOtp = () => {
    dispatch(
      AuthMiddleware.ResendOtp({
        phone: data.phone,
        token: data.token,
      }),
    ).then(() => { setTimer(59), setMinutes(1) });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{ width: 30, height: 30 }}
          onPress={() => navigation.goBack()}>
          <MaterialIcons
            name={I18nManager.isRTL ? 'arrow-forward-ios' : 'arrow-back-ios'}
            size={24}
            color={Colors.Blue}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: 'center',
          height: 110,
          justifyContent: 'center',
        }}>
        <Image source={password} resizeMode={'cover'} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS == 'ios' ? insets.top != 20 ? 25 : 0 : 0}
      >
        <View style={{ flex: 1, marginHorizontal: 15, marginTop: 20 }}>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'}>
            <View style={{ flexDirection: 'row' }}>
              <TextComponent
                style={styles.txt}
                text={`Please enter the OTP sent to`}
              />
              <TextComponent
                style={styles.txt}
                text={`${data?.phone} `}
              />
            </View>
            <CodeField
              ref={ref}
              {...restprops}
              value={value}
              onChangeText={
                setValue
              }
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={renderCell}
              onSubmitEditing={() => Keyboard.dismiss()}
            />
            {isValid ? (
              <TextComponent
                style={[
                  styles.txt,
                  { color: '#FF0000', textAlign: 'left', marginLeft: 10 },
                ]}
                text={'The entered code is incorrect, try again'}
              />
            ) : null}
          </ScrollView>
        </View>
        <View style={{ alignItems: 'center' }}>
          {minutes > 0 || timer > 0 ? (
            <View style={{ flexDirection: 'row' }}>
              <TextComponent
                style={[styles.txt, { color: '#666666' }]}
                text={`You can resend the OTP after`}
              />
              <TextComponent
                style={[styles.txt, { color: '#666666' }]}
                text={!I18nManager.isRTL ? ` 0${minutes}:${timer}` : `0${minutes}:${timer}  `}
              />
            </View>

          ) : (
            <TouchableOpacity onPress={resendOtp}>
              <TextComponent
                style={{ color: Colors.Dark_Blue, marginBottom: 20 }}
                text={'Resend OTP'}
              />
            </TouchableOpacity>
          )}
          <Button
            text={'Verify'}
            disabled={value.length > 3 ? false : true}
            styles={{ opacity: value.length < 4 ? 0.5 : 1 }}
            onPress={() => onPress()}
          />
        </View>

      </KeyboardAvoidingView>

    </View>
  );
};

export default OTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  header: {
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 15,
  },
  txt: {
    fontSize: 16,
    color: Colors.Blue,
    textAlign: 'center',
    marginBottom: 15,
  },
  root: { flex: 1, padding: 20, backgroundColor: Colors.White },
  Codetitle: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: {
    marginVertical: 10,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  cell: {
    width: 60,
    height: 60,
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#eee',
    color: Colors.Dark_Blue,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#f7f7f7',
    paddingTop: Platform.OS == 'ios' ? 15 : 0,
  },
  focusCell: {
    borderWidth: 1,
    borderColor: Colors.Dark_Blue,
    // backgroundColor: Colors.Placeholder,
  },
});
