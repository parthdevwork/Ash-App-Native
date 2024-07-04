import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import TopTab from '../../../Navigation/TopTabs/TopTab';
import Header from '../../../Components/Header';
import MyTeam from './MyTeam';
import PendingRequests from './PendingRequest';
import {Colors} from '../../../Config/Colors';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {TeamMiddleware} from '../../../Store/Middleware/TeamMiddleware';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const TeamManagement = props => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const TeamData = useSelector(state => state.TeamReducer.ManageTeam);
  const navigation = useNavigation();
  const screen = props?.route?.params?.Screen;

  useEffect(() => {
    if (!screen) {
      dispatch(TeamMiddleware.teamManagement());
    }
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Header
        leftIcon={true}
        title={t('Team Management')}
        rightIcon={true}
        onPressRightIcon={() =>
          navigation.navigate('AllTeams', {Screen: 'Profile'})
        }
        IconRight={<Ionicons name={'add'} size={30} color={Colors.Dark_Blue} />}
      />
      <TopTab
        initialRouteName={screen ? screen : 'My Teams'}
        components={[
          {
            component: MyTeam,
            name: 'My Teams',
            label: t('My Teams'),
          },
          {
            component: PendingRequests,
            name: 'Pending Requests',
            label: t('Pending Requests'),
            icon: TeamData?.requests?.length > 0 ? true : false,
          },
        ]}
      />
    </View>
  );
};

export default TeamManagement;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.homeGray,
  },
});
