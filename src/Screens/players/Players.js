import {
  StyleSheet,
  Text,
  View,
  FlatList,
  I18nManager,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Colors} from '../../Config/Colors';
import {Header, InputText, TextComponent} from '../../Components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TagLabel from '../../Components/TagLabel';
import {infoCircle2, menu, persons, picture} from '../../Components/Assets';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {TeamMiddleware} from '../../Store/Middleware/TeamMiddleware';
import Skeleton from '../../Components/Skeleton';
import {useTranslation} from 'react-i18next';
import Modal from '../../Components/Modal';
import Tag from '../../Components/Tag';
import { showAlert } from '../../Store/Actions/GeneralActions';

const Players = props => {
  const {t, i18n} = useTranslation();

  const [search, setsearch] = useState('');
  const [refresh, setrefresh] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [Player, setPlayer] = useState(null);
  const [loadmore, setloadmore] = useState(false);
  const [page, setPage] = useState(1);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const Players = useSelector(state => state.TeamReducer.Players);
  const PlayersObject = useSelector(state => state.TeamReducer.PlayersObject);
  const timeOut = useRef();

  useEffect(() => {
    dispatch(TeamMiddleware.getPlayers({page, search}));
  }, []);

  const renderItem = ({item}) => {
    const today = new Date().getFullYear();
    const dateofbirth = new Date(item?.dateOfBirth);
    const age = today - dateofbirth.getFullYear();
    return PlayersObject ? (
      <TouchableOpacity
        style={styles.option}
        onPress={() => {
          setOpenModal(true), setPlayer(item);
        }}>
        <View style={styles.flxDR}>
          <Image
            source={item?.picture ? {uri: item?.picture} : picture}
            style={styles.icon_image}
            resizeMode={'contain'}
          />
          <View>
            <TextComponent
              text={item?.fullName ? item?.fullName : '--'}
              style={styles.left}
            />
            <TextComponent text={`${age} years`} style={styles.bio} />
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TagLabel
            text={item?.features?.inGamePosition?.shortPosition}
            bR={5}
            pH={5}
            TextStyle={{fontSize: 13, marginVertical: 2, fontWeight: '600'}}
          />
          <Ionicons
            name={!I18nManager.isRTL ? 'chevron-forward' : 'chevron-back'}
            size={22}
            color={Colors.Blue}
            style={{marginLeft: 10}}
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
  };
  const onEndReached = () => {
    if (PlayersObject?.nextPage) {
      setloadmore(true);
      setPage(PlayersObject.nextPage);
      dispatch(
        TeamMiddleware.getPlayers({page: PlayersObject.nextPage, search}),
      )
        .then(() => setloadmore(false))
        .catch();
    }
  };

  const Onsearch = val => {
    setsearch(val);
    clearTimeout(timeOut.current);
    timeOut.current = setTimeout(() => {
      dispatch(TeamMiddleware.getPlayers({page, search: val}));
    }, 2000);
  };

  const onRefresh = () => {
    setrefresh(true);
    dispatch(TeamMiddleware.getPlayers({page: 1, search: ''}))
      .then(() => setrefresh(false))
      .catch();
  };

  const sendRequest = () => {
    dispatch(
      TeamMiddleware.requestToJoin({
        team: props?.route?.params?.team,
        player: Player?.id,
        requestedBy: 'TEAM',
      }),
    )
      .then(() => {
        dispatch(
          showAlert({
            title: 'Teams',
            message: 'Request Send Successfully.',
            status: 'Success',
          }),
        );
      })
      .catch();
  };
  return (
    <View style={styles.container}>
      <Header
        leftIcon={true}
        title={'All Players'}
        // rightIcon={true}
        // onPressRightIcon={() => console.log('first')}
        // IconRight={<Image source={menu} style={styles.menuIcon} />}
      />
      <View style={{marginHorizontal: 10}}>
        <InputText
          // value={\}
          style={{height: 40, color: '#000'}}
          iconname={'search'}
          iconColor={'#B1B1B1'}
          sidebar={true}
          onChangeText={val => Onsearch(val)}
          placeholder={'Search'}
          // mic={true}
        />
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={PlayersObject ? Players : [1, 2, 3, 5, 7, 8, 9, 0]}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        refreshing={refresh}
        onRefresh={onRefresh}
        onEndReachedThreshold={0.8}
        onEndReached={onEndReached}
        ListEmptyComponent={
          <Text style={styles.no_data_found}>{t('No Players Available')}</Text>
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

      <Modal
        text={t('Request to Join')}
        visible={openModal}
        close={true}
        OnClose={() => {
          setOpenModal(false), sendRequest();
        }}>
        <View
          style={{
            height: 180,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            width: '90%',
          }}>
          <TouchableOpacity
            onPress={() => setOpenModal(false)}
            style={{
              position: 'absolute',
              top: 10,
              right: -10,
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
            text={t('Are you sure you want\n to send the request?')}
            style={{fontSize: 22, color: Colors.textColor, textAlign: 'center'}}
          />
        </View>
      </Modal>
    </View>
  );
};

export default Players;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.homeGray,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 17,
    backgroundColor: Colors.White,
    borderColor: Colors.light_opacity,
    borderWidth: 0.5,
  },
  flxDR: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon_image: {
    width: 40,
    height: 40,
    borderRadius: 40,
    borderColor: Colors.SuccessGreen,
    borderWidth: 1,
  },

  left: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '600',
  },
  bio: {
    fontSize: 11,
    marginLeft: 10,
    color: Colors.likeGray,
  },
  no_data_found: {
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 30,
  },
  menuIcon: {
    width: 18,
    height: 18,
  },
});
