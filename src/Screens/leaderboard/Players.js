import {
  FlatList,
  I18nManager,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors} from '../../Config/Colors';
import {constraints} from '../../Config/Constraints';
import Tag from '../../Components/Tag';
import {useTranslation} from 'react-i18next';
import {
  Crown,
  picture,
  Player1,
  Player2,
  Player3,
} from '../../Components/Assets';
import TextComponent from '../../Components/TextComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {HomeMiddleware} from '../../Store/Middleware/HomeMiddleware';
import Skeleton from '../../Components/Skeleton';
import Image from '../../Components/Image';

const Players = () => {
  const [isSelected, setisSelected] = useState(1);
  const {t, i18n} = useTranslation();

  const [refresh, setrefresh] = useState(false);
  const [page, setPage] = useState(1);
  const [loadmore, setloadmore] = useState(false);

  const [type, settype] = useState('Goals');

  const dispatch = useDispatch();
  const TopPlayers = useSelector(state => state.HomeReducer.TopPlayers);
  const Players = useSelector(state => state.HomeReducer.LeadPlayers);
  const Object = useSelector(state => state.HomeReducer.LeadPlayerObject);

  const types = [
    {
      id: 1,
      name: 'Goals',
    },
    {
      id: 2,
      name: 'MVP',
    },

    {
      id: 3,
      name: 'Assists',
    },
    {
      id: 4,
      name: 'Saves',
    },
    {
      id: 5,
      name: 'Clean Sheet',
    },
  ];

  useEffect(() => {
    dispatch(HomeMiddleware.getLeadPlayers({page}));
  }, []);

  const renderHeader = () => {
    let score1,
      score0,
      score3 = 0;
    switch (type) {
      case 'Goals':
        score1 = TopPlayers[1]?.statistics?.goals;
        score0 = TopPlayers[0]?.statistics?.goals;
        score3 = TopPlayers[2]?.statistics?.goals;
        break;
      case 'MVP':
        score1 = TopPlayers[1]?.statistics?.menOfTheMatch;
        score0 = TopPlayers[0]?.statistics?.menOfTheMatch;
        score3 = TopPlayers[2]?.statistics?.menOfTheMatch;
        break;
      case 'Assists':
        score1 = TopPlayers[1]?.statistics?.assists;
        score0 = TopPlayers[0]?.statistics?.assists;
        score3 = TopPlayers[2]?.statistics?.assists;
        break;
      case 'Saves':
        score1 = TopPlayers[1]?.statistics?.saves;
        score0 = TopPlayers[0]?.statistics?.saves;
        score3 = TopPlayers[2]?.statistics?.saves;
        break;
      case 'Clean Sheet':
        score1 = TopPlayers[1]?.statistics?.cleanSheets;
        score0 = TopPlayers[0]?.statistics?.cleanSheets;
        score3 = TopPlayers[2]?.statistics?.cleanSheets;
        break;
      default:
        break;
    }
    return Object && TopPlayers.length > 0 ? (
      <View style={styles.MOTM}>
        {TopPlayers.length > 1 ? (
          <View style={{alignItems: 'center'}}>
            <View style={{marginTop: -18}}>
              <TextComponent
                text={'2'}
                style={[
                  styles.MenuText,
                  {
                    fontSize: 28,
                    color: '#B6ACA8',
                    fontWeight: 'bold',
                    marginBottom: -8,
                  },
                ]}
              />
              <AntDesign name={'caretdown'} color={'#B6ACA8'} size={16} />
            </View>
            <LinearGradient
              style={styles.player2}
              colors={['#C3B9B5', '#E3DFDE']}>
              <View></View>
              <Image
                source={
                  TopPlayers[1]?.picture
                    ? {uri: TopPlayers[1]?.picture}
                    : picture
                }
                style={styles.image}
              />
            </LinearGradient>

            <TextComponent
              text={TopPlayers[1]?.fullName}
              style={[styles.MenuText, {fontSize: 16}]}
            />
            <TextComponent
              text={score1}
              style={[styles.MenuText, {fontSize: 28, color: '#392276'}]}
            />
            <TextComponent
              text={type}
              style={[styles.MenuText, {color: '#392276'}]}
            />
          </View>
        ) : null}
        {TopPlayers.length > 0 ? (
          <View style={{alignItems: 'center', zIndex: 99}}>
            <Image
              source={Crown}
              style={{marginBottom: -7, zIndex: 9999, width: 40, height: 40}}
            />
            <LinearGradient
              style={styles.player1}
              colors={['#FFBE4A', '#FEE45A']}>
              <Image
                source={
                  TopPlayers[0]?.picture
                    ? {uri: TopPlayers[0]?.picture}
                    : picture
                }
                style={[styles.image, {width: 135, height: 135}]}
              />
            </LinearGradient>
            <TextComponent
              text={TopPlayers[0]?.fullName}
              style={[styles.MenuText, {fontSize: 16, marginTop: 10}]}
            />
            <TextComponent
              text={score0}
              style={[styles.MenuText, {fontSize: 28, color: '#392276'}]}
            />
            <TextComponent
              text={type}
              style={[styles.MenuText, {color: '#392276'}]}
            />
          </View>
        ) : null}
        {TopPlayers.length > 2 ? (
          <View style={{alignItems: 'center'}}>
            <View style={{marginTop: -18}}>
              <TextComponent
                text={'3'}
                style={[
                  styles.MenuText,
                  {
                    fontSize: 28,
                    color: '#E27809',
                    fontWeight: 'bold',
                    marginBottom: -8,
                  },
                ]}
              />
              <AntDesign name={'caretdown'} color={'#E27809'} size={16} />
            </View>
            <LinearGradient
              style={styles.player2}
              colors={['#E17708', '#FF9E00']}>
              <Image
                source={
                  TopPlayers[2]?.picture
                    ? {uri: TopPlayers[2]?.picture}
                    : picture
                }
                style={styles.image}
              />
            </LinearGradient>
            <TextComponent
              text={TopPlayers[2]?.fullName}
              style={[styles.MenuText, {fontSize: 16}]}
            />
            <TextComponent
              text={score3}
              style={[styles.MenuText, {fontSize: 28, color: '#392276'}]}
            />
            <TextComponent
              text={type}
              style={[styles.MenuText, {color: '#392276'}]}
            />
          </View>
        ) : null}
      </View>
    ) : !Object ? (
      <View style={styles.MOTM}>
        <Skeleton
          styles={{
            width: 100,
            height: 100,
            marginVertical: 10,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          style={{width: 95, height: 95, borderRadius: 100}}
        />
        <Skeleton
          styles={{
            width: 150,
            height: 150,
            borderRadius: 100,
            marginHorizontal: -10,
            marginBottom: 10,
            zIndex: 99,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          style={{width: 145, height: 145, borderRadius: 100}}
        />
        <Skeleton
          styles={{
            width: 100,
            height: 100,
            marginVertical: 10,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          style={{width: 95, height: 95, borderRadius: 100}}
        />
      </View>
    ) : null;
  };

  const onEndReached = () => {
    if (Object?.nextPage) {
      setloadmore(true);
      setPage(Object.nextPage);
      dispatch(HomeMiddleware.getLeadPlayers({page: Object.nextPage}))
        .then(() => setloadmore(false))
        .catch();
    }
  };

  const onRefresh = () => {
    setrefresh(true);
    dispatch(HomeMiddleware.getLeadPlayers({page: 1}));
    setrefresh(false);
  };

  return (
    <View style={styles.container}>
      <View style={{paddingVertical: 5, backgroundColor: Colors.homeGray}}>
        <FlatList
          data={types}
          horizontal
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <Tag
                TextStyle={{marginVertical: I18nManager.isRTL ? 0 : 5}}
                index={index}
                text={t(item.name)}
                // pH={10}
                backgroundColor={Colors.White}
                Active={item.name == type}
                onPress={() => settype(item.name)}
              />
            );
          }}
        />
      </View>
      <View style={{flex: 1}}>
        <FlatList
          data={Object ? Players : [1, 2, 3, 4, 5]}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={renderHeader}
          renderItem={({item, index}) => {
            let score = 0;
            switch (type) {
              case 'Goals':
                score = item?.statistics?.goals;
                break;
              case 'MOTM':
                score = item?.statistics?.menOfTheMatch;
                break;
              case 'Assists':
                score = item?.statistics?.assists;
                break;
              case 'Saves':
                score = item?.statistics?.saves;
                break;
              case 'Clean Sheet':
                score = item?.statistics?.cleanSheets;
                break;
              default:
                break;
            }
            return Object ? (
              <View style={styles.Menu}>
                <TextComponent
                  text={t(index + 4)}
                  style={[
                    styles.MenuText,
                    {
                      color: '#666666',
                      fontSize: 18,
                      marginRight: 10,
                      fontWeight: '600',
                    },
                  ]}
                />
                <Image
                  source={item.picture ? {uri: item?.picture} : picture}
                  style={styles.icon}
                  resizeMode={'contain'}
                />
                <View style={{marginLeft: 20, flex: 1}}>
                  <TextComponent
                    text={t(item.fullName)}
                    style={styles.MenuText}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: 60,
                  }}>
                  <TextComponent text={score} style={styles.MenuText} />
                  <Ionicons
                    name={
                      !I18nManager.isRTL ? 'chevron-forward' : 'chevron-back'
                    }
                    size={24}
                    color={Colors.textColor}
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
          }}
          refreshing={refresh}
          onRefresh={onRefresh}
          onEndReachedThreshold={0.8}
          onEndReached={onEndReached}
          ListFooterComponent={
            loadmore ? (
              <ActivityIndicator
                size={'large'}
                color={Colors.Dark_Blue}
                style={{marginVertical: 5}}
              />
            ) : null
          }
        />
      </View>
    </View>
  );
};

export default Players;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.homeGray,
  },
  MOTM: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },

  Menu: {
    flexDirection: 'row',
    height: 70,
    paddingHorizontal: 20,
    backgroundColor: Colors.White,
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
    borderColor: Colors.Dark_Blue,
    borderRadius: 20,
    borderWidth: 1,
  },
  player2: {
    width: 110,
    height: 110,
    marginVertical: 5,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    ...constraints.myShadow,
  },
  player1: {
    width: 140,
    height: 140,
    borderRadius: 100,
    marginHorizontal: -10,
    // marginBottom: 0,
    zIndex: 99,
    alignItems: 'center',
    justifyContent: 'center',
    ...constraints.myShadow,
  },
  image: {width: 105, height: 105, borderRadius: 100},
});
