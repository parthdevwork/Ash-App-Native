import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  SectionList,
  I18nManager,
} from 'react-native';
import TextComponent from '../../../Components/TextComponent';
import {Colors} from '../../../Config/Colors';
import {useTranslation} from 'react-i18next';
import Tag from '../../../Components/Tag';
import {
  team1,
  team2,
  team3,
  jeddah,
  fcGrinta,
  hajer,
  pattern,
  teamKuwait,
  mam,
  goldmedal,
  silvermedal,
  bronzemedal,
  handshake,
  awards,
  defender2,
  hit,
  unknown,
  CuP,
  team4,
  team5,
  MOTM,
  picture,
} from '../../../Components/Assets';
import TeamCard from '../../../Components/TeamCard';
import TeamModal from '../../../Components/TeamModal';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {HomeMiddleware} from '../../../Store/Middleware/HomeMiddleware';
import {useNavigation} from '@react-navigation/native';

const Matches = () => {
  const {t, i18n} = useTranslation();
  const [isSelected, setisSelected] = useState(1);
  const [open, setopen] = useState(false);
  const Match = useSelector(state => state.HomeReducer.MatchDetail);
  const navigation = useNavigation();
  const Tour = useSelector(state => state.HomeReducer.TourDetails);
  const dispatch = useDispatch();
  const Awards = [
    {
      id: 1,
      name: 'Real Madrid CF',
      image: team1,
      img: goldmedal,
      desc: '1st Place',
    },
    {
      id: 2,
      name: 'FC Barcelona',
      image: team2,
      img: silvermedal,
      desc: '2nd Place',
    },
    {
      id: 3,
      name: 'Liverpool FC',
      image: team3,
      img: bronzemedal,
      desc: '3rd Place',
    },
    {
      id: 4,
      name: 'Real Madrid CF',
      image: team1,
      img: handshake,
      desc: 'Fair Place',
    },
    {
      id: 5,
      name: 'Amelie Butler',
      image: defender2,
      img: hit,
      desc: 'Puskás',
    },
  ];
  // console.log("********", )
const renderConnections = (matches) => {
    const connections = [];

    for (let i = 0; i < matches.length ; i++) {
      connections.push(
        <View key={`connection-${i}`} style={styles.connector}>
          <View style={styles.verticalLine} />
        </View>
      );
    }

    return connections;
  };
  
  const renderAwardsItem = ({item}) => {
    return (
      <View style={styles.card}>
        <View style={styles.heading_view}>
          <Image source={item?.img} style={styles.image} />
          <TextComponent style={styles.text} text={item?.desc} />
        </View>
        <View style={styles.flxDR}>
          <Image source={item?.image} style={styles.image} />
          <TextComponent style={styles.heading} text={item?.name} />
        </View>
      </View>
    );
  };

  const renderMatchDetailCard = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (Match && Match.id == item?.id) {
            navigation.navigate('MatchDetails');
          } else {
            dispatch(HomeMiddleware.getMatchDetails({id: item?.id}))
              .then(() => navigation.navigate('MatchDetails'))
              .catch();
          }
        }}>
        <View style={styles.mini_header}>
          <TextComponent
            style={styles.header_text}
            text={moment(item?.matchDate).format('LLLL')}
          />
        </View>
        <View style={styles.view}>
          <ImageBackground source={pattern} style={styles.MatchView}>
            <View style={styles.MatchViewTeam}>
              <TeamCard
                teamImage={{uri: item?.teamA?.team?.logo}}
                teamName={item?.teamA?.team?.teamName}
              />
              <View
                style={{
                  alignItems: 'center',
                  marginHorizontal: 20,
                  marginTop: -30,
                  width: '35%',
                }}>
                <TextComponent
                  text={
                    item?.matchStatus == 'OVER'
                      ? `${item?.teamA?.score} - ${item?.teamB?.score}`
                      : moment(item?.matchDate).format('hh:mm A')
                  }
                  style={[
                    styles.MatchScore,
                    {fontSize: !item?.matchStatus == 'OVER' ? 17 : 24},
                  ]}
                />
              </View>
              <TeamCard
                teamImage={{uri: item?.teamB?.team?.logo}}
                teamName={item?.teamB?.team?.teamName}
              />
            </View>
            {item?.matchStatus == 'OVER' ? (
              <View style={styles.MatchViewFooter}>
                <TextComponent
                  text={t('Man of the Match')}
                  style={styles.Matchtitle}
                />
                <ImageBackground source={MOTM} style={styles.mam}>
                  <Image
                    source={
                      item?.timeline[item?.timeline?.length - 1].player?.picture
                        ? {
                            uri: item?.timeline[item?.timeline?.length - 1]
                              ?.player?.picture,
                          }
                        : picture
                    }
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 40,
                      marginTop: -7,
                    }}
                    resizeMode={'contain'}
                  />
                </ImageBackground>
                <TextComponent
                  text={
                    item?.timeline[item?.timeline?.length - 1]?.player?.fullName
                  }
                  style={[
                    styles.Matchtitle,
                    {fontWeight: 'bold', marginRight: 10},
                  ]}
                />
              </View>
            ) : null}
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.tag_container}>
        <Tag
          TextStyle={{marginVertical: I18nManager.isRTL ? 0 : 5}}
          width={'48%'}
          text={t('List')}
          backgroundColor={Colors.White}
          Active={1 == isSelected}
          onPress={() => setisSelected(1)}
        />
        <Tag
          TextStyle={{marginVertical: I18nManager.isRTL ? 0 : 5}}
          width={'48%'}
          text={t('Fixtures')}
          backgroundColor={Colors.White}
          Active={2 == isSelected}
          onPress={() => setisSelected(2)}
        />
      </View>
      <ScrollView>
        <View style={styles.terms_view}>
          {isSelected == 1 ? (
            // --------------------------- LIST VIEW ------------------------------
            <View style={styles.sub_container}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={Tour?.matches}
                renderItem={renderMatchDetailCard}
                keyExtractor={item => item?.id}
                ListEmptyComponent={
                  <TextComponent
                    text={t('No Match Found')}
                    style={{alignSelf: 'center'}}
                  />
                }
              />
            </View>
          ) : (
            // --------------------------- FIXTURES VIEW ------------------------------

            // //  ------  Original Card Having All Texts --------
            //     <View style={styles.fixture_box}>
            //         <View style={styles.fixture_images_view}>
            //             <View style={styles.fixture_image_subview}>
            //                 <Image source={team4} style={styles.fixture_image} />
            //                 <TextComponent text={'2'} />
            //             </View>
            //             {/* <Image source={CuP} style={[styles.fixture_image, {width: 55, height: 55}]} /> */}
            //             <View style={styles.fixture_image_subview}>
            //                 <Image source={team5} style={styles.fixture_image} />
            //                 <TextComponent text={'0'} />
            //             </View>
            //         </View>
            //         <TextComponent text={'8 Dec 22'} style={styles.fixture_text} />
            //     </View>

            //   ------------------------  Temporary Placed Cards ---------------------------------
            <>
              {Tour.fixture ? (
                Tour.fixture.stages?.map((item, index) => {
                 
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        marginBottom: 20,
                      }}>
                      {item?.matches.map((item, index) => {
                        return (
                          <View style={styles.fixture_box}>
                            <View style={styles.fixture_images_view}>
                              <View style={styles.fixture_image_subview}>
                                {item?.match?.teamA?.team?.logo ? (
                                  <Image
                                    source={{
                                      uri: item?.match?.teamA?.team?.logo,
                                    }}
                                    style={[styles.fixture_image]}
                                  />
                                ) : (
                                  <Image
                                    source={unknown}
                                    style={styles.fixture_image}
                                  />
                                )}
                                <TextComponent
                                  text={
                                    item?.match?.teamA?.score
                                      ? item?.match?.teamA?.score
                                      : '0'
                                  }
                                />
                              </View>
                              <View style={styles.fixture_image_subview}>
                               {item?.match?.teamB?.team?.logo ?<Image
                                  source={{uri: item?.match?.teamB?.team?.logo}}
                                  style={styles.fixture_image}
                                />: (
                                  <Image
                                    source={unknown}
                                    style={styles.fixture_image}
                                  />
                                )}
                                <TextComponent
                                  text={
                                    item?.match?.teamB?.score
                                      ? item?.match?.teamB?.score
                                      : '0'
                                  }
                                />
                              </View>
                            </View>

                            {/* <TextComponent
                              text={moment(item?.matchDate).format('ll')}
                              style={styles.fixture_text}
                            /> */}
                          </View>
                        );
                      })}
                       {/* {renderConnections(item?.matches)} */}
                    </View>
                  );
                })
              ) : (
                <></>
              )}

              {/* <View
                  style={{
                    marginTop: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                  }}>
                  <View style={styles.fixture_box}>
                    <View style={styles.fixture_images_view}>
                      <View style={styles.fixture_image_subview}>
                        <Image source={unknown} style={styles.fixture_image} />
                      </View>
                      <View style={styles.fixture_image_subview}>
                        <Image source={unknown} style={styles.fixture_image} />
                      </View>
                    </View>
                    <TextComponent
                      text={'8 Dec 22'}
                      style={styles.fixture_text}
                    />
                  </View>

                  <View style={styles.fixture_box}>
                    <View style={styles.fixture_images_view}>
                      <View style={styles.fixture_image_subview}>
                        <Image source={unknown} style={styles.fixture_image} />
                      </View>
                      <View style={styles.fixture_image_subview}>
                        <Image source={fcGrinta} style={styles.fixture_image} />
                      </View>
                    </View>
                    <TextComponent
                      text={'8 Dec 22'}
                      style={styles.fixture_text}
                    />
                  </View>
                </View>

                <View
                  style={[
                    styles.fixture_box,
                    { alignSelf: 'center', marginTop: 20 },
                  ]}>
                  <View style={styles.fixture_images_view}>
                    <View style={styles.fixture_image_subview}>
                      <Image source={unknown} style={styles.fixture_image} />
                    </View>
                    <View style={styles.fixture_image_subview}>
                      <Image source={unknown} style={styles.fixture_image} />
                    </View>
                  </View>
                  <TextComponent
                    text={'8 Dec 22'}
                    style={styles.fixture_text}
                  />
                </View>

                <View
                  style={{
                    marginTop: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                  }}>
                  <View style={styles.fixture_box}>
                    <View style={styles.fixture_images_view}>
                      <View style={styles.fixture_image_subview}>
                        <Image source={unknown} style={styles.fixture_image} />
                        <TextComponent text={'2'} />
                      </View>
                      <View style={styles.fixture_image_subview}>
                        <Image source={unknown} style={styles.fixture_image} />
                        <TextComponent text={'0'} />
                      </View>
                    </View>
                  </View>

                  <View style={styles.fixture_box}>
                    <View style={styles.fixture_images_view}>
                      <View style={styles.fixture_image_subview}>
                        <Image source={unknown} style={styles.fixture_image} />
                        <TextComponent text={'2'} />
                      </View>
                      <View style={styles.fixture_image_subview}>
                        <Image source={unknown} style={styles.fixture_image} />
                        <TextComponent text={'0'} />
                      </View>
                    </View>
                  </View>
                </View>

                <View
                  style={[
                    styles.fixture_box,
                    { alignSelf: 'center', marginTop: 20 },
                  ]}>
                  <View style={styles.fixture_images_view}>
                    <View style={styles.fixture_image_subview}>
                      <Image source={fcGrinta} style={styles.fixture_image} />
                      <TextComponent text={'2'} />
                    </View>
                    <View style={styles.fixture_image_subview}>
                      <Image source={jeddah} style={styles.fixture_image} />
                      <TextComponent text={'0'} />
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  style={[
                    styles.fixture_box,
                    { alignSelf: 'center', width: 130, marginTop: 20 },
                  ]}
                  onPress={() => setopen(true)}>
                  <View style={styles.fixture_images_view}>
                    <View style={styles.fixture_image_subview}>
                      <Image source={fcGrinta} style={styles.fixture_image} />
                      <TextComponent text={'2'} />
                    </View>
                    <Image
                      source={CuP}
                      style={[styles.fixture_image, { width: 45, height: 45 }]}
                    />
                    <View style={styles.fixture_image_subview}>
                      <Image source={jeddah} style={styles.fixture_image} />
                      <TextComponent text={'0'} />
                    </View>
                  </View>
                </TouchableOpacity>

                <View
                  style={[
                    styles.fixture_box,
                    { alignSelf: 'center', marginVertical: 20 },
                  ]}>
                  <View style={styles.fixture_images_view}>
                    <View style={styles.fixture_image_subview}>
                      <Image source={fcGrinta} style={styles.fixture_image} />
                      <TextComponent text={'2'} />
                    </View>
                    <View style={styles.fixture_image_subview}>
                      <Image source={jeddah} style={styles.fixture_image} />
                      <TextComponent text={'0'} />
                    </View>
                  </View>
                </View>  */}
            </>
          )}
        </View>

        <TeamModal
          visible={open}
          onClose={() => setopen(false)}
          buttonText={'Close'}
          height={'80%'}
          children={
            <View style={{flex: 1}}>
              <View style={styles.modal_header}>
                <Image source={awards} style={styles.modal_image} />
                <TextComponent text={'Awards & Winners'} />
              </View>
              <FlatList
                data={Awards}
                keyExtractor={item => item?.id}
                showsVerticalScrollIndicator={false}
                renderItem={renderAwardsItem}
              />
            </View>
          }
        />
      </ScrollView>
    </View>
  );
};

