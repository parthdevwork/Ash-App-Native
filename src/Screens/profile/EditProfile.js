import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  I18nManager
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../Config/Colors';
import { Button, Header, OpenImagePicker, TextComponent } from '../../Components';
import { useTranslation } from 'react-i18next';
import { createPic, picture } from '../../Components/Assets';
import Textinput from '../../Components/Textinput';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/Feather';
import SelectDropdown from 'react-native-select-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { showAlert } from '../../Store/Actions/GeneralActions';
import { AuthMiddleware } from '../../Store/Middleware/AuthMiddleware';
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const EditProfile = () => {
  useEffect(() => {
    dispatch(AuthMiddleware.getPositions()).then((data) => { setFull(data?.data?.full), setShort(data?.data?.short) }).catch()
  }, [])


  const insets = useSafeAreaInsets();
  const user = useSelector(state => state.AuthReducer.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const [image, setImage] = useState(null);
  const [name, setname] = useState(user?.fullName ? user?.fullName : '');
  const [nickname, setnickname] = useState(
    user?.nickName ? user?.nickName : '',
  );
  const [DOB, setDOB] = useState(
    user?.dateOfBirth ? user?.dateOfBirth : '2023-10-12',
  );
  const [Speed, setSpeed] = useState(
    `${user?.features?.topSpeed ? user?.features?.topSpeed : ''}`,
  );
  const [gender, setgender] = useState(user?.isMale ? 'Male' : 'Female');
  const [foot, setFoot] = useState(user?.features?.specialFoot);
  const [position, setposition] = useState(user?.features?.inGamePosition);
  const [Height, setHeight] = useState(
    `${user?.features?.height ? user?.features?.height : ''}`,
  );
  const [Weight, setWeight] = useState(
    `${user?.features?.weight ? user?.features?.weight : ''}`,
  );
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(null);
  const [getFull, setFull] = useState([]);
  const [getShort, setShort] = useState([]);

  const pickphoto = () => {
    OpenImagePicker(img => {
      let image = img.path.split('/');
      let imgObject = {
        name: image[image.length - 1],
        uri: img.path,
        size: img.size,
        type: img.mime,
      };
      setImage(imgObject);
    });
  };
  const onsubmit = () => {
    if (
      !name ||
      !nickname ||
      !gender ||
      !foot ||
      !position ||
      !Height ||
      !Weight ||
      !DOB
    ) {
      dispatch(
        showAlert({
          title: 'Profile',
          message: 'Please Fill All Information',
          status: 'Error',
        }),
      );
    } else {
      let data = {
        fullName: name,
        nickName: nickname,
        dateOfBirth: moment(DOB).format('YYYY-MM-DD'),
        isMale: gender == 'Male' ? true : false,
        specialFoot: foot,
        shortPosition: position.shortPosition,
        position: position.position,
        height: Height,
        weight: Weight,
        topSpeed: Speed,
        picture: image,
      };
      dispatch(AuthMiddleware.UpdateProfile(data))
        .then(() => navigation.goBack())
        .catch();
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS == 'ios' ? 'padding' : undefined} keyboardVerticalOffset={Platform.OS == 'ios' ? insets.top != 20 ? -10 : 0 : 0}>
      <View style={[styles.container, { paddingBottom: Platform.OS == 'ios' ? insets.top != 20 ? 15 : 0 : 0 }]}>
        <Header title={t('Edit Profile')} leftIcon={true} />
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          <View style={{ flex: 1, width: '85%', alignSelf: 'center' }}>
            <TouchableOpacity onPress={pickphoto}>
              <Image
                source={
                  image
                    ? { uri: image.uri }
                    : user?.picture
                      ? { uri: user?.picture }
                      : picture
                }
                style={styles.main_image}
                resizeMode={'contain'}
              />
            </TouchableOpacity>

            <View style={styles.input_wrap_view}>
              <TextComponent style={styles.text} text={t('Full Name')} />
              <Textinput
                style={styles.input}
                value={name}
                onChangeText={e => setname(e)}
                placeholder={'Ex. John Smith'}
              />
            </View>

            <View style={styles.input_wrap_view}>
              <TextComponent style={styles.text} text={t('Nick Name')} />
              <Textinput
                style={styles.input}
                value={nickname}
                onChangeText={e => setnickname(e)}
                placeholder={'The name you would like to be called'}
              />
            </View>

            <View style={styles.input_wrap_view}>
              <TextComponent style={styles.text} text={t('Date Of Birth')} />
              <TouchableOpacity
                style={[styles.inputView, { padding: 15 }]}
                onPress={() => setOpen(true)}>
                <TextComponent
                  style={styles.text}
                  text={moment(DOB).format('YYYY-MM-DD')}
                />
                <FontAwesome
                  name={'calendar'}
                  size={25}
                  color={Colors.likeGray}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.input_wrap_view}>
              <TextComponent style={styles.text} text={t('Gender')} />
              <SelectDropdown
                buttonStyle={styles.inputSelect}
                buttonTextStyle={{
                  fontSize: 16,
                  color: Colors.textColor,
                  marginLeft: 10,
                  textTransform: 'capitalize',
                  textAlign: I18nManager.isRTL ? 'left' : 'left',
                }}
                defaultValue={gender}
                data={['Male', 'Female']}
                selectedRowTextStyle={{ color: Colors?.Blue }}
                onSelect={(selectedItem, index) => {
                  setgender(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return t(
                    selectedItem
                    // <TextComponent  style={[styles.text , {alignSelf:'center' , marginLeft:0}]} text={selectedItem} />
                  );
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                renderDropdownIcon={isOpened => {
                  return (
                    <MaterialIcons
                      name={isOpened ? 'arrow-drop-up' : 'arrow-drop-down'}
                      size={25}
                      color={Colors.likeGray}
                    />
                  );
                }}
              />
            </View>

            <View style={styles.input_wrap_view}>
              <TextComponent style={styles.text} text={t('Favourite Foot')} />
              <SelectDropdown
                buttonStyle={styles.inputSelect}
                buttonTextStyle={{
                  fontSize: 16,
                  color: Colors.textColor,
                  marginLeft: 10,
                  textTransform: 'capitalize',
                  textAlign: I18nManager.isRTL ? 'left' : 'left',
                }}
                defaultValue={foot}
                data={['RIGHT', 'LEFT']}
                selectedRowTextStyle={{ color: Colors?.Blue }}
                onSelect={(selectedItem, index) => {
                  setFoot(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return t(
                    selectedItem
                    // <TextComponent style={[styles.text, { alignSelf: 'center', marginLeft: 0 }]} text={selectedItem} />
                  );
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                renderDropdownIcon={isOpened => {
                  return (
                    <MaterialIcons
                      name={isOpened ? 'arrow-drop-up' : 'arrow-drop-down'}
                      size={25}
                      color={Colors.likeGray}
                    />
                  );
                }}
              />
            </View>

            <View style={styles.input_wrap_view}>
              <TextComponent
                style={styles.text}
                text={t('Position in the Game')}
              />
              <SelectDropdown
                buttonStyle={styles.inputSelect}
                buttonTextStyle={{
                  fontSize: 16,
                  color: Colors.textColor,
                  marginLeft: 10,
                  // textTransform: 'capitalize',
                  textAlign: I18nManager.isRTL ? 'left' : 'left',
                }}
                defaultButtonText={position.shortPosition}
                data={getShort}
                selectedRowTextStyle={{ color: Colors?.Blue }}
                onSelect={(selectedItem, index) => {
                  let data = { position: getFull[index], shortPosition: selectedItem }
                  setposition(data);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return t(
                    selectedItem
                    // <TextComponent
                    //   style={[styles.text, { alignSelf: 'center', marginLeft: 0 }]}
                    //   text={selectedItem.position}
                    // />
                  );
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                renderDropdownIcon={isOpened => {
                  return (
                    <MaterialIcons
                      name={isOpened ? 'arrow-drop-up' : 'arrow-drop-down'}
                      size={25}
                      color={Colors.likeGray}
                    />
                  );
                }}
              />
            </View>

            {/* <View style={styles.input_wrap_view}>
            <TextComponent style={styles.text} text={t('Top Speed')} />
            <Textinput
              style={styles.input}
              value={Speed}
              editable={false}
              onChangeText={e => setSpeed(e)}
              placeholder={'Ex. 120'}
              keyboardType={'numeric'}
            />
          </View> */}
            <View
              style={[
                styles.input_wrap_view,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                },
              ]}>
              <View style={{ width: '45%' }}>
                <TextComponent style={styles.text} text={t('Weight')} />
                <View style={styles.inputView}>
                  <Textinput
                    style={styles.inputtwo}
                    value={Weight}
                    onChangeText={e => setWeight(e)}
                    placeholder={'Ex. 120'}
                    keyboardType={'numeric'}
                  />
                  <TextComponent
                    style={{ color: '#B1B1B1', fontSize: 16 }}
                    text={t('KG')}
                  />
                </View>
              </View>
              <View style={{ width: '45%' }}>
                <TextComponent style={styles.text} text={t('Height')} />
                <View style={styles.inputView}>
                  <Textinput
                    style={styles.inputtwo}
                    value={Height}
                    onChangeText={e => setHeight(e)}
                    placeholder={'Ex. 120'}
                    keyboardType={'numeric'}
                  />
                  <TextComponent
                    style={{ color: '#B1B1B1', fontSize: 16 }}
                    text={t('CM')}
                  />
                </View>
              </View>
            </View>
          </View>

        </ScrollView>
        <Button
          text={t('Update')}
          onPress={() => {
            onsubmit();
          }}
        />

        <DatePicker
          title={'Select Date'}
          modal
          open={open}
          date={date}
          //   minimumDate={date}
          onConfirm={date => {
            setDOB(date);
            setOpen(null);
          }}
          onCancel={() => {
            setOpen(null);
          }}
          mode="date"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.homeGray,
  },
  main_image: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginVertical: 15,
    alignSelf: 'center',
  },
  input_wrap_view: {
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: Colors.textColor,
    marginLeft: 10,
    textTransform: 'capitalize',
  },
  input: {
    color: Colors.textColor,
    fontSize: 16,
    backgroundColor: Colors.Light_gray,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.Placeholder,
    width: '100%',
    marginTop: 10,
    height: 57
  },
  inputtwo: {
    color: Colors.textColor,
    fontSize: 16,
    padding: 12,
    width: 100,
    height: 57
  },
  inputSelect: {
    color: Colors.BLACK,
    width: '100%',
    height: 57,
    borderRadius: 10,
    backgroundColor: Colors.Light_gray,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.Placeholder,
    marginTop: 10,
  },
  inputView: {
    backgroundColor: Colors.Light_gray,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.Placeholder,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
    width: '100%',
  },
});
