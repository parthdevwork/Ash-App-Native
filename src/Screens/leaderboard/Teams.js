import {
  FlatList,
  I18nManager,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors} from '../../Config/Colors';
import {constraints} from '../../Config/Constraints';
import Tag from '../../Components/Tag';
import {useTranslation} from 'react-i18next';
import {
  barcelona,
  Barcelonalogo,
  createLogo,
  Crown,
  liverpool,
  picture,
  Player1,
  Player2,
  Player3,
  RealMlogo,
} from '../../Components/Assets';
import TextComponent from '../../Components/TextComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import LinearGradient from 'react-native-linear-gradient';
import {HomeMiddleware} from '../../Store/Middleware/HomeMiddleware';
import Skeleton from '../../Components/Skeleton';
import {useDispatch, useSelector} from 'react-redux';
import Image from '../../Components/Image';

const Teams = () => {
  const [isSelected, setisSelected] = useState(1);
  const {t, i18n} = useTranslation();

  const [refresh, setrefresh] = useState(false);
  const [loadmore, setloadmore] = useState(false);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const TopTeam = useSelector(state => state.HomeReducer.TopTeam);
  const Teams = useSelector(state => state.HomeReducer.LeadTeam);
  const Object = useSelector(state => state.HomeReducer.LeadTeamObject);

  useEffect(() => {
    dispatch(HomeMiddleware.getLeadTeams({page}));
  }, []);

  const renderHeader = () => {
    return Object && TopTeam.length > 0 ? (
      <View style={styles.MOTM}>
        {TopTeam.length > 1 ? (
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
                source={TopTeam[1]?.logo ? {uri: TopTeam[1]?.logo} : createLogo}
                style={styles.image}
                resizeMode={'stretch'}
              />
            </LinearGradient>

            <TextComponent
              text={TopTeam[1]?.teamName}
              style={[styles.MenuText, {fontSize: 16}]}
            />
            <TextComponent
              text={
                isSelected == 1
                  ? TopTeam[1]?.level?.points
                  : TopTeam[1]?.level?.popularity
              }
              style={[styles.MenuText, {fontSize: 22, color: '#392276'}]}
            />
            <TextComponent
              text={isSelected == 1 ? 'Points' : 'Popularity'}
              style={[styles.MenuText, {color: '#392276'}]}
            />
          </View>
        ) : null}
        {TopTeam.length > 0 ? (
          <View style={{alignItems: 'center', zIndex: 99}}>
            <Image
              source={Crown}
              style={{marginBottom: -7, zIndex: 9999, width: 40, height: 40}}
            />
            <LinearGradient
              style={styles.player1}
              colors={['#FFBE4A', '#FEE45A']}>
              <Image
                source={TopTeam[0]?.logo ? {uri: TopTeam[0]?.logo} : createLogo}
                style={[styles.image, {width: 135, height: 135}]}
                resizeMode={'stretch'}
              />
            </LinearGradient>
            <TextComponent
              text={TopTeam[0]?.teamName}
              style={[styles.MenuText, {fontSize: 16, marginTop: 10}]}
            />
            <TextComponent
              text={
                isSelected == 1
                  ? TopTeam[0]?.level?.points
                  : TopTeam[0]?.level?.popularity
              }
              style={[styles.MenuText, {fontSize: 22, color: '#392276'}]}
            />
            <TextComponent
              text={isSelected == 1 ? 'Points' : 'Popularity'}
              style={[styles.MenuText, {color: '#392276'}]}
            />
          </View>
        ) : null}
        {TopTeam.length > 2 ? (
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
                source={TopTeam[2]?.logo ? {uri: TopTeam[2]?.logo} : createLogo}
                style={styles.image}
                resizeMode={'stretch'}
              />
            </LinearGradient>
            <TextComponent
              text={TopTeam[2]?.teamName}
              style={[styles.MenuText, {fontSize: 16}]}
            />
            <TextComponent
              text={
                isSelected == 1
                  ? TopTeam[2]?.level?.points
                  : TopTeam[2]?.level?.popularity
              }
              style={[styles.MenuText, {fontSize: 22, color: '#392276'}]}
            />
            <TextComponent
              text={isSelected == 1 ? 'Points' : 'Popularity'}
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
      dispatch(HomeMiddleware.getLeadTeams({page: Object.nextPage}))
        .then(() => setloadmore(false))
        .catch();
    }
  };

  const onRefresh = () => {
    setrefresh(true);
    dispatch(HomeMiddleware.getLeadTeams({page: 1}));
    setrefresh(false);
  };

  const types = [
    {
      id: 1,
      name: 'Points',
    },
    {
      id: 2,
      name: 'Popularity',
    },
  ];

  return (
    <View style={styles.container}>
      <View
        style={{
          paddingVertical: 5,
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <Tag
          TextStyle={{marginVertical: I18nManager.isRTL ? 0 : 5}}
          width={'45%'}
          //   index={types.length - 1}
          text={t(types[0].name)}
          // pH={10}
          backgroundColor={Colors.White}
          Active={types[0].id == isSelected}
          onPress={() => setisSelected(types[0].id)}
        />
        <Tag
          TextStyle={{marginVertical: I18nManager.isRTL ? 0 : 5}}
          width={'45%'}
          //   index={types.length}
          text={t(types[1].name)}
          // pH={10}
          backgroundColor={Colors.White}
          Active={types[1].id == isSelected}
          onPress={() => setisSelected(types[1].id)}
        />
      </View>
      <View style={{flex: 1}}>
        <FlatList
          data={Object ? Teams : [1, 2, 3, 4, 5]}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={renderHeader}
          refreshing={refresh}
          onRefresh={onRefresh}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.8}
          renderItem={({item, index}) => {
            return Object ? (
              <TouchableOpacity
                disabled={true}
                style={[
                  styles.Menu,
                  {
                    backgroundColor: Colors.White,
                  },
                ]}>
                <TextComponent
                  text={index + 4}
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
                  source={item.logo ? {uri: item.logo} : createLogo}
                  style={styles.icon}
                  resizeMode={'contain'}
                />
                <View style={{marginLeft: 20, flex: 1}}>
                  <TextComponent
                    text={item?.teamName}
                    style={styles.MenuText}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    minWidth: 60,
                  }}>
                  <TextComponent
                    text={
                      isSelected == 1
                        ? item?.level?.points
                        : item?.level?.popularity
                    }
                    style={styles.MenuText}
                  />
                  <Ionicons
                    name={
                      !I18nManager.isRTL ? 'chevron-forward' : 'chevron-back'
                    }
                    size={24}
                    color={Colors.textColor}
                  />
                </View>
              </TouchableOpacity>
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

export default Teams;

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
