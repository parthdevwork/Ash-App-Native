import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import TeamCard from '../../../Components/TeamCard';
import TextComponent from '../../../Components/TextComponent';
import {Colors} from '../../../Config/Colors';
import {jeddah, fcGrinta, hajer, pattern} from '../../../Components/Assets';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {HomeMiddleware} from '../../../Store/Middleware/HomeMiddleware';

const TeamMatches = () => {
  const {t, i18n} = useTranslation();
  const TeamDetails = useSelector(state => state.TeamReducer.SelectedTeam);
  const Match = useSelector(state => state.HomeReducer.MatchDetail);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const renderMatchDetailCard = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (Match && Match.id == item.id) {
            navigation.navigate('MatchDetails');
          } else {
            dispatch(HomeMiddleware.getMatchDetails({id: item?.id}))
              .then(() => navigation.navigate('MatchDetails'))
              .catch();
          }
        }}>
        <View style={styles.mini_header}>
          <TextComponent
            style={styles.header_text}
            text={moment(item.matchDate).format('LLLL')}
          />
        </View>
        <View style={styles.view}>
          <ImageBackground source={pattern} style={styles.MatchView}>
            <View style={styles.MatchViewTeam}>
              <TeamCard
                teamImage={{uri: item?.teamA.team.logo}}
                teamName={item?.teamA.team.teamName}
              />
              <View
                style={{
                  alignItems: 'center',
                  marginHorizontal: 20,
                  marginTop: -30,
                }}>
                <TextComponent
                  text={`${item?.teamA.score} - ${item?.teamB.score}`}
                  style={[styles.MatchScore, {fontSize: 24}]}
                />
              </View>
              <TeamCard
                teamImage={{uri: item?.teamB.team.logo}}
                teamName={item?.teamB.team.teamName}
              />
            </View>
            <View style={styles.MatchViewFooter}>
              <TextComponent
                text={item.matchLocation}
                style={styles.Matchtitle}
                numberOfLines={1}
              />
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.sub_container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={TeamDetails?.matches}
          renderItem={renderMatchDetailCard}
          keyExtractor={item => item?.id}
          ListEmptyComponent={
            <View style={{alignItems: 'center'}}>
              <TextComponent
                text={t('No Match Found')}
                style={{alignSelf: 'center'}}
              />
            </View>
          }
        />
      </View>
    </View>
  );
};

export default TeamMatches;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.homeGray,
    paddingHorizontal: 10,
  },
  mini_header: {
    width: '100%',
    backgroundColor: Colors.light_opacity,
    borderRadius: 5,
    alignSelf: 'center',
    padding: 5,
    alignItems: 'center',
    marginVertical: 15,
  },
  header_text: {
    color: Colors.Blue,
    fontSize: 12,
  },
  MatchView: {
    width: '100%',
    height: 150,
    backgroundColor: Colors.White,
    borderRadius: 20,
    marginBottom: 5,
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
    backgroundColor: Colors.Dark_Blue,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
    color: '#190A41',
    marginTop: 5,
  },
  sub_container: {
    alignSelf: 'center',
    width: '90%',
  },
});
