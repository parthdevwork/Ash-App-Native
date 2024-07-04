import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  I18nManager,
  Platform,
  Share,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../Config/Colors';
import {
  about,
  Leaderboard,
  logout,
  mytournament,
  picture,
  setting,
  share,
  support,
  videos,
  login,
} from '../../Components/Assets';
import TextComponent from '../../Components/TextComponent';
import TagLabel from '../../Components/TagLabel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import Modal from '../../Components/Modal';
import {useDispatch, useSelector} from 'react-redux';
import {Logout} from '../../Store/Actions/AuthAction';
import {AuthMiddleware} from '../../Store/Middleware/AuthMiddleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

const More = () => {
  const {t, i18n} = useTranslation();
  const navigation = useNavigation();
  const user = useSelector(state => state.AuthReducer.user);

  const dispatch = useDispatch();

  const [islogout, setislogout] = useState(false);

  const insets = useSafeAreaInsets();

  const data = [
    {
      id: 1,
      name: 'Leaderboard',
      image: Leaderboard,
      onPress: () => navigation.navigate('Leaderboard'),
    },
    {
      id: 2,
      name: 'Videos',
      image: videos,
      onPress: () => navigation.navigate('Videos'),
    },
    {
      id: 3,
      name: 'Settings',
      image: setting,
      onPress: () => navigation.navigate('Setting'),
    },
    {
      id: 4,
      name: 'Support',
      image: support,
      onPress: () => console.log('first'),
    },
    {
      id: 5,
      name: 'About App',
      image: about,
      onPress: () => console.log('first'),
    },
    {
      id: 6,
      name: 'Share with Friends',
      image: share,
      onPress: () =>
        Share.share({
          title: 'Asharah',
          url: 'https://www.Asharah.com/app/ios',
          message:
            Platform.OS == 'ios'
              ? 'Asharah'
              : 'https://www.Asharah.com/app/ios',
        }),
    },
    {
      id: 7,
      name: user?.role == 'GUEST' ? 'Login' : 'Logout',
      image: user?.role == 'GUEST' ? login : logout,
      onPress: () => (user?.role == 'GUEST' ? Onlogout() : setislogout(true)),
    },
  ];

  const Onlogout = () => {
    if (user.role == 'GUEST') {
      dispatch(Logout());
      return;
    }
    dispatch(AuthMiddleware.logout())
      .then(async () => {
        await AsyncStorage.clear();
        dispatch(Logout());
      })
      .catch();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.header,
          {
            paddingTop: Platform.OS == 'ios' ? (insets.top != 20 ? 35 : 0) : 0,
            height: Platform.OS == 'ios' ? (insets.top != 20 ? 165 : 140) : 150,
          },
        ]}
        disabled={user?.role == 'GUEST' ? true : false}
        onPress={() => navigation.navigate('Profile')}>
        <Image
          source={user?.picture ? {uri: user?.picture} : picture}
          style={styles.profile_img}
        />

        <View style={{marginLeft: 20, flex: 1}}>
          <TextComponent
            text={user?.fullName ? user?.fullName : 'Username'}
            style={styles.username}
          />
          {user?.role == 'GUEST' ? null : (
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <TextComponent
                text={
                  user?.level?.history?.[user?.level?.history.length - 1]
                    ?.value ?? ''
                }
                style={styles.type}
              />
              <TagLabel
                text={user?.features?.inGamePosition?.shortPosition}
                bR={5}
                pH={5}
                TextStyle={{
                  fontSize: 13,
                  marginVertical: 2,
                  fontWeight: '600',
                }}
              />
            </View>
          )}
        </View>
        <TouchableOpacity
          disabled={user?.role == 'GUEST' ? true : false}
          onPress={() => navigation.navigate('Profile')}>
          <Feather
            name={!I18nManager.isRTL ? 'chevron-right' : 'chevron-left'}
            size={34}
            color={Colors.White}
          />
        </TouchableOpacity>
      </TouchableOpacity>

      <FlatList
        style={{flex: 1, paddingTop: 30}}
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              // disabled={
              //   user?.role == 'GUEST' && item.name != 'Login' ? true : false
              // }
              onPress={item.onPress}
              style={[
                styles.Menu,
                {
                  marginBottom:
                    index == 1 ? 15 : index == data.length - 2 ? 15 : 0,
                },
              ]}>
              <Image
                source={item.image}
                style={styles.icon}
                resizeMode={'contain'}
              />
              <View style={{marginLeft: 20, flex: 1}}>
                <TextComponent
                  text={t(item.name)}
                  style={[
                    styles.MenuText,
                    {
                      color:
                        item.name == 'Logout'
                          ? Colors.ErrorRed
                          : item.name == 'Login'
                          ? Colors.SuccessGreen
                          : Colors.textColor,
                    },
                  ]}
                />
              </View>
              <View>
                <Feather
                  name={!I18nManager.isRTL ? 'chevron-right' : 'chevron-left'}
                  size={24}
                  color={
                    item.name == 'Logout'
                      ? Colors.ErrorRed
                      : item.name == 'Login'
                      ? Colors.SuccessGreen
                      : Colors.textColor
                  }
                />
              </View>
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={
          <View style={{alignSelf: 'center'}}>
            <TextComponent
              text={'Version 1.0.0 Build 1'}
              style={styles.build}
            />
          </View>
        }
        // ListHeaderComponent={
        //   <TouchableOpacity
        //     disabled={user?.role == 'GUEST' ? true : false}
        //     style={[
        //       styles.Menu,
        //       {
        //         marginVertical: 20,
        //       },
        //     ]}>
        //     <Image
        //       source={mytournament}
        //       style={styles.icon}
        //       resizeMode={'contain'}
        //     />
        //     <View style={{marginLeft: 20, flex: 1}}>
        //       <TextComponent
        //         text={t('My Tournaments')}
        //         style={styles.MenuText}
        //       />
        //     </View>
        //     <View>
        //       <Ionicons
        //         name={!I18nManager.isRTL ? 'chevron-forward' : 'chevron-back'}
        //         size={24}
        //         color={Colors.textColor}
        //       />
        //     </View>
        //   </TouchableOpacity>
        // }
      />
      <Modal
        animationType={'fade'}
        visible={islogout}
        close={true}
        text={t('LOGOUT')}
        OnClose={() => {
          setislogout(false);
          Onlogout();
        }}>
        <View
          style={{
            height: 150,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          <TouchableOpacity
            onPress={() => setislogout(false)}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              width: 30,
              height: 30,
            }}>
            <Ionicons
              name={'ios-close-circle-outline'}
              size={28}
              color={Colors.textColor}
            />
          </TouchableOpacity>
          <Ionicons
            name={'alert-circle-outline'}
            size={50}
            color={Colors.textColor}
          />
          <TextComponent
            text={t('Are you sure you want to\n logout ?')}
            style={{fontSize: 20, color: Colors.textColor, textAlign: 'center'}}
          />
        </View>
      </Modal>
    </View>
  );
};

export default More;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.homeGray,
  },
  header: {
    backgroundColor: Colors.Dark_Blue,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  profile_img: {
    width: 55,
    height: 55,
    borderRadius: 55,
    borderColor: Colors.White,
    borderWidth: 1,
  },
  icon: {
    width: 30,
    height: 30,
  },
  username: {
    fontSize: 20,
    color: Colors.White,
    fontWeight: '700',
  },
  type: {
    fontSize: 18,
    color: Colors.White,
    fontWeight: '400',
    marginRight: 20,
    textTransform: 'capitalize',
  },
  Menu: {
    flexDirection: 'row',
    height: 60,
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
  build: {
    fontSize: 16,
    color: '#999999',
    fontWeight: '400',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
});
