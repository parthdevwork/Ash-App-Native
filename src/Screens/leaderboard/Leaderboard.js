import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Colors} from '../../Config/Colors';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import Header from '../../Components/Header';
import TopTab from '../../Navigation/TopTabs/TopTab';
import Players from './Players';
import Teams from './Teams';
import {useDispatch} from 'react-redux';
import {HomeMiddleware} from '../../Store/Middleware/HomeMiddleware';

const Leaderboard = () => {
  const {t, i18n} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Header title={t('Leaderboard')} leftIcon={true} />
      <TopTab
        components={[
          {
            component: Players,
            name: 'Players',
            label: t('Players'),
          },
          {
            component: Teams,
            name: 'Teams',
            label: t('Teams'),
          },
        ]}
      />
    </View>
  );
};

export default Leaderboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.homeGray,
  },
});
