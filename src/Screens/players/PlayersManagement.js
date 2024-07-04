import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {Colors} from '../../Config/Colors';
import TeamPlayers from './TeamPlayers';
import PlayersRequest from './PlayersRequest';
import {Header} from '../../Components';
import TopTab from '../../Navigation/TopTabs/TopTab';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {TeamMiddleware} from '../../Store/Middleware/TeamMiddleware';
import {useNavigation} from '@react-navigation/native';
import { useTranslation } from 'react-i18next';


const PlayersManagement = props => {
  const dispatch = useDispatch();
  const PlayerData = useSelector(state => state.TeamReducer.ManagePlayer);
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();


  useEffect(() => {
    dispatch(TeamMiddleware.teamPlayerManagement({id: props.route.params.id}));
  }, []);

  return (
    <View style={styles.container}>
      <Header
        leftIcon={true}
        title={'Players Management'}
        rightIcon={true}
        onPressRightIcon={() =>
          navigation.navigate('Players', {team: props.route.params.id})
        }
        IconRight={<Ionicons name={'add'} size={30} color={Colors.Dark_Blue} />}
      />
      <TopTab
        components={[
          {
            component: TeamPlayers,
            name: 'Team Players',
            label: t('Team Players'),
          },
          {
            component: PlayersRequest,
            name: 'Player Requests',
            label: t('Pending Requests'),
            icon: PlayerData?.requests?.length > 0 ? true : false,
          },
        ]}
      />
    </View>
  );
};

export default PlayersManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.homeGray,
  },
  active_dot: {
    width: 7,
    height: 7,
    position: 'absolute',
    top: 110,
    right: 30,
  },
});
