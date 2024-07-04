import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  goalperson1,
  goalperson2,
  persons,
  defender1,
  defender3,
  defender2,
  marked,
  unmarked,
  picture,
} from '../../Components/Assets';
import {Colors} from '../../Config/Colors';
import {Header, InputText, TextComponent} from '../../Components';
import {useNavigation} from '@react-navigation/native';
import TagLabel from '../../Components/TagLabel';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {TeamMiddleware} from '../../Store/Middleware/TeamMiddleware';

const PlayersList = props => {
  const Tour = props?.route?.params?.Tour;

  const [selectionFinal, setselectionFinal] = useState(false);
  const [SelectedPlayers, setSelectedPlayers] = useState([]);
  const navigation = useNavigation();
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const PlayerData = useSelector(state => state.TeamReducer.ManagePlayer);
  const user = useSelector(state => state.AuthReducer.user);

  useEffect(() => {
    if (user?.teams?.length > 0)
      dispatch(TeamMiddleware.teamPlayerManagement({id: Tour.matchingTeamId}));
  }, []);

  const onSelectPlayers = player => {
    let find = SelectedPlayers.find(element => element?.id === player?.id);

    if (find) {
      const index = SelectedPlayers.findIndex(
        element => element?.id === player?.id,
      );
      let newArr = [...SelectedPlayers];
      newArr.splice(index, 1);
      setSelectedPlayers(newArr);
    } else {
      if (SelectedPlayers.length < Tour?.totalRegisteredPlayers) {
        let arr = [...SelectedPlayers];
        arr.push(player);
        setSelectedPlayers(arr);
        setselectionFinal(true);
      } else {
        console.log('Maximum limit reached');
      }
    }
  };

  const renderTeamItem = ({item}) => {
    const today = new Date().getFullYear();
    const dateofbirth = new Date(item?.player?.dateOfBirth);
    const age = today - dateofbirth.getFullYear();
    let Ages = Tour.age.split('+');
    let TAge = Ages;
    let find = SelectedPlayers.find(element => element?.id == item?.player?.id);
    return (
      <View
        style={[
          styles.option,
          {
            opacity:
              age >= TAge && item?.player?.isMale == Tour?.genderMale
                ? null
                : 0.5,
          },
        ]}>
        <View style={styles.flxDR}>
          <TouchableOpacity
            disabled={
              age >= TAge && item?.player?.isMale == Tour?.genderMale
                ? false
                : true
            }
            onPress={() => onSelectPlayers(item?.player)}>
            <Image
              source={find ? marked : unmarked}
              style={styles.marked_checkbox}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          <Image
            source={
              item?.player?.picture ? {uri: item?.player?.picture} : picture
            }
            style={styles.icon_image}
            resizeMode={'contain'}
          />
          <View style={styles.left}>
            <TextComponent
              text={item?.player?.fullName ? item?.player?.fullName : '--'}
            />
            <TextComponent
              text={
                age >= TAge
                  ? t('Eligible to join')
                  : !item?.player?.isMale == Tour?.genderMale
                  ? t('Gender not applicable')
                  : t('Age not applicable')
              }
              style={[
                styles.span,
                {
                  color:
                    age >= TAge && item?.player.isMale == Tour?.genderMale
                      ? Colors.accepted
                      : Colors.cancel_red,
                },
              ]}
            />
          </View>
        </View>
        <TagLabel
          text={item.player?.features.inGamePosition.shortPosition}
          bR={10}
          pH={8}
        />
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Header title={t('Your Players List')} leftIcon={true} />

      <View style={styles.upper_text_view}>
        <TextComponent
          text={t(
            'Choose the players you want to participate in the tournament',
          )}
          style={styles.text}
        />
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        data={PlayerData ? PlayerData?.players : []}
        renderItem={renderTeamItem}
        keyExtractor={item => item?.id}
        ListEmptyComponent={
          <Text style={styles.no_data_found}>{t('No Player Available')}</Text>
        }
      />

      <TouchableOpacity
        disabled={
          SelectedPlayers.length == Tour?.totalRegisteredPlayers ? false : true
        }
        onPress={() =>
          navigation.navigate('SelectedPlayers', {SelectedPlayers, Tour})
        }
        style={[
          styles.request_button,
          {
            backgroundColor:
              SelectedPlayers.length == Tour?.totalRegisteredPlayers
                ? Colors.Dark_Blue
                : Colors.light_purple,
          },
        ]}>
        <Text style={styles.button_text}>
          {SelectedPlayers.length} {t('Out of')} {Tour?.totalRegisteredPlayers}{' '}
          {t('selected')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlayersList;

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
    // fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 30,
  },
  request_button: {
    backgroundColor: Colors.Blue,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    marginBottom: 10,
  },
  button_text: {
    color: Colors.White,
    fontSize: 16,
  },
  span: {
    fontSize: 10,
  },
  marked_checkbox: {
    width: 20,
    height: 20,
  },
});
