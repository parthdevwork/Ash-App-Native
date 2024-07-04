import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../Components/Header';
import {Colors} from '../../Config/Colors';
import {createLogo, createPic} from '../../Components/Assets';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TextComponent from '../../Components/TextComponent';
import {useNavigation} from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import Textinput from '../../Components/Textinput';
import {OpenImagePicker} from '../../Components';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {TeamMiddleware} from '../../Store/Middleware/TeamMiddleware';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Image from '../../Components/Image';

const CreateNewTeam = props => {
  const insets = useSafeAreaInsets();
  const {t, i18n} = useTranslation();
  const navigation = useNavigation();
  const TeamDetails = props?.route?.params?.TeamDetails;
  const screen = props?.route?.params?.screen;

  const [teamPicture, setteamPicture] = useState();
  const [teamLogo, setteamLogo] = useState();
  const [teamName, setteamName] = useState(
    TeamDetails?.teamName ? TeamDetails?.teamName : '',
  );
  const [city, setcity] = useState(
    TeamDetails?.teamName ? TeamDetails?.city : '',
  );
  const [bio, setbio] = useState(
    TeamDetails?.teamName ? TeamDetails?.teamBio : '',
  );
  const countries = ['Jeddah', 'barcelona', 'Munich'];

  const dispatch = useDispatch();

  const pickBannerPhoto = () => {
    OpenImagePicker(img => {
      let image = img.path.split('/');
      let imgObject = {
        name: image[image.length - 1],
        uri: img.path,
        size: img.size,
        type: img.mime,
      };
      setteamPicture(imgObject);
    });
  };

  const pickLogoPhoto = () => {
    OpenImagePicker(img => {
      let image = img.path.split('/');
      let imgObject = {
        name: image[image.length - 1],
        uri: img.path,
        size: img.size,
        type: img.mime,
      };
      setteamLogo(imgObject);
    });
  };

  const onSubmit = () => {
    if (screen == 'TeamDetails') {
      dispatch(
        TeamMiddleware.updateTeam({
          id: TeamDetails?.id,
          name: teamName,
          bio,
          city,
          cover: teamPicture,
          logo: teamLogo,
        }),
      )
        .then(() => navigation.goBack())
        .catch();
    } else {
      dispatch(
        TeamMiddleware.createTeam({
          name: teamName,
          bio,
          city,
          cover: teamPicture,
          logo: teamLogo,
        }),
      )
        .then(() => navigation.goBack())
        .catch();
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS == 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={
        Platform.OS == 'ios' ? (insets.top != 20 ? -10 : 0) : 0
      }>
      <View
        style={[
          styles.mainContainer,
          {
            paddingBottom:
              Platform.OS == 'ios' ? (insets.top != 20 ? 15 : 0) : 0,
          },
        ]}>
        <Header title={t('Create New Team')} leftIcon={true} />
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={pickBannerPhoto}>
            <Image
              source={
                teamPicture
                  ? {uri: teamPicture.uri}
                  : TeamDetails?.cover
                  ? {uri: TeamDetails?.cover}
                  : createPic
              }
              style={styles.main_image}
              resizeMode={'stretch'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              // padding: 2,
              borderRadius: 100,
              width: 85,
              height: 85,
              marginTop: -40,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={pickLogoPhoto}>
            <Image
              source={
                teamLogo
                  ? {uri: teamLogo.uri}
                  : TeamDetails?.logo
                  ? {uri: TeamDetails?.logo}
                  : createLogo
              }
              style={styles.logo_image}
            />
          </TouchableOpacity>

          <View style={styles.inputs_view}>
            <View style={styles.input_wrap_view}>
              <TextComponent style={styles.text} text={t('Team Name')} />
              <Textinput
                style={[
                  styles.input,
                  {
                    borderColor: teamName
                      ? Colors.SuccessGreen
                      : Colors.Placeholder,
                    color: Colors.textColor,
                  },
                ]}
                value={teamName}
                onChangeText={e => setteamName(e)}
                placeholder={'Ex. Green Falcons Club'}
              />
            </View>

            <View style={styles.input_wrap_view}>
              <TextComponent style={styles.text} text={t('City')} />
              <SelectDropdown
                buttonStyle={[
                  styles.inputx,
                  {
                    borderColor: city
                      ? Colors.SuccessGreen
                      : Colors.Placeholder,
                  },
                ]}
                buttonTextStyle={{
                  color: Colors.Placeholder,
                  fontSize: 14,
                  textAlign: 'left',
                }}
                defaultValue={city}
                data={countries}
                selectedRowTextStyle={{color: Colors?.Blue}}
                onSelect={(selectedItem, index) => {
                  setcity(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return (
                    <Text
                      style={{
                        color: Colors?.Blue,
                        justifyContent: 'flex-start',
                      }}>
                      {t(selectedItem)}
                    </Text>
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
              <TextComponent style={styles.text} text={t("Team's Bio")} />
              <Textinput
                style={[
                  styles.text_box,
                  {
                    borderColor: bio ? Colors.SuccessGreen : Colors.Placeholder,
                    color: Colors.textColor,
                  },
                ]}
                placeholder={t('Write about the team here')}
                numberOfLines={5}
                value={bio}
                onChangeText={text => setbio(text)}
                multiline={true}
              />
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => onSubmit()}
          style={[
            styles.browse_button,
            {
              backgroundColor:
                teamName && bio && city
                  ? Colors.Dark_Blue
                  : Colors.light_purple,
            },
          ]}
          disabled={teamName && bio && city ? false : true}>
          <TextComponent
            text={t('Create the Team')}
            style={styles.button_text}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreateNewTeam;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.homeGray,
  },

  main_image: {
    alignSelf: 'center',
    width: '100%',
    height: 160,
  },
  logo_image: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  input: {
    height: 57,
    backgroundColor: Colors.Light_gray,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.Placeholder,
    width: '100%',
    marginTop: 10,
  },
  inputx: {
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

  inputs_view: {
    width: '85%',
    alignSelf: 'center',
    marginTop: 25,
  },
  text_box: {
    marginTop: 12,
    backgroundColor: Colors.Light_gray,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: Colors.Placeholder,
    width: '100%',
    alignSelf: 'center',
    padding: 15,
    borderRadius: 10,
    height: 150,
  },
  input_wrap_view: {
    marginBottom: 15,
  },

  text: {
    fontSize: 16,
    color: Colors.textColor,
    marginLeft: '2%',
  },
  browse_button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    // marginTop: 15,
  },
  button_text: {
    color: Colors.White,
    fontSize: 15,
  },
});
