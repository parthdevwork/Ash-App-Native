import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  I18nManager,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors} from '../../Config/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  Annoucement,
  approved,
  join,
  level,
  NTrophy,
  Video,
  envelope,
} from '../../Components/Assets';
import TextComponent from '../../Components/TextComponent';
import Tag from '../../Components/Tag';
import {useTranslation} from 'react-i18next';
import Header from '../../Components/Header';
import {useDispatch, useSelector} from 'react-redux';
import {NotificationMiddleware} from '../../Store/Middleware/NotificationMiddleware';
import Skeleton from '../../Components/Skeleton';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

const Notifications = () => {
  const {t, i18n} = useTranslation();

  const [isSelected, setisSelected] = useState('ALL');
  const [Types, setType] = useState(null);
  const [page, setPage] = useState(1);
  const [refresh, setrefresh] = useState(false);
  const navigation = useNavigation();
  const [loadmore, setloadmore] = useState(false);

  const dispatch = useDispatch();
  const Notifications = useSelector(
    state => state.NotificationReducer.Notification,
  );


  const NotificationObject = useSelector(
    state => state.NotificationReducer.NotificationObject,
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(NotificationMiddleware.getNotificationTypes())
        .then(data => setType(data))
        .catch();
      dispatch(NotificationMiddleware.getNotifications({page, search: ''}));
    });
    return unsubscribe;
  }, []);

  const RenderNotifications = ({item, index}) => {
    let image = null;
    switch (item.type) {
      case 'ANNOUNCEMENTS':
        image = Annoucement;
        break;
      case 'GENERAL':
        image = Annoucement;
        break;
      case 'TOURNAMENTS':
        image = NTrophy;
        break;
      case 'LEVELS':
        image = level;
        break;
      case 'MEDIA':
        image = Video;
        break;
      case 'REQUESTS':
        image = join;
        break;
      default:
        image = Annoucement;
        break;
    }
    return NotificationObject ? (
      <View
        style={[
          styles.NotificationView,
          {
            backgroundColor: item.isReadAlready
              ? Colors.bottomTabColor
              : Colors.White,
          },
        ]}>
        <View style={{width: '20%'}}>
          <Image source={image} style={styles.Nicon} />
        </View>
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TextComponent text={item.title} style={styles.nTitle} />
            <MaterialIcons
              name={!I18nManager.isRTL ? 'arrow-forward-ios' : 'arrow-back-ios'}
              size={14}
              color={Colors.textColor}
            />
          </View>

          <TextComponent text={item.message} style={styles.nDecs} />
          <TextComponent
            text={moment(item.createdAt).fromNow()}
            style={styles.nDate}
          />
        </View>
      </View>
    ) : (
      <Skeleton style={{height: 100, width: '100%'}} />
    );
  };

  const onPress = item => {
    setisSelected(item);
    dispatch(NotificationMiddleware.getNotifications({page: 1, search: item}));
  };

  const onEndReached = () => {
    if (NotificationObject?.nextPage) {
      setloadmore(true);
      setPage(NotificationObject.nextPage);
      dispatch(
        NotificationMiddleware.getNotifications({
          page: NotificationObject.nextPage,
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
    dispatch(NotificationMiddleware.getNotifications({page: 1, search: ''}))
      .then(() => setrefresh(false))
      .catch();
  };

  return (
    <View style={styles.container}>
      <Header
        title={t('Notification')}
        // rightIcon={true}
        // // leftIcon
        // onPressRightIcon={() => console.log('first')}
        // IconRight={
        //   <Image
        //     source={envelope}
        //     style={{width: 25, height: 20}}
        //     resizeMode={'contain'}
        //   />
        // }
      />
      <View style={{paddingVertical: 10, backgroundColor: Colors.homeGray}}>
        <FlatList
          data={Types ? Types : [1, 2, 3, 4, 6]}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return Types ? (
              <Tag
                index={index}
                text={t(item)}
                // pH={10}
                backgroundColor={Colors.White}
                Active={item == isSelected}
                onPress={() => onPress(item)}
              />
            ) : (
              <View style={{width: 100, marginHorizontal: 5}}>
                <Skeleton radius={20} style={{height: 25, width: '100%'}} />
              </View>
            );
          }}
        />
      </View>
      <FlatList
        data={NotificationObject ? Notifications : [1, 2, 3, 4, 5, 7]}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={RenderNotifications}
        refreshing={refresh}
        onRefresh={onRefresh}
        onEndReachedThreshold={0.8}
        onEndReached={onEndReached}
        ListEmptyComponent={
          <View style={{alignSelf: 'center', marginTop: 20,width:"90%",alignItems:I18nManager.isRTL ?"flex-start":"center"}}>
            <TextComponent text={'No Notification yet'} style={[styles.nTitle]} />
          </View>
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

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.homeGray,
  },
  NotificationView: {
    flex: 1,
    maxHeight: 100,
    backgroundColor: Colors.White,
    marginVertical: 1,
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  Nicon: {
    width: 60,
    height: 60,
  },
  nTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textColor,
  },
  nDecs: {
    fontSize: 12,
    marginVertical: 5,
    fontWeight: '400',
    color: Colors.textColor,
  },
  nDate: {
    fontSize: 10,
    fontWeight: '300',
    color: Colors.textColor,
  },
});
