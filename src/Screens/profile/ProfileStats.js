import React from 'react';
import {StyleSheet, View, FlatList, Image, I18nManager} from 'react-native';
import {Colors} from '../../Config/Colors';
import {TextComponent} from '../../Components';
import {
  assist,
  Balltrophy,
  goal,
  goalie,
  goalPost,
  kick,
  ManOTM,
  rcard,
  ycard,
} from '../../Components/Assets';
import {useSelector} from 'react-redux';

const ProfileStats = () => {
  const user = useSelector(state => state.AuthReducer.user);

  const Progress = [
    {
      id: 1,
      title: 'Matches',
      image: kick,
      score: user?.statistics?.matches,
    },
    {
      id: 2,
      title: 'Tournaments',
      score: user?.statistics?.tournaments,
      image: Balltrophy,
    },
    {
      id: 5,
      title: 'Goals',
      score: user?.statistics?.goals,
      image: goal,
    },
    {
      id: 3,
      title: 'Yellow Cards',
      image: ycard,
      score: user?.statistics?.yellowCards,
    },

    {
      id: 4,
      title: 'Red Cards',
      image: rcard,
      score: user?.statistics?.redCards,
    },
    {
      id: 6,
      title: 'Assist',
      image: assist,
      score: user?.statistics?.assists,
    },
    {
      id: 7,
      title: 'Man of the Match',
      image: ManOTM,
      score: user?.statistics?.menOfTheMatch,
    },
    {
      id: 8,
      title: 'Saves',
      image: goalie,
      score: user?.statistics?.saves,
    },
    {
      id: 9,
      title: 'Clean Sheet',
      image: goalPost,
      score: user?.statistics?.cleanSheets,
    },
  ];

  const renderStats = ({item, index}) => {
    return (
      <View style={styles.View}>
        <Image
          source={item.image}
          style={{width: 28, height: 28, marginBottom: 5}}
          resizeMode={'contain'}
        />
        <TextComponent
          text={item.title}
          style={{fontSize: 12, color: '#666666'}}
        />

        <TextComponent
          text={item.score}
          style={{
            fontSize: I18nManager.isRTL ? 22 : 28,
            color: Colors.textColor,
            fontWeight: '600',
            marginTop: I18nManager.isRTL ? 0 : 5,
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={Progress}
        numColumns={3}
        // style={{marginTop:10}}
        contentContainerStyle={{alignItems: 'center'}}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={renderStats}
      />
    </View>
  );
};

export default ProfileStats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  View: {
    marginHorizontal: 5,
    marginBottom: 12,
    backgroundColor: Colors.White,
    borderRadius: 20,
    padding: 10,
    minWidth: 115,
    height: 115,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
