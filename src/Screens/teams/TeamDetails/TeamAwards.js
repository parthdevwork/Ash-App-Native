import React from 'react';
import {StyleSheet, View, Image, FlatList} from 'react-native';
import {
  silvermedal,
  goldmedal,
  bronzemedal,
  handshake,
  score4,
  trophy,
  supporter,
} from '../../../Components/Assets';
import TextComponent from '../../../Components/TextComponent';
import {Colors} from '../../../Config/Colors';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

const TeamAwards = () => {
  const TeamDetails = useSelector(state => state.TeamReducer.SelectedTeam);
  const {t, i18n} = useTranslation();

  const renderAwardsItem = ({item}) => {
    return (
      <View style={styles.card}>
        <View style={styles.heading_view}>
          <Image
            source={item?.icon ? {uri: item?.icon} : trophy}
            style={styles.image}
          />
          <TextComponent style={styles.text} text={item?.label} />
        </View>
        <TextComponent style={styles.heading} text={item?.prize} />
      </View>
    );
  };
  return (
    <View style={styles.container}>
        <FlatList
          data={TeamDetails?.awards}
          numColumns={3}
          contentContainerStyle={{alignItems: 'center'}}
          renderItem={renderAwardsItem}
          keyExtractor={item => item?.id}
          ListEmptyComponent={
            <TextComponent
              text={t("No Any Award Yet")}
              style={styles.no_data_found}
            />
          }
        />
    </View>
  );
};

export default TeamAwards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.homeGray,
    // paddingVertical: 5,
  },
  mini_score_cards_view: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
  },
  score_mini_card: {
    marginHorizontal: 5,
    // marginTop: 5,
    marginVertical: 5,
    backgroundColor: Colors.White,
    borderRadius: 20,
    // paddingHorizontal: 10,
    minWidth: 115,
    height: 115,
    alignItems: 'center',
    justifyContent: 'center',
  },

  no_data_found: {
    // fontWeight: 'bold',
    alignSelf: 'center',
    // marginTop: 30,
    color: Colors.textColor,
  },
  hr: {
    borderBottomColor: Colors.Light_gray,
    borderBottomWidth: 2,
    alignSelf: 'stretch',
    width: '100%',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.White,
    alignItems: 'center',
    width: '98%',
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 10,
  },
  upperView: {
    flexDirection: 'row',
  },
  heading_view: {
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: '#F5F5F5',
    padding: 15,
  },
  heading: {
    color: Colors.Blue,
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
  },
  text: {
    color: '#666666',
    fontSize: 12,
  },
});
