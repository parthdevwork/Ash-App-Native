import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  I18nManager,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors} from '../../Config/Colors';
import {TextComponent} from '../../Components';
import {
  barcelona,
  heart,
  matchanimation,
  persons,
  Player1,
  Player2,
  Player3,
  RealM,
} from '../../Components/Assets';
import TeamCard from '../../Components/TeamCard';
import TagLabel from '../../Components/TagLabel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {TeamMiddleware} from '../../Store/Middleware/TeamMiddleware';
import {useNavigation} from '@react-navigation/native';
import {HomeMiddleware} from '../../Store/Middleware/HomeMiddleware';
import Image from '../../Components/Image';
import moment from 'moment';

const MatchSupport = () => {
  const [team, setteam] = useState(null);
  const [PlayerSelected, setPlayerSelected] = useState(null);
  const [isLike, setisLike] = useState(null);
  const Match = useSelector(state => state.HomeReducer.MatchDetail);
  const PlayerData = useSelector(state => state.TeamReducer.ManagePlayer);
  const [isDisabled, setisDisabled] = useState(null);
  const navigation = useNavigation();

  const date = new Date();
  let initialdate = moment(Match?.matchDate).format('YYYY-MM-DD');
  let start_time = Match?.matchStartTime;
  let matchStart = moment(initialdate + ' ' + start_time);

  let seconds = Math.floor((matchStart - date) / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);

  hours = hours - days * 24;
  minutes = minutes - days * 24 * 60 - hours * 60;
  seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;

  const dispatch = useDispatch();

  useEffect(() => {
    navigation.addListener('blur', () => {
      setisLike(null), setPlayerSelected(null), setteam(null);
    });
  }, []);

  const renderItems = ({item, index}) => {
    return (
      <View
        style={[
          styles.Menu,
          {
            borderBottomColor: '#E0E0E0',
            borderBottomWidth: 1,
          },
        ]}>
        <Image
          source={
            item?.player?.id?.picture
              ? {uri: item?.player?.id?.picture}
              : persons
          }
          style={styles.icon}
          resizeMode={'contain'}
        />

        <TextComponent
          text={item.player?.shirt}
          style={{
            color: Colors.textColor,
            fontSize: 14,
            marginHorizontal: 10,
            fontWeight: '600',
            width: 20,
            textAlign: 'center',
          }}
        />

        <View style={{flex: 1}}>
          <TextComponent
            text={item?.player?.id?.fullName ? item?.player?.id?.fullName : ''}
            style={styles.MenuText}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {/* <TagLabel
            text={item?.player?.features?.inGamePosition?.shortPosition}
            bR={5}
            pH={5}
            TextStyle={{fontSize: 13, marginVertical: 2, fontWeight: '600'}}
          />

          <TextComponent
            text={item?.player?.level.popularity}
            style={{
              color: Colors.textColor,
              fontSize: 14,
              marginHorizontal: 10,
              fontWeight: '600',
              textAlign: 'center',
            }}
          /> */}
          <TouchableOpacity
            onPress={() => {
              support(Match?.id, 'PLAYER', item?.player?.id, team.id),
                setPlayerSelected(item);
            }}>
            <Ionicons
              name={isLike == item.id ? 'heart' : 'heart-outline'}
              size={24}
              color={Colors.Dark_Blue}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const support = (match, type, id, team) => {
    dispatch(
      HomeMiddleware.supportMatch({
        match,
        type,
        id,
        team: Match.teamSupport ? null : team,
      }),
    );
  };

  const supportTeam = item => {
    dispatch(
      TeamMiddleware.teamPlayerManagement({
        id: item.id,
      }),
    )
      .then(() => {
        setteam(item), setisDisabled(null);
      })
      .catch(() => setisDisabled(null));
  };

  const chooseTeam = item => {
    dispatch(
      TeamMiddleware.getTeamPlayers({
        id: item.id,
        tournament: Match.tournament.id,
      }),
    )
      .then(() => {
        setteam(item), setisDisabled(null);
      })
      .catch(() => setisDisabled(null));
  };

  return (
    <View style={styles.container}>
      {Match?.matchStatus == 'UPCOMING' ? (
        <View style={{alignItems: 'center'}}>
          <Image
            source={matchanimation}
            style={{width: 150, height: 150}}
            resizeMode={'contain'}
          />
          <TextComponent
            text={'The match will start in'}
            style={{alignSelf: 'center', color: Colors.textColor, fontSize: 12}}
          />
          <TextComponent
            text={`${days} days, ${hours} hours, ${minutes} minutes`}
            style={[styles.Text, {alignSelf: 'center'}]}
          />
          <TextComponent
            text={'You can support a team before or after it begins'}
            style={{
              alignSelf: 'center',
              marginVertical: 15,
              color: Colors.textColor,
              fontSize: 14,
            }}
          />
        </View>
      ) : null}
      {!Match.teamSupport && !team ? (
        <View
          style={{marginTop: Match?.matchStatus == 'UPCOMING' ? 10 : '20%'}}>
          <View style={{alignSelf: 'center', alignItems: 'center'}}>
            <TextComponent
              text={
                Match?.matchStatus == 'OVER'
                  ? 'Match is Over'
                  : 'Choose the Team you Support'
              }
              style={styles.Text}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              // alignItems: 'center',
              justifyContent: 'space-evenly',
              marginTop: 15,
            }}>
            <TouchableOpacity
              disabled={
                isDisabled == null && Match?.matchStatus == 'OVER'
                  ? true
                  : false
              }
              onPress={() => {
                setisDisabled(Match?.teamA.team);
                // supportTeam(Match?.teamA.team);
                chooseTeam(Match?.teamA.team);
              }}
              style={{
                opacity: Match?.matchStatus == 'OVER' ? 0.5 : 1,
                padding: 20,
                backgroundColor: Colors.White,
                borderRadius: 10,
                justifyContent: 'center',
                paddingHorizontal:
                  isDisabled?.id == Match?.teamA.team.id ? 40 : 20,
              }}>
              {isDisabled?.id == Match?.teamA.team.id ? (
                <ActivityIndicator size={'large'} color={Colors.Dark_Blue} />
              ) : (
                <TeamCard
                  teamImage={{uri: Match?.teamA.team.logo}}
                  teamName={Match?.teamA.team.teamName}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              disabled={
                isDisabled == null && Match?.matchStatus == 'OVER'
                  ? true
                  : false
              }
              onPress={() => {
                setisDisabled(Match?.teamB.team);
                // supportTeam(Match?.teamB.team);
                chooseTeam(Match?.teamB.team);
              }}
              style={{
                opacity: Match?.matchStatus == 'OVER' ? 0.5 : 1,
                padding: 20,
                backgroundColor: Colors.White,
                borderRadius: 10,
                justifyContent: 'center',
                paddingHorizontal:
                  isDisabled?.id == Match?.teamB.team.id ? 40 : 20,
              }}>
              {isDisabled?.id == Match?.teamB.team.id ? (
                <ActivityIndicator size={'large'} color={Colors.Dark_Blue} />
              ) : (
                <TeamCard
                  teamImage={{uri: Match?.teamB.team.logo}}
                  teamName={Match?.teamB.team.teamName}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      ) : !Match.playerSupport ? (
        <FlatList
          style={{marginTop: 10}}
          data={PlayerData}
          renderItem={renderItems}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderColor: Colors.bottomTabColor,
                  padding: 10,
                  justifyContent: 'center',
                  marginBottom: 10,
                }}>
                <TextComponent
                  text={'You are Supporting'}
                  style={[
                    styles.Text,
                    {alignSelf: 'center', fontWeight: '400'},
                  ]}
                />
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 10,
                    backgroundColor: Colors.White,
                    marginLeft: 20,
                    borderColor: '#392276',
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={{uri: team?.logo}}
                    style={{width: 40, height: 40}}
                    resizeMode={'contain'}
                  />
                </View>
              </View>

              <TextComponent
                text={'Choose the Player you Support'}
                style={[styles.Text, {alignSelf: 'center', marginVertical: 10}]}
              />
            </View>
          }
        />
      ) : (
        <ScrollView nestedScrollEnabled style={{flex: 1}}>
          <View style={{alignItems: 'center'}}>
            <TextComponent
              text={'You are Supporting'}
              style={[styles.Text, {alignSelf: 'center', marginVertical: 20}]}
            />
          </View>
          <View
            style={{
              borderRadius: 10,
              backgroundColor: Colors.White,
              borderColor: '#392276',
              borderWidth: 1,
              padding: 15,
              width: 120,
              minHeight: 120,
              alignSelf: 'center',
            }}>
            <TeamCard
              teamImage={{
                uri: team?.logo
                  ? team?.logo
                  : Match.teamSupport?.supportTo?.logo,
              }}
              teamName={
                team?.teamName
                  ? team.teamName
                  : Match.teamSupport?.supportTo?.teamName
              }
            />
          </View>

          <View style={{marginVertical: 20, alignSelf: 'center'}}>
            <View style={{width: 120}}>
              <Image
                source={
                  PlayerSelected?.player?.picture
                    ? {uri: PlayerSelected?.player.picture}
                    : Match.playerSupport
                    ? {uri: Match.playerSupport.supportTo.picture}
                    : persons
                }
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 100,
                  borderColor: Colors.Dark_Blue,
                  borderWidth: 1,
                }}
                resizeMode={'contain'}
              />
              <ImageBackground
                source={heart}
                style={{
                  width: 35,
                  height: 35,
                  position: 'absolute',
                  right: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                resizeMode={'contain'}>
                <TextComponent
                  text={
                    PlayerSelected?.player?.level.popularity
                      ? PlayerSelected?.player?.level.popularity
                      : Match?.playerSupport?.supportTo?.level.popularity
                  }
                  style={{
                    color: Colors.SuccessGreen,
                    fontSize: 10,
                    fontWeight: '600',
                    // width: 20,
                    textAlign: 'center',
                  }}
                />
              </ImageBackground>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <TextComponent
                text={
                  PlayerSelected?.player?.statistics?.shirtNumber
                    ? null
                    : Match?.playerSupport?.supportTo?.statistics?.shirtNumber
                }
                style={{
                  color: Colors.textColor,
                  fontSize: 14,
                  fontWeight: '600',
                  width: 20,
                  textAlign: 'center',
                }}
              />
              <TextComponent
                text={
                  PlayerSelected?.player?.fullName
                    ? PlayerSelected?.player?.fullName
                    : Match?.playerSupport?.supportTo.fullName
                }
                style={[styles.MenuText, {marginHorizontal: 10}]}
              />
              <TagLabel
                text={
                  PlayerSelected?.player?.features?.inGamePosition
                    ?.shortPosition
                    ? PlayerSelected?.player?.features?.inGamePosition
                        ?.shortPosition
                    : Match?.playerSupport?.supportTo.features?.inGamePosition
                        ?.shortPosition
                }
                bR={5}
                pH={5}
                TextStyle={{fontSize: 13, marginVertical: 2, fontWeight: '600'}}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default MatchSupport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.homeGray,
  },
  Text: {
    fontSize: 18,
    color: Colors.textColor,
    fontWeight: '700',
    alignSelf: 'center',
  },
  Menu: {
    flexDirection: 'row',
    height: 70,
    marginHorizontal: 25,
    // backgroundColor: Colors.White,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 1,
  },
  MenuText: {
    fontSize: 16,
    color: Colors.textColor,
    fontWeight: '600',
  },

  icon: {
    width: 40,
    height: 40,
    borderColor: Colors.SuccessGreen,
    borderRadius: 20,
    borderWidth: 1,
  },

  image: {width: 95, height: 95, borderRadius: 100},
});
