import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Header from '../../Components/Header';
import Tag from '../../Components/Tag';
import {Colors} from '../../Config/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {HomeMiddleware} from '../../Store/Middleware/HomeMiddleware';
import Skeleton from '../../Components/Skeleton';
import TagLabel from '../../Components/TagLabel';
import {
  Female,
  calender,
  league,
  Male,
  locationpin,
  Tbanner,
} from '../../Components/Assets';
import {TextComponent} from '../../Components';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import Image from '../../Components/Image';

const Tournaments = () => {
  const {t, i18n} = useTranslation();

  const navigation = useNavigation();

  const [isSelected, setisSelected] = useState('ALL');
  const [Types, setType] = useState(null);
  const [page, setPage] = useState(1);
  const [refresh, setrefresh] = useState(false);
  const [loadmore, setloadmore] = useState(false);

  const dispatch = useDispatch();
  const Tour = useSelector(state => state.HomeReducer.Tournaments);
  const Object = useSelector(state => state.HomeReducer.TourObjects);
  const Tourd = useSelector(state => state.HomeReducer.TourDetails);

  useEffect(() => {
    dispatch(HomeMiddleware.getTounamentTypes())
      .then(data => setType(data))
      .catch();
    dispatch(HomeMiddleware.getTournaments({page, search: ''}));
  }, []);

  const onPress = item => {
    setisSelected(item);
    dispatch(HomeMiddleware.getTournaments({page: 1, search: item}));
  };

  const onEndReached = () => {
    if (Object?.nextPage) {
      setloadmore(true);
      setPage(Object.nextPage);
      dispatch(
        HomeMiddleware.getTournaments({
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
    dispatch(HomeMiddleware.getTournaments({page: 1, search: ''}))
      .then(() => setrefresh(false))
      .catch();
  };

  const renderTournamentItem = ({item}) => {
    return Object ? (
      <TouchableOpacity
        onPress={() => {
          if (Tourd && Tourd.id == item.id) {
            if (item?.status != 'ONGOING') {
              navigation.navigate('TournamentDetails');
            } else {
              navigation.navigate('TournamentDetailsStart');
            }
          } else {
            dispatch(HomeMiddleware.getTourDetails({id: item?.id}))
              .then(() => {
                if (item?.status != 'ONGOING') {
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
            <TagLabel
              text={item?.status}
              backgroundColor={
                item?.status == 'CLOSED' ? Colors.White : Colors.SuccessGreen
              }
            />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TagLabel
                text={t(item?.ageGroup)}
                pH={10}
                backgroundColor={Colors.White}
              />
              <Image
                source={item?.isForMales ? Male : Female}
                style={{width: 25, height: 25, marginLeft: 5, borderRadius: 25}}
                resizeMode={'contain'}
              />
            </View>
          </View>
          {item?.lastdate ? (
            <View style={styles.date_View}>
              <Text style={styles.date_text}>Until {item?.lastdate}</Text>
            </View>
          ) : null}

          <View style={styles.TourViewOuterFooter}>
            <View style={styles.TourViewInnerFooter}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={league}
                  style={{width: 20, height: 20, marginRight: 3}}
                  resizeMode={'contain'}
                />
                <TextComponent text={item?.title} style={styles.Tourtitle} />
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={calender}
                  style={{width: 20, height: 20, marginRight: 3}}
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingRight: 25,
              }}>
              <Image
                source={locationpin}
                style={{width: 20, height: 20, marginRight: 3}}
                resizeMode={'contain'}
              />
              <TextComponent
                numberOfLines={2}
                text={item?.location}
                style={styles.Tourtitle}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    ) : (
      <Skeleton
        radius={20}
        styles={{margin: 10, width: '90%', alignSelf: 'center'}}
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
      <Header title={t('Tournaments')} />
      <View style={{paddingVertical: 10, backgroundColor: Colors.homeGray}}>
        <FlatList
          data={Types ? Types : [1, 2, 3, 4, 6]}
          horizontal
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return Types ? (
              <Tag
                index={index}
                text={t(item)}
                backgroundColor={Colors.White}
                Active={item == isSelected}
                onPress={() => onPress(item)}
              />
            ) : (
              <View style={{width: 100, marginHorizontal: 5}}>
                <Skeleton
                  styles={{marginLeft: 10}}
                  radius={20}
                  style={{height: 25, width: '100%'}}
                />
              </View>
            );
          }}
        />
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        data={Object ? Tour : [1, 2, 3, 45, 5, 67, 7]}
        renderItem={renderTournamentItem}
        keyExtractor={(item, index) => index.toString()}
        refreshing={refresh}
        onRefresh={onRefresh}
        onEndReachedThreshold={0.8}
        onEndReached={onEndReached}
        ListEmptyComponent={
          <Text style={styles.no_data_found}>
            {t('No Tournaments Available')}
          </Text>
        }
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
  );
};
export default Tournaments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.homeGray,
  },
  TourView: {
    width: '90%',
    marginVertical: 10,
    alignSelf: 'center',
    backgroundColor: Colors.White,
    borderRadius: 20,
  },
  TBanner: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  Theader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 10,
    width: '100%',
    paddingHorizontal: 10,
  },
  date_View: {
    position: 'absolute',
    top: 38,
    width: '100%',
    paddingHorizontal: 10,
  },
  date_text: {
    color: Colors.SuccessGreen,
    fontSize: 12,
    margin: 5,
  },
  TourViewOuterFooter: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  TourViewInnerFooter: {
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 5,
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
  no_data_found: {
    // fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 30,
  },
});
