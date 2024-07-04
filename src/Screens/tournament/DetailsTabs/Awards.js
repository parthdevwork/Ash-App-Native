import React from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import {Colors} from '../../../Config/Colors';
import {
  goldmedal,
  silvermedal,
  bronzemedal,
  handshake,
  trophy,
} from '../../../Components/Assets';
import TextComponent from '../../../Components/TextComponent';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

const Awards = () => {
  const Tour = useSelector(state => state.HomeReducer.TourDetails);
  const {t, i18n} = useTranslation();
  const Awards = [
    {
      id: 1,
      name: 'Cup + 10,000 SAR',
      img: goldmedal,
      desc: '1st Place',
    },
    {
      id: 2,
      name: '5,000 SAR',
      img: silvermedal,
      desc: '2nd Place',
    },
    {
      id: 3,
      name: '1,500 SAR',
      img: bronzemedal,
      desc: '3rd Place',
    },
    {
      id: 4,
      name: '500 SAR',
      img: handshake,
      desc: 'Fair Place',
    },
  ];

  const renderAwardsItem = ({item}) => {
    return (
      <View style={styles.card}>
        <View style={[styles.heading_view]}>
          <Image
            source={item?.icon ? {uri: item?.icon} : trophy}
            style={styles.image}
          />
          <TextComponent style={styles.text} text={item?.label} />
        </View>
        <View style={{alignItems:"center",alignSelf:"center",flex:1}}>

        <TextComponent style={[styles.heading,{}]} text={`${item?.prize} SAR` } />
        </View>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.hr}></View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        data={Tour.awards}
        renderItem={renderAwardsItem}
        keyExtractor={item => item?.id}
        // ListEmptyComponent={
        //   <Text style={styles.no_data_found}>{t('No Awards Found')}</Text>
        // }
      />
    </View>
  );
};

export default Awards;

const styles = StyleSheet.create({
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
    paddingHorizontal: 0,
    backgroundColor: Colors.White,
    alignItems: 'center',
    width: '90%',
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
    fontWeight:"600"
    // flex: 1,
    // textAlign: 'center',
  },
  text: {
    color: '#666666',
    fontSize: 12,
  },
});
