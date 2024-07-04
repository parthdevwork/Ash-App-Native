import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import {Colors} from '../../Config/Colors';
import {persons, picture} from '../../Components/Assets';
import {TextComponent} from '../../Components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TagLabel from '../../Components/TagLabel';
import {useDispatch, useSelector} from 'react-redux';
import {TeamMiddleware} from '../../Store/Middleware/TeamMiddleware';
import Skeleton from '../../Components/Skeleton';

const TeamPlayers = () => {
  const PlayerData = useSelector(state => state.TeamReducer.ManagePlayer);

  const renderItem = ({item}) => {
    return PlayerData ? (
      <View style={styles.option}>
        <View style={styles.flxDR}>
          <Image
            source={
              item?.player.picture ? {uri: item?.player.picture} : persons
            }
            style={styles.icon_image}
            resizeMode={'contain'}
          />
          <View>
            <TextComponent
              text={item?.player.fullName ? item?.player.fullName : '--'}
              style={styles.left}
            />
            <TextComponent
              text={
                item?.isPlayerParticipating
                  ? 'Now participating in the team'
                  : 'Now not participating in the team'
              }
              style={[
                styles.bio,
                {
                  color: item?.isPlayerParticipating
                    ? '#00AF66'
                    : Colors.likeGray,
                },
              ]}
            />
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
            style={{marginLeft: 10}}
          />
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
        data={PlayerData ? PlayerData?.players : [1, 2, 3, 4, 6, 7]}
        renderItem={renderItem}
        keyExtractor={item => item?.id}
        ListEmptyComponent={
          <TextComponent
            text={'No Player Available'}
            style={styles.no_data_found}
          />
        }
      />
    </View>
  );
};

export default TeamPlayers;

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
    fontSize: 18,
    fontWeight: '600',
  },
  bio: {
    fontSize: 11,
    marginLeft: 10,
    color: Colors.likeGray,
  },
  no_data_found: {
    // fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 30,
  },
});
