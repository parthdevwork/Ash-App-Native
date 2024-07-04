import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {StyleSheet, View, Text, FlatList, I18nManager} from 'react-native';
import {TextComponent} from '../../Components';
import {Colors} from '../../Config/Colors';
import {team6, team7, team9, persons, picture} from '../../Components/Assets';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import TagLabel from '../../Components/TagLabel';
import {useDispatch, useSelector} from 'react-redux';
import {TeamMiddleware} from '../../Store/Middleware/TeamMiddleware';

const PlayersRequest = () => {
  const PlayerData = useSelector(state => state.TeamReducer.ManagePlayer);

  const dispatch = useDispatch();

  const Action = (type, id, team, player) => {
    if (type == 'Reject') {
      dispatch(
        TeamMiddleware.declineRequest({id, team, player, Screen: 'PlayerM'}),
      );
    } else {
      dispatch(
        TeamMiddleware.acceptRequest({id, team, player, Screen: 'PlayerM'}),
      );
    }
  };

  const renderTeamRequestItem = ({item}) => {
    const today = new Date().getFullYear();
    const dateofbirth = new Date(item?.player?.dateOfBirth);
    const age = today - dateofbirth.getFullYear();
    return (
      <View>
        <View style={styles.option}>
          <View style={styles.flxDR}>
            <Image
              source={
                item?.player?.picture ? {uri: item?.player?.picture} : persons
              }
              style={styles.icon_image}
              resizeMode={'contain'}
            />
            <View>
              <TextComponent
                text={item?.player?.fullName ? item?.player?.fullName : '--'}
                style={styles.left}
              />
              <TextComponent text={`${age} years`} style={styles.bio} />
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TagLabel
              text={item?.player?.features?.inGamePosition?.shortPosition}
              bR={5}
              pH={5}
              TextStyle={{fontSize: 13, marginVertical: 2, fontWeight: '600'}}
            />
            <MaterialIcons
              name={
                !I18nManager.isRTL
                  ? 'keyboard-arrow-right'
                  : 'keyboard-arrow-left'
              }
              size={30}
              color={Colors.Blue}
              style={styles.left}
            />
          </View>
        </View>

        <View style={styles.buttons_view}>
          <TouchableOpacity
            style={styles.accept_button}
            onPress={() =>
              Action('Accept', item.id, item.team, item.player.id)
            }>
            <MaterialCommunityIcons
              name="check-bold"
              size={23}
              color={Colors.accepted}
            />
            <TextComponent
              text={'Accept to join'}
              style={styles.accept_btn_txt}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.reject_button}
            onPress={() =>
              Action('Reject', item.id, item.team, item.player.id)
            }>
            <Entypo name="cross" size={23} color={Colors.cancel_red} />
            <TextComponent
              text={'Reject to join'}
              style={styles.reject_btn_txt}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={PlayerData ? PlayerData?.requests : [1, 2, 3, 4, 6, 7]}
        renderItem={renderTeamRequestItem}
        keyExtractor={item => item?.id}
        ListEmptyComponent={
          <TextComponent
            text={'No Request Found'}
            style={styles.no_data_found}
          />
        }
      />
    </View>
  );
};

export default PlayersRequest;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.homeGray,
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
    width: 40,
    height: 40,
    borderRadius: 40,
    borderColor: Colors.SuccessGreen,
    borderWidth: 1,
  },

  left: {
    marginLeft: 10,
  },
  no_data_found: {
    // fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 30,
  },
  buttons_view: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-evenly',
    backgroundColor: 'rgba(246, 246, 246, 1)',
    borderWidth: 1,
    borderColor: Colors.Light_gray,
  },
  accept_btn_txt: {
    color: Colors.accepted,
    fontSize: 13,
    marginLeft: 3,
  },
  accept_button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.accepted_bg,
    width: '40%',
    borderWidth: 1,
    padding: 3,
    paddingHorizontal: 8,
    borderColor: Colors.accepted,
    borderRadius: 20,
  },
  reject_button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.rejected_bg,
    width: '40%',
    borderWidth: 1,
    padding: 3,
    paddingHorizontal: 8,
    borderColor: Colors.cancel_red,
    borderRadius: 20,
  },
  reject_btn_txt: {
    color: Colors.cancel_red,
    fontSize: 13,
    marginLeft: 3,
  },
  bio: {
    fontSize: 11,
    marginLeft: 10,
    color: Colors.likeGray,
  },
});
