import {
  I18nManager,
  ImageBackground,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors} from '../../Config/Colors';
import {useTranslation} from 'react-i18next';
import TagLabel from '../../Components/TagLabel';
import {Header, TextComponent} from '../../Components';
import {barcelona, createLogo, ground, RealM} from '../../Components/Assets';
import TeamCard from '../../Components/TeamCard';
import TopTab from '../../Navigation/TopTabs/TopTab';
import TimeLines from './TimeLines';
import MatchSupport from './MatchSupport';
import Lineup from './Lineup';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {HomeMiddleware} from '../../Store/Middleware/HomeMiddleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MatchDetails = () => {
  const {t, i18n} = useTranslation();
  const Match = useSelector(state => state.HomeReducer.MatchDetail);
  const dispatch = useDispatch();
  const [isLike, setislike] = useState(false);
  const [isOver, setisOver] = useState(false);

  useEffect(() => {
    AsyncStorage.setItem('matchTeamAId',Match.teamA.team.id);
    AsyncStorage.setItem('matchTeamBId',Match.teamB.team.id);
  }, []);

  const support = (match, type, id) => {
    dispatch(HomeMiddleware.supportMatch({match, type, id, team: null}));
  };
  return (
    <View style={styles.container}>
      <Header title={t('Match Details')} leftIcon />
      <ImageBackground source={ground} style={styles.MatchView}>
        <TextComponent
          text={Match?.tournament.title}
          style={styles.Matchtitle}
        />
        <View style={styles.MatchViewTeam}>
          <TeamCard
            teamImage={
              Match?.teamA?.team?.logo
                ? {uri: Match?.teamA?.team?.logo}
                : createLogo
            }
            teamName={Match?.teamA?.team?.teamName}
            titleStyle={{color: Colors.White}}
            Like={true}
            likecount={
              Match?.teamA?.team?.level.popularity
                ? Match?.teamA?.team?.level.popularity
                : 0
            }
            disabled={true}
            isLike={
              Match.teamSupport?.supportTo?.id == Match?.teamA?.team?.id
                ? true
                : false
            }
            onPressLike={() => {
              support(Match?.id, 'TEAM', Match?.teamA.team.id);
            }}
            isWin={
              Match?.teamA?.team?.level.popularity >
              Match?.teamB?.team?.level.popularity
                ? true
                : false
            }
          />
          <View
            style={{
              alignItems: 'center',
              marginHorizontal: 20,
              marginTop: I18nManager.isRTL ? -20 : -50,
            }}>
            <TagLabel
              text={Match?.matchStatus}
              backgroundColor={
                Match?.matchStatus == 'LIVE' || Match?.matchStatus == 'UPCOMING'
                  ? 'rgba(0, 255, 148, 0.2)'
                  : 'rgba(204, 204, 204, 0.2)'
              }
              borderColor={
                Match?.matchStatus == 'LIVE' || Match?.matchStatus == 'UPCOMING'
                  ? Colors.SuccessGreen
                  : '#CCCCCC'
              }
              TextStyle={{
                color:
                  Match?.matchStatus == 'LIVE' ||
                  Match?.matchStatus == 'UPCOMING'
                    ? Colors.SuccessGreen
                    : '#CCCCCC',
              }}
            />
            <TextComponent
              text={
                Match?.matchStatus == 'LIVE'
                  ? ''
                  : moment(Match?.matchDate).format('DD/MM')
              }
              style={[
                styles.Matchtitle,
                {
                  color:
                    Match?.matchStatus == 'LIVE'
                      ? Colors.SuccessGreen
                      : '#CCCCCC',
                  marginTop: 5,
                },
              ]}
            />
            <TextComponent
              text={`${Match?.teamA?.score} - ${Match?.teamB?.score}`}
              style={styles.MatchScore}
            />
          </View>
          <TeamCard
            teamImage={
              Match?.teamB?.team?.logo
                ? {uri: Match?.teamB?.team?.logo}
                : createLogo
            }
            teamName={Match?.teamB?.team?.teamName}
            titleStyle={{color: Colors.White}}
            Like={true}
            likecount={
              Match?.teamB?.team?.level.popularity
                ? Match?.teamB?.team?.level.popularity
                : 10
            }
            disabled={true}
            isLike={
              Match.teamSupport?.supportTo?.id == Match?.teamB?.team?.id
                ? true
                : false
            }
            onPressLike={() => {
              support(Match?.id, 'TEAM', Match?.teamB.team.id);
            }}
            isWin={
              Match?.teamB?.team?.level.popularity >
              Match?.teamA?.team?.level.popularity
                ? true
                : false
            }
          />
        </View>
        <TouchableOpacity
          style={styles.MatchViewFooter}
          onPress={() =>
            Match?.tournament?.locationUrl
              ? Linking.openURL(Match?.tournament?.locationUrl)
              : null
          }>
          <TextComponent
            text={Match?.matchLocation}
            style={styles.Matchtitle}
          />
        </TouchableOpacity>
      </ImageBackground>
      {Match?.matchStatus == 'UPCOMING' ? (
        <MatchSupport />
      ) : (
        <TopTab
          components={[
            {
              component: TimeLines,
              name: 'Timeline',
              label: t('Timeline'),
            },
            {
              component: Lineup,
              name: 'Lineup',
              label: t('Lineup'),
            },
            {
              component: MatchSupport,
              name: 'MatchSupport',
              label: t('Support'),
            },
          ]}
        />
      )}
    </View>
  );
};

export default MatchDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.homeGray,
  },
  MatchView: {
    height: 210,
    backgroundColor: 'rgba(25, 10, 65, 0.55)',
    // borderRadius: 20,
    paddingTop: 10,
    alignItems: 'center',
  },
  MatchViewTeam: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  MatchViewFooter: {
    flex: 1,
    maxHeight: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Matchtitle: {
    fontSize: 13,
    textAlign: 'center',
    color: Colors.White,
  },
  MatchScore: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.White,
    marginTop: 5,
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    color: Colors.textColor,
    marginBottom: 5,
  },
  green: {
    fontSize: 14,
    // textAlign: 'center',
    color: '#00AF66',
  },
  red: {
    fontSize: 14,
    // textAlign: 'center',
    color: Colors.ErrorRed,
  },
});
