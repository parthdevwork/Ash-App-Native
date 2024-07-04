import {StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors } from '../../Config/Colors';
import Header from '../../Components/Header';
import { useTranslation } from 'react-i18next';
import { calender, league, Playbtn, Videobanner } from '../../Components/Assets';
import { FlatList } from 'react-native';
import Tag from '../../Components/Tag';
import TextComponent from '../../Components/TextComponent';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { HomeMiddleware } from '../../Store/Middleware/HomeMiddleware';
import Skeleton from '../../Components/Skeleton';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import Image from '../../Components/Image';


const Videos = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();

  const [isSelected, setisSelected] = useState('ALL');
  const [Types, setType] = useState(null);
  const [page, setPage] = useState(1);
  const [refresh, setrefresh] = useState(false);
  const [loadmore, setloadmore] = useState(false);

  const dispatch = useDispatch();
  const Videos = useSelector(state => state.HomeReducer.Videos);
  const Object = useSelector(state => state.HomeReducer.VideosObjects);

  useEffect(() => {
    dispatch(HomeMiddleware.getVideoTypes())
      .then(data => setType(data))
      .catch();
    dispatch(HomeMiddleware.getVideos({ page, search: '' }));
  }, []);

  const onPress = item => {
    setisSelected(item);
    dispatch(HomeMiddleware.getVideos({ page: 1, search: item }));
  };

  const onEndReached = () => {
    if (Object?.nextPage) {
      setloadmore(true);
      setPage(Object.nextPage);
      dispatch(
        HomeMiddleware.getVideos({
          page: Object.nextPage,
          search: isSelected,
        }),
      )
        .then(() => setloadmore(false))
        .catch();
    }
  };

  const onRefresh = () => {
    setisSelected('ALL');
    setrefresh(true);
    dispatch(HomeMiddleware.getVideos({ page: 1, search: '' }))
      .then(() => setrefresh(false))
      .catch();
  };

  const renderVideos = ({ item, index }) => {
    return Object ? (
      <TouchableOpacity
        onPress={() => navigation.navigate('VideoScreen', { url: item?.url })}>
        <View style={styles.TourView}>
          <Image
            source={item?.thumbnail ? { uri: item?.thumbnail } : Videobanner}
            style={styles.TBanner}
            resizeMode={'cover'}
          />
          <View style={[styles.Theader, { top: 35 }]}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('VideoScreen', { url: item?.url })
              }>
              <Image
                source={Playbtn}
                style={{ width: 45, height: 45, borderRadius: 25 }}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.TourViewFooter}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={league}
                  style={{ width: 20, height: 20, marginRight: 10 }}
                  resizeMode={'contain'}
                />
                <TextComponent
                  text={item?.tournament?.title}
                  style={styles.Tourtitle}
                />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={calender}
                  style={{ width: 20, height: 20, marginRight: 10 }}
                  resizeMode={'contain'}
                />
                <TextComponent
                  text={`${moment(item?.videoDate).format('LL')}`}
                  style={styles.Tourtitle}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Ionicons
                  name={'person'}
                  color={Colors.Dark_Blue}
                  size={20}
                  style={{ marginRight: 10 }}
                />

                <TextComponent
                  text={item?.player?.fullName}
                  style={styles.Tourtitle}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                }}>
                <Ionicons
                  name={'pricetag-sharp'}
                  color={Colors.Dark_Blue}
                  size={20}
                  style={{ marginRight: 10 }}
                /><View style={{ width: 75, alignItems: 'flex-start' }}>
                  <TextComponent
                    text={item.type}
                    numberOfLines={1}
                    style={[styles.Tourtitle, {
                      textTransform: 'capitalize'
                    }]}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    ) : (
      <Skeleton
        radius={20}
        styles={{ margin: 10, width: '90%', alignSelf: 'center' }}
        style={{
          width: '99%',
          height: 155,
          borderRadius: 20,
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header title={t('Videos')} leftIcon={true} />
      <View style={{ paddingVertical: 10, backgroundColor: Colors.homeGray }}>
        <FlatList
          data={Types ? Types : [1, 2, 3, 4, 6]}
          horizontal
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return Types ? (
              <Tag
                index={index}
                text={t(item)}
                backgroundColor={Colors.White}
                Active={item == isSelected}
                onPress={() => onPress(item)}
              />
            ) : (
              <View style={{ width: 100, marginHorizontal: 5 }}>
                <Skeleton
                  radius={20}
                  styles={{ marginLeft: 10 }}
                  style={{ height: 25, width: '100%' }}
                />
              </View>
            );
          }}
        />
      </View>

      <FlatList
        data={Object ? Videos : [1, 2, 3, 45, 5, 67, 7]}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={renderVideos}
        refreshing={refresh}
        onRefresh={onRefresh}
        onEndReachedThreshold={0.8}
        onEndReached={onEndReached}
        ListEmptyComponent={
          <View style={{ alignSelf: 'center', marginTop: 20 }}>
            <TextComponent text={'No Videos yet'} style={styles.nTitle} />
          </View>
        }
        ListFooterComponent={
          loadmore ? (
            <ActivityIndicator
              size={'large'}
              color={Colors.Dark_Blue}
              style={{ marginVertical: 5 }}
            />
          ) : null
        }
      />
    </View>
  );
};

export default Videos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.homeGray,
  },

  TourView: {
    // width: 230,
    height: 200,
    backgroundColor: Colors.White,
    borderRadius: 20,
    marginBottom: 10,
    marginHorizontal: 20,
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
  TBanner: {
    width: '100%',
    height: 130,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  Theader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  nTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textColor,
  },
});
