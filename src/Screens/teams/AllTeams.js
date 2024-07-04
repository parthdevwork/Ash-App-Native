import React, {useState, useEffect, useRef} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  I18nManager,
} from 'react-native';
import {team1, menu} from '../../Components/Assets';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../../Config/Colors';
import {Header, InputText, TextComponent} from '../../Components';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {TeamMiddleware} from '../../Store/Middleware/TeamMiddleware';
import Skeleton from '../../Components/Skeleton';
import {showAlert} from '../../Store/Actions/GeneralActions';
import Modal from '../../Components/Modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Tag from '../../Components/Tag';
import Image from '../../Components/Image';

const AllTeams = props => {
  const {t, i18n} = useTranslation();
  const [search, setsearch] = useState('');
  const [refresh, setrefresh] = useState(false);
  const [page, setPage] = useState(1);
  const [Team, setTeam] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const getTeams = useSelector(state => state.TeamReducer.Teams);
  const getTeamObject = useSelector(state => state.TeamReducer.TeamObject);
  const TeamDetails = useSelector(state => state.TeamReducer.SelectedTeam);
  const user = useSelector(state => state.AuthReducer.user);
  const [loadmore, setloadmore] = useState(false);

  const timeOut = useRef();
  const screen = props?.route?.params?.Screen;

  useEffect(() => {
    dispatch(TeamMiddleware.getTeams({page, search}));
  }, []);

  const TeamNav = item => {
    if (screen && item.user != user.id) {
      setTeam(item);
      return;
    } else if (screen) {
      dispatch(
        showAlert({
          title: 'Team',
          message: 'You are the owner of this team',
          status: 'Error',
        }),
      );
      return;
    }
    if (TeamDetails && TeamDetails.id == item.id) {
      navigation.navigate('TeamDetails');
    } else {
      dispatch(TeamMiddleware.teamDetails({id: item.id}))
        .then(() => {
          navigation.navigate('TeamDetails');
        })
        .catch();
    }
  };

  const renderTeamItem = ({item}) => {
    return getTeamObject ? (
      <TouchableOpacity style={styles.option} onPress={() => TeamNav(item)}>
        <View style={styles.flxDR}>
          <Image
            source={item?.logo ? {uri: item?.logo} : team1}
            style={styles.icon_image}
            resizeMode={'contain'}
          />
          <TextComponent
            text={item?.teamName ? item?.teamName : '--'}
            style={styles.left}
          />
        </View>
        <MaterialIcons
          name={
            I18nManager.isRTL ? 'keyboard-arrow-left' : 'keyboard-arrow-right'
          }
          size={30}
          color={Colors.Blue}
          style={styles.left}
        />
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
    if (getTeamObject?.nextPage) {
      setloadmore(true);
      setPage(getTeamObject.nextPage);
      dispatch(TeamMiddleware.getTeams({page: getTeamObject.nextPage, search}))
        .then(() => setloadmore(false))
        .catch();
    }
  };

  const Onsearch = val => {
    setsearch(val);
    clearTimeout(timeOut.current);
    timeOut.current = setTimeout(() => {
      dispatch(TeamMiddleware.getTeams({page: 1, search: val}));
    }, 1500);
  };

  const onRefresh = () => {
    setrefresh(true);
    dispatch(TeamMiddleware.getTeams({page: 1, search: ''}))
      .then(() => setrefresh(false))
      .catch();
  };

  const sendRequest = () => {
    dispatch(
      TeamMiddleware.requestToJoin({
        team: Team.id,
        player: user?.id,
        requestedBy: 'PLAYER',
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
    <View style={styles.mainContainer}>
      <Header
        title={t('All Teams')}
        leftIcon={true}
        // rightIcon={true}
        // IconRight={<Image source={menu} style={styles.menuIcon} />}
      />

      <View style={styles.search_view}>
        <InputText
          style={{height: 40, color: '#000'}}
          iconname={'search'}
          iconColor={'#B1B1B1'}
          sidebar={true}
          value={search}
          onChangeText={val => Onsearch(val)}
          placeholder={t('Search')}
          cross={search}
          onPressCross={() => Onsearch('')}
        />
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        data={getTeamObject ? getTeams : [1, 2, 3, 5, 7, 8, 9, 0]}
        renderItem={renderTeamItem}
        keyExtractor={(item, index) => index.toString()}
        refreshing={refresh}
        onRefresh={onRefresh}
        ListEmptyComponent={
          <Text style={styles.no_data_found}>{t('No Teams Available')}</Text>
        }
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

      <Modal
        text={t('Request to Join')}
        visible={Team ? true : false}
        close={true}
        OnClose={() => {
          setTeam(null), sendRequest();
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
            onPress={() => setTeam(null)}
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

export default AllTeams;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.homeGray,
  },
  search_view: {
    width: '95%',
    alignSelf: 'center',
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
    width: 30,
    height: 30,
  },

  left: {
    marginLeft: 10,
  },
  menuIcon: {
    width: 18,
    height: 18,
  },
  no_data_found: {
    // fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 30,
    color: Colors.textColor,
  },
});
