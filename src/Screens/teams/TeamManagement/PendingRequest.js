import React, {useState} from 'react';
import {Image, TouchableOpacity, I18nManager} from 'react-native';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {TextComponent} from '../../../Components';
import {Colors} from '../../../Config/Colors';
import {team6, team7, team9, persons} from '../../../Components/Assets';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import Skeleton from '../../../Components/Skeleton';
import {TeamMiddleware} from '../../../Store/Middleware/TeamMiddleware';

const PendingRequests = () => {
  const TeamData = useSelector(state => state.TeamReducer.ManageTeam);

  const {t, i18n} = useTranslation();
  const [refresh, setrefresh] = useState(false);
  const dispatch = useDispatch();

  const onRefresh = () => {
    setrefresh(true);
    dispatch(TeamMiddleware.teamManagement());
    setrefresh(false);
  };

  const Action = (type, id, team, player) => {
    if (type == 'Reject') {
      dispatch(
        TeamMiddleware.declineRequest({id, team, player, Screen: 'TeamM'}),
      );
    } else {
      dispatch(
        TeamMiddleware.acceptRequest({id, team, player, Screen: 'TeamM'}),
      );
    }
  };

  const renderTeamRequestItem = ({item}) => {
    return TeamData ? (
      <View>
        <View style={styles.option}>
          <View style={styles.flxDR}>
            <Image
              source={item?.team?.logo ? {uri: item?.team.logo} : persons}
              style={styles.icon_image}
            />
            <TextComponent
              text={item?.team?.teamName ? item?.team?.teamName : '--'}
              style={styles.left}
            />
          </View>
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

        <View style={styles.buttons_view}>
          <TouchableOpacity
            style={styles.accept_button}
            onPress={() =>
              Action('Accept', item.id, item.team.id, item.player)
            }>
            <MaterialCommunityIcons
              name="check-bold"
              size={23}
              color={Colors.accepted}
            />
            <TextComponent
              text={t('Accept to join')}
              style={styles.accept_btn_txt}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.reject_button}
            onPress={() =>
              Action('Reject', item.id, item.team.id, item.player)
            }>
            <Entypo name="cross" size={23} color={Colors.cancel_red} />
            <TextComponent
              text={t('Reject to join')}
              style={styles.reject_btn_txt}
            />
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      <Skeleton
        style={{
          height: 60,
          width: '100%',
          borderColor: Colors.light_opacity,
          borderWidth: 0.5,
        }}
      />
    );
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={TeamData ? TeamData?.requests : [1, 2, 3, 4, 5, 6, 7]}
        renderItem={renderTeamRequestItem}
        refreshing={refresh}
        onRefresh={onRefresh}
        keyExtractor={item => item?.id}
        ListEmptyComponent={
          <View style={{alignItems:'center'}}>
          <TextComponent
            text={t('No Team Request Available')}
            style={styles.no_data_found}
          />
          </View>
        }
      />
    </View>
  );
};

export default PendingRequests;

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
    resizeMode: 'contain',
    width: 30,
    height: 30,
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
});
