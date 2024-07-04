import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {
  goalperson1,
  goalperson2,
  persons,
  defender1,
  defender3,
  defender2,
  picture,
} from '../../Components/Assets';
import {Colors} from '../../Config/Colors';
import {Header, InputText, TextComponent} from '../../Components';
import {useNavigation} from '@react-navigation/native';
import TagLabel from '../../Components/TagLabel';
import Textinput from '../../Components/Textinput';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {HomeMiddleware} from '../../Store/Middleware/HomeMiddleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SelectedPlayers = props => {
  const {t, i18n} = useTranslation();
  const [numberingFinal, setnumberingFinal] = useState(false);
  const [Number, setNumber] = useState([]);
  const navigation = useNavigation();
  const SPlayers = props?.route?.params?.SelectedPlayers;
  const Tour = props?.route?.params?.Tour;
  const [Players, setPlayers] = useState(SPlayers);
  const insets = useSafeAreaInsets();
  const user = useSelector(state => state.AuthReducer.user);
  const dispatch = useDispatch();

  const [enteredNumbers, setEnteredNumbers] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const onNumberChange = (num, index) => {
    const newInputValues = [...Players];
    newInputValues[index].shirt = num;
    setPlayers(newInputValues);

    // Check if the entered number already exists
    if (enteredNumbers.includes(num)) {
      // Number already exists, set the flag to disable the button
      setIsButtonDisabled(true);
      newInputValues[index].hasError = true;
    } else {
      // Number is unique, clear the error flag and check if other numbers are still duplicates
      setIsButtonDisabled(false);
      newInputValues[index].hasError = false;
    }

    setnumberingFinal(true);
    setEnteredNumbers(newInputValues.map(player => player.shirt));
  };

  const onsubmit = () => {
    if (user?.teams?.length > 0)
      dispatch(
        HomeMiddleware.SelectPlayers({
          tournament: Tour?.Tid,
          team: Tour.matchingTeamId,
          playersData: Players,
        }),
      )
        .then(() => {
          AsyncStorage.setItem('tourID', Tour?.Tid);
          navigation.navigate('TournamentDetails');
        })
        .catch();
  };

  const renderTeamItem = ({item, index}) => {
    const today = new Date().getFullYear();
    const dateofbirth = new Date(item?.dateOfBirth);
    const age = today - dateofbirth.getFullYear();
    let Ages = Tour.age.split('+');
    let TAge = Ages;
    return (
      <View
        style={[
          styles.option,
          {
            opacity:
              age >= TAge && item?.isMale == Tour?.genderMale ? null : 0.5,
          },
        ]}>
        <View style={styles.flxDR}>
          <View
            style={[
              styles.no_input,
              item.hasError ? {borderColor: 'red', borderWidth: 1} : null,
              {alignItems: 'center', justifyContent: 'center'},
            ]}>
            <Textinput
              editable={
                age >= TAge && item?.isMale == Tour?.genderMale ? true : false
              }
              style={{
                fontSize: 14,
                color: Colors.textColor,
                padding: 5,
              }}
              keyboardType={'number-pad'}
              onChangeText={num => onNumberChange(num, index)}
              maxLength={3}
            />
          </View>

          <Image
            source={item?.picture ? {uri: item?.picture} : picture}
            style={styles.icon_image}
            resizeMode={'contain'}
          />
          <View style={styles.left}>
            <TextComponent text={item?.fullName ? item?.fullName : '--'} />
            <TextComponent
              text={
                age >= TAge
                  ? t('Eligible to join')
                  : !item?.isMale == Tour?.genderMale
                  ? t('Gender not applicable')
                  : t('Age not applicable')
              }
              style={[
                styles.span,
                {
                  color:
                    age >= TAge && item?.isMale == Tour?.genderMale
                      ? Colors.accepted
                      : Colors.cancel_red,
                },
              ]}
            />
          </View>
        </View>
        <TagLabel
          text={item?.features.inGamePosition.shortPosition}
          bR={10}
          pH={8}
        />
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Header title={t('List of Selected Players')} leftIcon={true} />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}
        // keyboardVerticalOffset={Platform.OS == 'ios' ? insets.top != 20 ? 0 : 0 : 0}
      >
        <ScrollView>
          <View style={styles.upper_text_view}>
            <TextComponent
              text={t(
                'Enter the shirt numbers of the selected players, knowing that you cannot change this later',
              )}
              style={styles.text}
            />
          </View>

          <FlatList
            showsHorizontalScrollIndicator={false}
            data={Players}
            renderItem={renderTeamItem}
            keyExtractor={item => item?.id}
            ListEmptyComponent={
              <Text style={styles.no_data_found}>
                {t('No Player Available')}
              </Text>
            }
            scrollEnabled={false}
          />

          <TouchableOpacity
            disabled={isButtonDisabled}
            onPress={() => onsubmit()}
            style={[
              styles.request_button,
              {
                backgroundColor: isButtonDisabled
                  ? Colors.light_purple
                  : Colors.Dark_Blue,
              },
            ]}>
            <Text style={styles.button_text}>{t('Submit')}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SelectedPlayers;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.homeGray,
  },
  search_view: {
    width: '95%',
    alignSelf: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 17,
    backgroundColor: Colors.White,
    borderColor: Colors.light_opacity,
    borderWidth: 0.5,
  },
  flxDR: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon_image: {
    width: 35,
    height: 35,
    marginLeft: 10,
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
  },
  upper_text_view: {
    padding: 15,
    alignItems: 'center',
  },
  left: {
    marginLeft: 13,
  },
  menuIcon: {
    width: 18,
    height: 18,
  },
  no_data_found: {
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 30,
  },
  request_button: {
    backgroundColor: Colors.Blue,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    // marginBottom: 10,
  },
  button_text: {
    color: Colors.White,
    fontSize: 16,
  },
  span: {
    fontSize: 10,
  },
  no_input: {
    width: 35,
    height: 35,
    borderRadius: 8,
    borderWidth: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    borderColor: Colors.Placeholder,
    backgroundColor: Colors.Light_gray,
  },
});
