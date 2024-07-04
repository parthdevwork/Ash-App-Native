import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState, useRef, useEffect, useCallback} from 'react';
import {Colors} from '../../Config/Colors';
import {useTranslation} from 'react-i18next';
import TagLabel from '../../Components/TagLabel';
import {Header, TextComponent} from '../../Components';
import {
  barcelona,
  ground,
  RealM,
  Male,
  clock,
  Ball,
  yellowcard,
  letterPCross,
  redcard,
  letterPCheck,
  Cards,
  Arrows,
  BallOG,
  MOTM,
} from '../../Components/Assets';
import {useSelector} from 'react-redux';
import {
  useFocusEffect,
  useNavigation,
  useIsFocused,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TimeLines = () => {
  const {t, i18n} = useTranslation();
  const [isLike, setislike] = useState(false);
  const [teamAId, setTeamAId] = useState('');
  const [teamBId, setTeamBId] = useState('');

  const Match = useSelector(state => state.HomeReducer.MatchDetail);
  const flatList = useRef(null);
  const Navigation = useNavigation();


  useEffect(() => {
    const checkMAtchID = async () => {
      try {
        const matchTeamAId = await AsyncStorage.getItem('matchTeamAId');
        setTeamAId(matchTeamAId);
        const matchTeamBId = await AsyncStorage.getItem('matchTeamBId');
        setTeamBId(matchTeamBId);
      } catch (error) {
        console.error('Error retrieving tourID:', error);
      }
    };

    checkMAtchID();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (Match.timeline.length > 0)
        flatList.current._listRef.scrollToEnd({animating: false});
    }, [flatList, Navigation]),
  );

  const data = [
    {
      id: 1,
      time: "13'",
      type: 'start',
      image: Ball,
      title: 'Karim Benzema',
      dec: 'Toni Kroos',
    },
    {
      id: 2,
      time: "24'",
      type: 'yellowcard',
      image: yellowcard,
      title: 'Eder Militao',
      dec: null,
    },
    {
      id: 3,
      time: "25'",
      type: 'playerout',
      image: letterPCross,
      title: 'Robert Lewandowski',
      dec: null,
    },
    {
      id: 4,
      time: "47'",
      type: 'redcard',
      image: redcard,
      title: 'Ronald Araujo',
      dec: null,
    },
    {
      id: 5,
      time: "49'",
      type: 'playerin',
      image: letterPCheck,
      title: 'Karim Benzema',
      dec: null,
    },
    {
      id: 6,
      time: "51'",
      type: 'bothcards',
      image: Cards,
      title: 'Eder Militao',
      dec: null,
    },
    {
      id: 7,
      time: "53'",
      type: 'player-exchange',
      image: Arrows,
      title: 'Ansu Fati',
      title2: 'Sergio Busquets',
      dec: null,
    },
    {
      id: 8,
      time: "88'",
      type: 'owngoal',
      image: BallOG,
      title: 'Andreas Christensen',
      dec: null,
    },
    {
      id: 9,
      time: "90 + 4'",
      type: 'player-exchange',
      image: Arrows,
      title: 'Rodrygo',
      title2: 'Vinicius Junior',
      dec: null,
    },
  ];

  const renderMatchDetail = ({item, index}) => {
    let image = null;
    let player2 = null;
    switch (item.type) {
      case 'GOAL':
        image = Ball;
        break;
      case 'PENALTY-FAILED':
        image = letterPCross;
        break;
      case 'PENALTY-SUCCESS':
        image = letterPCheck;
        break;
      case 'YELLOW-CARD':
        image = yellowcard;
        break;
      case 'SUBSTITUTE':
        image = Arrows;
        player2 = item.notes.split('with');
        break;
      case 'RED-CARD':
        image = redcard;
        break;
      case 'RED-YELLOW':
        image = Cards;
        break;
      case 'START':
        image = Ball;
        break;
      case 'OWN-GOAL':
        image = Ball;
        break;
      case 'START_MATCH':
        image = Ball;
        break;
      case 'OVER':
        image = clock;
        break;
      default:
        break;
    }
    return item.type == 'MAN-OF-THE-MATCH' ? null : (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 65,
        }}>
        <View
          style={{
            width: '42%',
            flexDirection: 'row',
            height: 65,
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            marginTop: data.length - 1 == index ? 15 : 5,
          }}>
          {teamAId === item.team && (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {item?.type != 'SUBSTITUTE' ? (
                <View style={{alignItems: 'flex-end'}}>
                  <TextComponent
                    text={item.player?.fullName}
                    style={item?.title2 ? styles.green : styles.title}
                  />
                  {/* {item.player?.nickName ? (
                    <TextComponent
                      text={item.player?.nickName}
                      style={[
                        styles.title,
                        {color: '#7E7E82', marginBottom: 0, marginTop: -5},
                      ]}
                    />
                  ) : null} */}
                </View>
              ) : (
                <View style={{alignItems: 'flex-end'}}>
                  <TextComponent
                    text={item.player?.fullName}
                    style={styles.green}
                  />
                  <TextComponent
                    text={player2[player2.length - 1]}
                    style={styles.red}
                  />
                </View>
              )}
              <Image
                source={image}
                style={{width: 25, height: 25, marginLeft: 10}}
                resizeMode={'contain'}
              />
            </View>
          )}
          {/* {index % 2 == 0 ? (
            
          ) : null} */}
        </View>
        <View style={{width: '15%', alignItems: 'center'}}>
          {data.length - 1 == index ? (
            <View style={{width: 2, height: 20, backgroundColor: '#DFDFDF'}} />
          ) : null}
          <TextComponent
            text={item.time}
            style={[
              styles.title,
              {
                color: Colors.textColor,
              },
            ]}
          />
          {index != 0 ? (
            <View style={{width: 2, height: 30, backgroundColor: '#DFDFDF'}} />
          ) : (
            <View style={{width: 2, height: 20, backgroundColor: '#DFDFDF'}} />
          )}
        </View>
        <View
          style={{
            width: '42%',
            flexDirection: 'row',
            height: 65,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginTop: data.length - 1 == index ? 15 : 10,
          }}>
          {teamBId === item.team && (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={image}
                style={{width: 25, height: 25, marginRight: 10}}
                resizeMode={'contain'}
              />
              {item?.type != 'SUBSTITUTE' ? (
                <View style={{alignItems: 'flex-end'}}>
                  <TextComponent
                    text={item.player?.fullName}
                    style={item?.title2 ? styles.green : styles.title}
                  />
                  {/* {item.player?.nickName ? (
                    <TextComponent
                      text={item.player?.nickName}
                      style={[
                        styles.title,
                        {color: '#7E7E82', marginBottom: 0, marginTop: -5},
                      ]}
                    />
                  ) : null} */}
                </View>
              ) : (
                <View>
                  <TextComponent
                    text={item.player?.fullName}
                    style={styles.green}
                  />
                  <TextComponent
                    text={player2[player2.length - 1]}
                    style={styles.red}
                  />
                </View>
              )}
            </View>
          )}
          {/* {index % 2 != 0 ? (
           
          ) : null} */}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={Match.timeline}
        ref={flatList}
        // style={{marginVertical: 20}}
        contentContainerStyle={{paddingHorizontal: 10}}
        showsVerticalScrollIndicator={false}
        renderItem={renderMatchDetail}
        keyExtractor={item => item.id}
        inverted={Match.timeline.length == 0 ? false : true}
        ListHeaderComponent={
          Match.timeline.length == 0 ? null : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: 30,
                marginTop: -5,
              }}>
              <View style={{width: '42%', flexDirection: 'row'}} />
              <View style={{width: '15%', alignItems: 'center'}}>
                <Image
                  source={clock}
                  style={{width: 20, height: 22}}
                  resizeMode={'contain'}
                />
              </View>
              <View style={{width: '42%', flexDirection: 'row'}} />
            </View>
          )
        }
        ListFooterComponent={
          Match.timeline.length == 0 ? null : Match.matchStatus == 'OVER' ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: 90,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
              }}>
              <View
                style={{
                  width: '35%',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-end',
                }}>
                <TextComponent
                  text={'Man of the Match'}
                  style={[styles.title, {fontWeight: '400'}]}
                />
              </View>
              <View style={{width: '30%', alignItems: 'center'}}>
                <ImageBackground
                  source={MOTM}
                  style={{
                    width: 80,
                    height: 80,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={
                      Match.timeline[Match.timeline.length - 1]?.player?.picture
                        ? {
                            uri: Match.timeline[Match.timeline.length - 1]
                              ?.player?.picture,
                          }
                        : MOTM
                    }
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      marginTop: -12,
                    }}
                    resizeMode={'contain'}
                  />
                </ImageBackground>
              </View>
              <View
                style={{
                  width: '35%',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                }}>
                <TextComponent
                  text={
                    Match.timeline[Match.timeline.length - 1]?.player?.fullName
                  }
                  style={[styles.title, {fontWeight: '600', fontSize: 16}]}
                />
              </View>
            </View>
          ) : null
        }
        ListEmptyComponent={
          <View style={{alignItems: 'center'}}>
            <TextComponent
              text={'Match not started yet'}
              style={{alignSelf: 'center'}}
            />
          </View>
        }
      />
    </View>
  );
};

export default TimeLines;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.homeGray,
  },
  MatchView: {
    height: 210,
    backgroundColor: 'rgba(25, 10, 65, 0.55)',
    borderRadius: 20,
    paddingTop: 10,
  },
  MatchViewTeam: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  MatchViewFooter: {
    flex: 1,
    maxHeight: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Matchtitle: {
    fontSize: 13,
    textAlign: 'center',
    color: Colors.White,
  },
  MatchScore: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.White,
    marginTop: 5,
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    color: Colors.textColor,
    marginBottom: 5,
  },
  green: {
    fontSize: 14,
    // textAlign: 'center',
    color: '#00AF66',
  },
  red: {
    fontSize: 14,
    color: Colors.ErrorRed,
  },
});