export default Matches;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.homeGray,
  },
  sub_container: {
    alignSelf: 'center',
    width: '90%',
  },
  mini_header: {
    width: '100%',
    backgroundColor: Colors.light_opacity,
    borderRadius: 5,
    alignSelf: 'center',
    padding: 5,
    alignItems: 'center',
    marginVertical: 15,
  },
  header_text: {
    color: Colors.Blue,
    fontSize: 12,
  },
  MatchView: {
    width: '100%',
    height: 150,
    backgroundColor: Colors.White,
    borderRadius: 20,
    marginBottom: 5,
    elevation: 1,
  },
  MatchViewTeam: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  MatchScore: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#190A41',
    marginTop: 5,
    textAlign: 'center',
  },
  Matchtitle: {
    fontSize: 13,
    textAlign: 'center',
    color: Colors.Blue,
  },
  MatchViewFooter: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.Light_gray,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mam: {
    width: 70,
    height: 70,
    position: 'absolute',
    left: '45%',
    top: -35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal_header: {
    alignItems: 'center',
    padding: 15,
  },
  modal_image: {
    width: 60,
    height: 60,
    margin: 3,
    resizeMode: 'contain',
  },
  heading_view: {
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: '#F5F5F5',
    padding: 12,
  },
  card: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    backgroundColor: Colors.Light_gray,
    alignItems: 'center',
    width: '90%',
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  text: {
    color: '#666666',
    fontSize: 12,
  },
  heading: {
    color: Colors.Blue,
    fontSize: 16,
    width: '70%',
  },
  flxDR: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '70%',
  },
  fixture_box: {
    // flex: 1,
    width: 70,
    paddingVertical: 8,
    paddingHorizontal: 4,
    backgroundColor: Colors.White,
    borderRadius: 20,
  },
  fixture_images_view: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  fixture_image_subview: {
    alignItems: 'center',
  },
  fixture_image: {
    width: 25,
    height: 27,
    resizeMode: 'center',
    margin: 5,
    borderRadius: 50,
  },
  fixture_text: {
    fontSize: 8,
    textAlign: 'center',
    margin: 3,
  },
  tag_container: {
    flexDirection: 'row',
    height: 50,
    marginBottom: 5,
    width: '100%',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  connector: {
    flexDirection: 'column',
   
  },
  verticalLine: {
    height: 20, 
    width: 1,   
    backgroundColor: 'black', 
  },
});




