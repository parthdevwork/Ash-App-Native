import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  SectionList,
  I18nManager,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../Config/Colors';
import {TextComponent} from '../../Components';
import {
  Arrows,
  FieldPic,
  FootballGround,
  Lineup1,
  Lineup2,
  picture,
  Player1,
  Player2,
  Player3,
} from '../../Components/Assets';
import TagLabel from '../../Components/TagLabel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

const Lineup = () => {
  const [active, setactive] = useState(0);
  const Match = useSelector(state => state.HomeReducer.MatchDetail);

  const layout433 = {
    FWD: [
      {
        player: null,
        style: {marginTop: 50, marginLeft: 20},
        code: 'LW',
      },
      {
        player: null,
        style: {marginTop: 30, marginHorizontal: 35},
        code: 'ST',
      },

      {
        player: null,
        style: {marginTop: 50, marginRight: 20},
        code: 'RW',
      },
    ],
    MID: [
      {
        player: null,
        style: null,
        code: 'CM',
      },
      {
        player: null,
        style: {marginTop: 20, marginHorizontal: 30},
        code: 'DM',
      },
      {
        player: null,
        style: null,
        code: 'CM',
      },
    ],
    DEF: [
      {
        player: null,
        style: null,
        code: 'LB',
      },
      {
        player: null,
        style: {marginHorizontal: 30},
        code: 'CB',
      },
      {
        player: null,
        style: {marginRight: 30},
        code: 'CB',
      },
      {
        player: null,
        style: null,
        code: 'RB',
      },
    ],
    GKC: [
      {
        player: null,
        style: {marginBottom: 40},
        code: 'GK',
      },
    ],
  };
  const renderTeamcontent0 = () => {
    return (
      <View>
        {/* <TextComponent text={Match?.teamA?.team?.lineUp?.key} style={styles.layouttxt} /> */}
        <ImageBackground
          source={{uri: Match?.teamA?.team?.lineUp}}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
          resizeMode={'stretch'}>
          {/* {Match?.teamA?.team?.lineUp?.layout
            ? Object.keys(Match?.teamA?.team.lineUp.layout).map(position => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: '100%',
                }}>
                {Match?.teamA?.team.lineUp.layout[position].map((item, index) => {
                  // let lastname = item?.player?.name?.split(' ');
                  return (
                    <TouchableOpacity
                      disabled
                      key={index.toString()}
                      style={{
                        alignItems: 'center',
                        opacity: 1,
                        ...item.style,
                      }}>
                      <View>
                        <Image
                          source={
                            item?.player?.picture
                              ? { uri: item?.player?.picture }
                              : FieldPic
                          }
                          resizeMode={'contain'}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 100,
                            borderColor: Colors.Dark_Blue,
                            borderWidth: 0.5,
                          }}
                        />
                        {item.player ? (
                          <View
                            style={{
                              borderRadius: 10,
                              paddingHorizontal: 5,
                              position: 'absolute',
                              backgroundColor: Colors.SuccessGreen,
                              right: 0,
                            }}>
                            <TextComponent
                              text={
                                item?.player?.statistics.shirtNumber
                              }
                              style={{
                                alignSelf: 'center',
                                fontWeight: '400',
                                fontSize: 12,
                                color: Colors.textColor,
                                marginBottom: 2,
                              }}
                            />
                          </View>
                        ) : null}
                      </View>
                      <TextComponent
                        text={
                          item.player?.features.inGamePosition
                            .shortPosition
                            ? item.player?.features.inGamePosition
                              .shortPosition
                            : item.code
                        }
                        style={{
                          alignSelf: 'center',
                          fontWeight: '400',
                          fontSize: 14,
                          color: Colors.White,
                          marginBottom: 2,
                        }}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))
            : null} */}
        </ImageBackground>

        {/* <SectionList
          style={{marginTop: 20}}
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItems}
          renderSectionHeader={({section: {title}}) => (
            <View
              style={{
                backgroundColor: '#E0E0E0',
                padding: 10,
                borderRadius: 10,
                marginHorizontal: 20,
              }}>
              <TextComponent
                text={title}
                style={[
                  styles.layouttxt,
                  {
                    alignSelf: 'flex-start',
                    marginBottom: 0,
                    color: Colors.textColor,
                  },
                ]}
              />
            </View>
          )}
        /> */}
      </View>
    );
  };
  const renderTeamcontent1 = () => {
    return (
      <View>
        {/* <TextComponent text={Match?.teamB?.team?.lineUp?.key} style={styles.layouttxt} /> */}
        <ImageBackground
          source={{uri: Match?.teamB?.team?.lineUp}}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
          resizeMode={'stretch'}>
          {/* {Match?.teamB?.team?.lineUp?.layout
            ? Object.keys(Match?.teamB?.team.lineUp.layout).map(position => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: '100%',
                }}>
                {Match?.teamA?.team.lineUp.layout[position].map((item, index) => {
                  // let lastname = item?.player?.name?.split(' ');
                  return (
                    <TouchableOpacity
                      disabled
                      key={index.toString()}
                      style={{
                        alignItems: 'center',
                        opacity: 1,
                        ...item.style,
                      }}>
                      <View>
                        <Image
                          source={
                            item?.player?.picture
                              ? { uri: item?.player?.picture }
                              : FieldPic
                          }
                          resizeMode={'contain'}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 100,
                            borderColor: Colors.Dark_Blue,
                            borderWidth: 0.5,
                          }}
                        />
                        {item.player ? (
                          <View
                            style={{
                              borderRadius: 10,
                              paddingHorizontal: 5,
                              position: 'absolute',
                              backgroundColor: Colors.SuccessGreen,
                              right: 0,
                            }}>
                            <TextComponent
                              text={
                                item?.player?.statistics.shirtNumber
                              }
                              style={{
                                alignSelf: 'center',
                                fontWeight: '400',
                                fontSize: 12,
                                color: Colors.textColor,
                                marginBottom: 2,
                              }}
                            />
                          </View>
                        ) : null}
                      </View>
                      <TextComponent
                        text={
                          item.player?.features.inGamePosition
                            .shortPosition
                            ? item.player?.features.inGamePosition
                              .shortPosition
                            : item.code
                        }
                        style={{
                          alignSelf: 'center',
                          fontWeight: '400',
                          fontSize: 14,
                          color: Colors.White,
                          marginBottom: 2,
                        }}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))
            : null
          } */}
        </ImageBackground>

        {/* <SectionList
          style={{marginTop: 20}}
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItems}
          renderSectionHeader={({section: {title}}) => (
            <View
              style={{
                backgroundColor: '#E0E0E0',
                padding: 10,
                borderRadius: 10,
                marginHorizontal: 20,
              }}>
              <TextComponent
                text={title}
                style={[
                  styles.layouttxt,
                  {
                    alignSelf: 'flex-start',
                    marginBottom: 0,
                    color: Colors.textColor,
                  },
                ]}
              />
            </View>
          )}
        /> */}
      </View>
    );
  };

  const renderItems = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.Menu,
          {
            borderBottomColor: '#E0E0E0',
            borderBottomWidth: item.type == 'Bench' ? 1 : 0,
          },
        ]}>
        <Image source={item.image} style={styles.icon} resizeMode={'contain'} />
        {item.number ? (
          <TextComponent
            text={item.number}
            style={{
              color: Colors.textColor,
              fontSize: 14,
              marginHorizontal: 10,
              fontWeight: '600',
              width: 20,
              textAlign: 'center',
            }}
          />
        ) : null}
        <View style={{marginLeft: item.type == 'Coaching' ? 20 : 0, flex: 1}}>
          {item.type == 'Substitutes' ? (
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextComponent
                  text={item.number1}
                  style={{
                    color: Colors.textColor,
                    fontSize: 14,
                    marginHorizontal: 10,
                    fontWeight: '600',
                    width: 20,
                    textAlign: 'center',
                  }}
                />
                <TextComponent text={item.name1} style={styles.green} />
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextComponent
                  text={item.number2}
                  style={{
                    color: Colors.textColor,
                    fontSize: 14,
                    marginHorizontal: 10,
                    fontWeight: '600',
                    width: 20,
                    textAlign: 'center',
                  }}
                />
                <TextComponent text={item.name2} style={styles.red} />
              </View>
            </View>
          ) : (
            <TextComponent text={item.name} style={styles.MenuText} />
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            // minWidth: 60,
          }}>
          {item.code ? (
            <TagLabel
              text={item.code}
              bR={5}
              pH={5}
              TextStyle={{fontSize: 13, marginVertical: 2, fontWeight: '600'}}
            />
          ) : null}
          {item.codeimage ? (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={item.codeimage}
                style={{width: 20, height: 22, marginRight: 5}}
                resizeMode={'contain'}
              />
              <TextComponent
                text={'90 + 4’'}
                style={[
                  styles.MenuText,
                  {color: Colors.ErrorRed, fontWeight: '600'},
                ]}
              />
            </View>
          ) : null}
          <Ionicons
            style={{marginLeft: 10}}
            name={!I18nManager.isRTL ? 'chevron-forward' : 'chevron-back'}
            size={24}
            color={Colors.textColor}
          />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      style={styles.container}>
      <View style={styles.tab}>
        <TouchableOpacity
          onPress={() => setactive(0)}
          style={[
            styles.tableft,
            {
              backgroundColor: active == 0 ? Colors.Dark_Blue : Colors.White,
              borderWidth: active == 0 ? 0 : 1,
            },
          ]}>
          <TextComponent
            text={Match?.teamA?.team?.teamName}
            style={[
              styles.text,
              {
                color: active == 0 ? Colors.SuccessGreen : Colors.Dark_Blue,
              },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setactive(1)}
          style={[
            styles.tabright,
            {
              backgroundColor: active == 1 ? Colors.Dark_Blue : Colors.White,
              borderWidth: active == 1 ? 0 : 1,
            },
          ]}>
          <TextComponent
            text={Match?.teamB?.team?.teamName}
            style={[
              styles.text,
              {
                color: active == 1 ? Colors.SuccessGreen : Colors.Dark_Blue,
              },
            ]}
          />
        </TouchableOpacity>
      </View>
      <View>{active == 0 ? renderTeamcontent0() : renderTeamcontent1()}</View>
    </ScrollView>
  );
};

export default Lineup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.homeGray,
  },
  tab: {
    alignSelf: 'center',
    backgroundColor: Colors.White,
    // width: 300,
    // height: 40,
    marginVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    marginVertical: 5,
    textAlign: 'center',
    fontWeight: '400',
  },
  tableft: {
    width: 150,
    height: 40,
    borderColor: '#392276',
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabright: {
    width: 150,
    height: 40,
    borderColor: '#392276',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  layouttxt: {
    fontWeight: '600',
    marginBottom: -10,
    color: Colors.textColor,
    fontSize: 16,
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
    fontWeight: '700',
  },

  icon: {
    width: 40,
    height: 40,
    borderColor: Colors.SuccessGreen,
    borderRadius: 20,
    borderWidth: 1,
  },

  image: {width: 95, height: 95, borderRadius: 100},
  green: {
    fontSize: 14,
    // textAlign: 'center',
    color: '#00AF66',
  },
  red: {
    fontSize: 14,
    // textAlign: 'center',
    color: Colors.ErrorRed,
  },
});
