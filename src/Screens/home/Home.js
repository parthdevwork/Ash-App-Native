import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  RefreshControl,
  Platform,
  I18nManager,
  Linking,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../../Config/Colors';
import {
  banner,
  calender,
  createLogo,
  Female,
  league,
  Male,
  pattern,
  picture,
  Playbtn,
  rank,
  RealM,
  soccer,
  Tbanner,
  Videobanner,
  PCenter,
  PLeft,
  PRight,
} from '../../Components/Assets';
import InputText from '../../Components/InputText';
import TextComponent from '../../Components/TextComponent';
import TeamCard from '../../Components/TeamCard';
import TagLabel from '../../Components/TagLabel';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import Modal from '../../Components/Modal';
import {ProgressBar} from 'react-native-paper';
import {AuthMiddleware} from '../../Store/Middleware/AuthMiddleware';
import {HomeMiddleware} from '../../Store/Middleware/HomeMiddleware';
import Skeleton from '../../Components/Skeleton';
import moment from 'moment';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HomeAction} from '../../Store/Actions/HomeAction';
import Image from '../../Components/Image';

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.AuthReducer.user);
  const DashboardData = useSelector(state => state.HomeReducer.Dashboard);
  const Match = useSelector(state => state.HomeReducer.MatchDetail);
  const Tour = useSelector(state => state.HomeReducer.TourDetails);
  const navigation = useNavigation();
  const {t, i18n} = useTranslation();
  const [IsOpen, setIsOpen] = useState(false);
  const [levelup, setlevelup] = useState(false);
  const [Lineup, setLineup] = useState(false);
  const [refreshing, setrefreshing] = useState(false);
  const insets = useSafeAreaInsets();
  let progress = [
    {
      id: 1,
      image: PLeft,
    },
    {
      id: 2,
      image: PCenter,
    },
    {
      id: 3,
      image: PCenter,
    },
    {
      id: 4,
      image: PCenter,
    },
    {
      id: 5,
      image: PCenter,
    },
    {
      id: 6,
      image: PCenter,
    },
    {
      id: 7,
      image: PCenter,
    },
    {
      id: 8,
      image: PCenter,
    },
    {
      id: 9,
      image: PCenter,
    },

    {
      id: 10,
      image: PRight,
    },
  ];
  const shouldShowLineupModal = user.myMatch?.id && user.isLineUp;

  useEffect(() => {
    setLineup(shouldShowLineupModal)
    if (user?.role != 'GUEST') dispatch(AuthMiddleware.GetUserData());
    dispatch(HomeMiddleware.getDashboard());
    if (user?.role != 'GUEST') fetch();
  }, []);

  const fetch = () => {
    if (user?.level?.isLevelUp)
      setTimeout(() => {
        setIsOpen(user?.level?.isLevelUp);
      }, 2000);
  };

  const onRefresh = () => {
    setrefreshing(true);
    dispatch(HomeMiddleware.getDashboard());
    dispatch(HomeAction.getMatchDetail(null));
    dispatch(HomeAction.getTourDetail(null));
    setrefreshing(false);
  };

  const renderBanner = ({item, index}) => {
    return DashboardData ? (
      <TouchableOpacity
        onPress={() => (item?.url ? Linking.openURL(item?.url) : null)}
        style={{marginRight: 15, marginLeft: index == 0 ? 25 : 0}}>
        <Image
          source={item?.banner ? {uri: item?.banner} : banner}
          style={styles.banner}
          resizeMode={'stretch'}
        />
      </TouchableOpacity>
    ) : (
      <Skeleton
        radius={20}
        styles={{width: 300, marginRight: 15, marginLeft: index == 0 ? 25 : 0}}
        style={{
          height: 145,
          width: 290,
          borderRadius: 20,
        }}
      />
    );
  };

  const renderMatches = ({item, index}) => {
    return DashboardData ? (
      <TouchableOpacity
        onPress={() => {
          if (Match && Match.id == item.id) {
            navigation.navigate('MatchDetails');
          } else {
            dispatch(HomeMiddleware.getMatchDetails({id: item?.id}))
              .then(() => navigation.navigate('MatchDetails'))
              .catch();
          }
        }}
        style={{marginRight: 15, marginLeft: index == 0 ? 25 : 0}}>
        <ImageBackground source={pattern} style={styles.MatchView}>
          <View style={styles.MatchViewTeam}>
            <TeamCard
              teamImage={
                item?.teamA?.team?.logo
                  ? {uri: item?.teamA?.team?.logo}
                  : createLogo
              }
              teamName={item?.teamA?.team?.teamName}
            />
            <View
              style={{
                alignItems: 'center',
                marginHorizontal: 5,
                marginTop: I18nManager.isRTL ? -10 : -30,
              }}>
              <TagLabel
                text={item?.matchStatus}
                backgroundColor={
                  item?.matchStatus == 'LIVE'
                    ? Colors.SuccessGreen
                    : Colors.Light_gray
                }
              />
              <TextComponent
                text={`${item?.teamA?.score} - ${item?.teamB?.score}`}
                style={styles.MatchScore}
              />
            </View>
            <TeamCard
              teamImage={
                item?.teamB?.team?.logo
                  ? {uri: item?.teamB?.team?.logo}
                  : createLogo
              }
              teamName={item?.teamB?.team?.teamName}
            />
          </View>
          <View style={styles.MatchViewFooter}>
            <TextComponent
              text={item?.matchLocation}
              style={styles.Matchtitle}
              numberOfLines={1}
            />
          </View>
        </ImageBackground>
      </TouchableOpacity>
    ) : (
      <Skeleton
        radius={20}
        styles={{width: 300, marginRight: 15, marginLeft: index == 0 ? 25 : 0}}
        style={{
          height: 145,
          width: 290,
          borderRadius: 20,
        }}
      />
    );
  };

  const renderTounaments = ({item, index}) => {
    return DashboardData ? (
      <>
        {item.isActive === true ? (
          <TouchableOpacity
            style={{marginRight: 15, marginLeft: index == 0 ? 25 : 0}}
            onPress={() => {
              if (Tour && Tour.id == item.id) {
                if (item?.status == 'UPCOMING') {
                  navigation.navigate('TournamentDetails');
                } else {
                  navigation.navigate('TournamentDetailsStart');
                }
              } else {
                dispatch(HomeMiddleware.getTourDetails({id: item?.id}))
                  .then(() => {
                    if (item?.status == 'UPCOMING') {
                      navigation.navigate('TournamentDetails');
                    } else {
                      navigation.navigate('TournamentDetailsStart');
                    }
                  })
                  .catch();
              }
            }}>
            <View style={styles.TourView}>
              <Image
                source={item?.thumbnail ? {uri: item?.thumbnail} : Tbanner}
                style={styles.TBanner}
                resizeMode={'cover'}
              />
              <View style={styles.Theader}>
                <TagLabel text={t(item?.status)} />
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TagLabel
                    text={t(item?.ageGroup)}
                    pH={10}
                    backgroundColor={Colors.White}
                  />
                  <Image
                    source={item?.isForMales ? Male : Female}
                    style={{
                      width: 25,
                      height: 25,
                      marginLeft: 5,
                      borderRadius: 25,
                    }}
                    resizeMode={'contain'}
                  />
                </View>
              </View>
              <View style={styles.TourViewFooter}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 3,
                  }}>
                  <Image
                    source={league}
                    style={{width: 20, height: 20, marginRight: 10}}
                    resizeMode={'contain'}
                  />
                  <TextComponent text={item?.title} style={styles.Tourtitle} />
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={calender}
                    style={{width: 20, height: 20, marginRight: 10}}
                    resizeMode={'contain'}
                  />
                  <TextComponent
                    text={`${moment(item?.startsFrom).format(
                      'DD MMM',
                    )} - ${moment(item?.endsAt).format('DD MMM')}`}
                    style={styles.Tourtitle}
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={{marginHorizontal: 10}}>{null}</View>
        )}
      </>
    ) : (
      <Skeleton
        radius={20}
        styles={{width: 230, marginRight: 15, marginLeft: index == 0 ? 25 : 0}}
        style={{
          width: 220,
          height: 145,
          borderRadius: 20,
        }}
      />
    );
  };

  const renderVideos = ({item, index}) => {
    return DashboardData ? (
      <TouchableOpacity
        style={{marginRight: 15, marginLeft: index == 0 ? 25 : 0}}
        onPress={() => navigation.navigate('VideoScreen', {url: item?.url})}>
        <View style={styles.TourView}>
          <Image
            source={item?.thumbnail ? {uri: item?.thumbnail} : Videobanner}
            style={styles.TBanner}
            resizeMode={'cover'}
          />
          <View style={[styles.Theader, {top: 35}]}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('VideoScreen', {url: item?.url})
              }>
              <Image
                source={Playbtn}
                style={{width: 25, height: 25, borderRadius: 25}}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.TourViewFooter}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 3,
              }}>
              <Image
                source={league}
                style={{width: 20, height: 20, marginRight: 10}}
                resizeMode={'contain'}
              />
              <TextComponent
                text={item?.tournament?.title}
                style={styles.Tourtitle}
              />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={calender}
                style={{width: 20, height: 20, marginRight: 10}}
                resizeMode={'contain'}
              />
              <TextComponent
                text={`${moment(item?.videoDate).format('LL')}`}
                style={styles.Tourtitle}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    ) : (
      <Skeleton
        radius={20}
        styles={{width: 230, marginRight: 15, marginLeft: index == 0 ? 25 : 0}}
        style={{
          width: 220,
          height: 145,
          borderRadius: 20,
        }}
      />
    );
  };

  const renderProgress = ({item, index}) => {
    return (
      <View style={{marginBottom: 10}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            marginBottom: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextComponent
              text={item.key}
              style={{
                fontSize: 16,
                color: '#666666',
                textTransform: 'capitalize',
              }}
            />
            {item.extra ? (
              <TextComponent
                text={item.extra}
                style={{
                  fontSize: 16,
                  marginLeft: 5,
                  fontWeight: '600',
                  color: item.extra.includes('-') ? '#FF0000' : '#00FF94',
                }}
              />
            ) : null}
          </View>

          <TextComponent
            text={item.level}
            style={{fontSize: 16, color: Colors.textColor}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 5,
            marginHorizontal: 5,
          }}>
          {progress.map((items, index) => {
            return (
              <Image
                source={items.image}
                style={{
                  width: '10%',
                  height: 13,
                  tintColor:
                    item.progress >= items.id
                      ? Colors.Dark_Blue
                      : Colors.Light_gray,
                }}
                resizeMode={'stretch'}
              />
            );
          })}
        </View>
      </View>
    );
  };

  const renderProgressModal = () => {
    return (
      <Modal
        animationType={'fade'}
        visible={IsOpen}
        close={true}
        text={t('Done')}
        OnClose={() => {
          setIsOpen(false);
          setlevelup(true);
        }}>
        <View
          style={{
            height: 420,
            width: '100%',
            padding: 20,
          }}>
          <TextComponent text={'Your Attributes'} style={styles.Mtitle} />
          <TextComponent
            text={'This new level of your attributes'}
            style={{fontSize: 16, color: '#444444', textAlign: 'center'}}
          />

          <FlatList
            style={{marginTop: 15}}
            showsVerticalScrollIndicator={false}
            // contentContainerStyle={{marginLeft:20 , mar}}
            data={
              user?.level?.history[user?.level?.history.length - 1]?.attributes
            }
            renderItem={renderProgress}
          />
        </View>
      </Modal>
    );
  };

  const renderLevelModal = () => {
    return (
      <Modal
        animationType={'fade'}
        visible={levelup}
        close={true}
        text={t('Done')}
        OnClose={() => {
          setlevelup(false);
        }}>
        <View
          style={{
            height: 250,
            width: '100%',
            padding: 20,
            alignItems: 'center',
          }}>
          <Image
            source={rank}
            style={{
              width: 85,
              height: 85,
              marginBottom: 10,
            }}
            resizeMode={'contain'}
          />
          <TextComponent text={'Congratulations'} style={styles.Mtitle} />
          <TextComponent
            text={'You have leveled up to'}
            style={{fontSize: 16, color: '#444444', textAlign: 'center'}}
          />

          <TextComponent
            text={'Veteran'}
            style={[styles.MatchScore, {fontSize: 38, marginTop: 10}]}
          />
        </View>
      </Modal>
    );
  };

  const renderLineupModal = () => {
    return (
      <Modal
        animationType={'fade'}
        visible={Lineup}
        close={true}
        text={t('Choose my Lineup')}
        styles={{backgroundColor: '#00FF94'}}
        textStyle={{color: Colors.Dark_Blue, fontWeight: '600',fontSize:17}}
        OnClose={() => {
          setLineup(false), navigation.navigate('Lineups');
        }}>
        <View
          style={{
            height: 350,
            width: '100%',
            padding: 20,
            alignItems: 'center',
          }}>
          <Image
            source={soccer}
            style={{
              width: 85,
              height: 85,
              marginBottom: 10,
            }}
            resizeMode={'contain'}
          />
          <TextComponent text={t('Lineup')} style={styles.Mtitle} />
          <TextComponent
            text={'Choose the lineup for the next match'}
            style={{fontSize: 16, color: '#444444', textAlign: 'center'}}
          />

          <View style={styles.MatchViewTeam}>
            <TeamCard
              teamImage={{uri: user.myMatch?.teamA?.team?.logo}}
              teamName={user.myMatch?.teamA?.team?.teamName}
            />
            <View
              style={{
                alignItems: 'center',
                marginHorizontal: 20,
                marginTop: -10,
              }}>
              <TextComponent text={'VS'} style={styles.MatchScore} />
            </View>
            <TeamCard
              teamImage={{uri: user.myMatch?.teamB?.team?.logo}}
              teamName={user.myMatch?.teamB?.team?.teamName}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              setLineup(false);
            }}>
            <TextComponent
              text={t('I will do that later')}
              style={[styles.Mtitle, {color: Colors.Dark_Blue}]}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: Platform.OS == 'ios' ? (insets.top != 20 ? 35 : 10) : 0,
        },
      ]}>
      <View style={styles.header}>
        <TouchableOpacity
          disabled={user?.role == 'GUEST' ? true : false}
          onPress={() => navigation.navigate('Profile')}>
          <Image
            source={
              user?.picture
                ? {
                    uri: user?.picture,
                  }
                : picture
            }
            style={styles.profile_img}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
        <View style={{width: '80%'}}>
          <InputText
            // value={\}
            style={{height: 40, color: '#000'}}
            iconname={'search'}
            iconColor={'#B1B1B1'}
            sidebar={true}
            onChangeText={val => console.log(val)}
            placeholder={t('Search')}
          />
        </View>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}>
        <View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            // contentContainerStyle={{marginLeft:20 , mar}}
            data={DashboardData ? DashboardData.banners : [1, 2, 3, 4, 5, 6, 7]}
            renderItem={renderBanner}
            ListEmptyComponent={
              <TextComponent
                text={t('No Banner Available')}
                style={styles.notfound}
              />
            }
          />
        </View>

        <View style={{marginVertical: 20}}>
          <View style={styles.headingSection}>
            <TextComponent text={t("Today's Matches")} style={styles.heading} />
            {/* <TouchableOpacity disabled={user?.role == 'GUEST' ? true : false}>
              <TextComponent text={t('View All >')} style={styles.viewall} />
            </TouchableOpacity> */}
          </View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            // contentContainerStyle={{marginLeft:20 , mar}}
            data={DashboardData ? DashboardData.matches : [1, 2, 3, 4, 5, 6, 7]}
            renderItem={renderMatches}
            ListEmptyComponent={
              <TextComponent
                text={t('No Match Available')}
                style={styles.notfound}
              />
            }
          />
        </View>

        <View>
          <View style={styles.headingSection}>
            <TextComponent text={t('Tournaments')} style={styles.heading} />
            <TouchableOpacity onPress={() => navigation.navigate('Tounaments')}>
              <TextComponent text={t('View All >')} style={styles.viewall} />
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            // contentContainerStyle={{marginLeft:20 , mar}}
            data={
              DashboardData ? DashboardData.tournaments : [1, 2, 3, 4, 5, 6, 7]
            }
            renderItem={renderTounaments}
            ListEmptyComponent={
              <TextComponent
                text={t('No Tournament Available')}
                style={styles.notfound}
              />
            }
          />
        </View>

        <View style={{marginVertical: 20}}>
          <View style={styles.headingSection}>
            <TextComponent text={t('Videos')} style={styles.heading} />
            <TouchableOpacity onPress={() => navigation.navigate('Videos')}>
              <TextComponent text={t('View All >')} style={styles.viewall} />
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            // contentContainerStyle={{marginLeft:20 , mar}}
            data={DashboardData ? DashboardData.videos : [1, 2, 3, 4, 5, 6, 7]}
            renderItem={renderVideos}
            ListEmptyComponent={
              <TextComponent
                text={t('No Videos Available')}
                style={styles.notfound}
              />
            }
          />
        </View>
      </ScrollView>

      {renderProgressModal()}
      {renderLevelModal()}
      {user.isLineUp ? renderLineupModal():null}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.homeGray,
    // paddingVertical: 10,
  },
  header: {
    height: 80,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  profile_img: {
    width: 40,
    height: 40,
    borderRadius: 55,
    borderColor: Colors.Dark_Blue,
    borderWidth: 1,
  },
  banner: {
    width: 300,
    height: 150,
    borderRadius: 20,
  },
  heading: {
    fontSize: 22,
    color: '#190A41',
    fontWeight: 'bold',
  },
  notfound: {
    fontSize: 18,
    color: '#190A41',
    marginLeft: 20,
  },
  viewall: {
    fontSize: 14,
    color: '#392276',
    // fontWeight:'bold'
  },
  headingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  MatchView: {
    width: 300,
    height: 150,
    backgroundColor: Colors.White,
    borderRadius: 20,
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
    backgroundColor: Colors.Dark_Blue,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    paddingHorizontal: 10,
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
    color: '#190A41',
    marginTop: 5,
  },

  TourView: {
    width: 230,
    height: 150,
    backgroundColor: Colors.White,
    borderRadius: 20,
  },
  TourViewTeam: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TourViewFooter: {
    flex: 1,
    maxHeight: 60,
    // backgroundColor: Colors.Dark_Blue,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  Tourtitle: {
    fontSize: 13,
    textAlign: 'center',
    color: '#190A41',
  },
  TourScore: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#190A41',
    marginTop: 5,
  },
  Mtitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#190A41',
    alignSelf: 'center',
    marginBottom: 5,
  },
  TBanner: {
    width: 230,
    height: 90,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  Theader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    top: 10,
    width: 230,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
