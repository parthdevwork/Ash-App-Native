import React from 'react';
import {View, StyleSheet, Image, ScrollView, I18nManager} from 'react-native';
import TextComponent from '../../../Components/TextComponent';
import {
  score1,
  kick,
  score2,
  score3,
  score4,
  score5,
  score6,
} from '../../../Components/Assets';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../../Config/Colors';
import {ProgressBar} from 'rn-multi-progress-bar';
import {useSelector} from 'react-redux';

const TeamStatistics = () => {
  const {t, i18n} = useTranslation();
  const TeamDetails = useSelector(state => state.TeamReducer.SelectedTeam);

  const scores = [
    {
      id: 1,
      name: 'Tournaments',
      img: score1,
      score: TeamDetails?.statistics?.tournaments,
    },
    {
      id: 2,
      name: 'Goals',
      img: score2,
      score: TeamDetails?.statistics?.goals,
    },
    {
      id: 3,
      name: 'Goals Against',
      img: score3,
      score: TeamDetails?.statistics?.goalsAgainst,
    },
    {
      id: 4,
      name: 'Yellow Cards',
      img: score4,
      score: TeamDetails?.statistics?.yellowCards,
    },

    {
      id: 5,
      name: 'Red Cards',
      img: score5,
      score: TeamDetails?.statistics?.redCards,
    },

    {
      id: 6,
      name: 'Clean Sheet',
      img: score6,
      score: TeamDetails?.statistics?.cleanSheets,
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollview}
        showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.card_header}>
            <Image source={kick} style={styles.short_image} />
            <TextComponent
              text={t('Total matches played')}
              style={[styles.span, {marginHorizontal: -10}]}
            />
            <TextComponent
              text={TeamDetails?.statistics?.matches?.played}
              style={{fontWeight: 'bold', fontSize: 20}}
            />
          </View>

          <View style={styles.score_view}>
            <View style={styles.score_subview}>
              <TextComponent text={t('Win')} style={styles.span} />
              <TextComponent
                text={TeamDetails?.statistics?.matches?.won}
                style={styles.point_1}
              />
            </View>

            <View style={styles.score_subview}>
              <TextComponent text={t('Draw')} style={styles.span} />
              <TextComponent
                text={TeamDetails?.statistics?.matches?.draw}
                style={styles.point_2}
              />
            </View>

            <View style={styles.score_subview}>
              <TextComponent text={t('Loss')} style={styles.span} />
              <TextComponent
                text={TeamDetails?.statistics?.matches?.loss}
                style={styles.point_3}
              />
            </View>
          </View>
          <View style={{marginHorizontal: 15}}>
            <ProgressBar
              data={[
                {progress: 10, color: Colors.accepted},
                {progress: 5, color: Colors.yellow},
                {progress: 10, color: Colors.cancel_red},
              ]}
            />
          </View>
        </View>

        <View style={styles.mini_score_cards_view}>
          {scores?.map(item => {
            return (
              <View style={styles.score_mini_card}>
                <Image
                  source={item?.img}
                  style={{
                    width: 25,
                    height: 25,
                    resizeMode: 'contain',
                    marginBottom: 5,
                  }}
                />
                <TextComponent
                  text={item?.name}
                  style={{color: Colors.gray, fontSize: 10}}
                />
                <TextComponent
                  text={item?.score}
                  style={{
                    fontSize: 28,
                    color: Colors.textColor,
                    fontWeight: '600',
                    marginTop: 5,
                  }}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default TeamStatistics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.homeGray,
    marginBottom: 10,
  },
  scrollview: {
    width: '90%',
    alignSelf: 'center',
  },
  MatchViewTeam: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  MatchView: {
    width: 300,
    height: 150,
    backgroundColor: Colors.White,
    borderRadius: 20,
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
  card_header: {
    padding: 10,
    paddingHorizontal: 30,
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomColor: Colors.Light_gray,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  card: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: Colors.White,
  },
  short_image: {
    width: 30,
    height: 30,
  },
  span: {
    color: Colors.likeGray,
    fontSize: 14,
    fontFamily: I18nManager.isRTL
      ? 'NotoSansArabic-Regular'
      : 'OpenSans-Regular',
  },
  point_1: {
    fontSize: 20,
    color: Colors.accepted,
    fontWeight: 700,
  },
  point_2: {
    fontSize: 20,
    color: Colors.yellow,
    fontWeight: 700,
  },
  point_3: {
    fontSize: 20,
    color: Colors.cancel_red,
    fontWeight: 700,
  },
  score_subview: {
    alignItems: 'center',
  },
  score_view: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingTop: 10,
    justifyContent: 'space-around',
  },
  score_mini_card: {
    // marginHorizontal: 2,
    marginTop: 10,
    // marginBottom: 5,
    backgroundColor: Colors.White,
    borderRadius: 20,
    padding: 10,
    width: 110,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mini_score_cards_view: {
    marginTop: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
