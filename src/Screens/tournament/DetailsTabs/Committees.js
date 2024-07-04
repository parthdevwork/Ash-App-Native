import React from 'react';
import {Text, View, StyleSheet, Image, FlatList} from 'react-native';
import {
  man1,
  man2,
  man3,
  man4,
  man5,
  picture,
} from '../../../Components/Assets';
import {Colors} from '../../../Config/Colors';
import TextComponent from '../../../Components/TextComponent';
import Entypo from 'react-native-vector-icons/Entypo';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

const Committees = () => {
  const {t, i18n} = useTranslation();
  const Tour = useSelector(state => state.HomeReducer.TourDetails);
  
  const renderCommitteesItem = ({item}) => {
    return (
      <View style={styles.card}>
        <View style={styles.upperView}>
          <Image
            source={item?.avatar ? {uri: item?.avatar} : picture}
            style={styles.image}
          />
          <View style={styles.heading_view}>
            <TextComponent style={styles.heading} text={item?.name} />
            <TextComponent style={styles.text} text={item?.position} />
          </View>
        </View>
        <Entypo name="info" size={20} color={Colors.Blue} />
      </View>
    );
  };

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      data={Tour.committees}
      renderItem={renderCommitteesItem}
      keyExtractor={item => item?._id}
      // ListEmptyComponent={
      //   <Text style={styles.no_data_found}>{t('No Commitees Found')}</Text>
      // }
    />
  );
};

export default Committees;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.homeGray,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  heading: {
    color: Colors.Blue,
    fontSize: 18,
  },
  text: {
    color: '#666666',
    fontSize: 12,
  },
  upperView: {
    flexDirection: 'row',
  },
  heading_view: {
    marginLeft: 17,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: Colors.White,
    alignItems: 'center',
    borderBottomColor: Colors.Light_gray,
    borderBottomWidth: 1,
  },
});
