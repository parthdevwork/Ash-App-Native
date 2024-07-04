import React from 'react';
import {
  SectionList,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import TextComponent from '../../../Components/TextComponent';
import { Colors } from '../../../Config/Colors';
import {
  sp1,
  sp2,
  sp3,
  sp4,
  sp5,
  sp6,
  sp7,
  sp8,
  sp9,
} from '../../../Components/Assets';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Image from '../../../Components/Image';


const Sponsors = () => {
  const { t, i18n } = useTranslation();
  const Tour = useSelector(state => state.HomeReducer.TourDetails);

  return (
    <View>
      <ScrollView>
        <View style={styles.hr}></View>
        <View style={styles.sub_view}>
          {Tour?.sponsors?.platinum?.length > 0 ?
            <View style={styles.mini_header}>
              <TextComponent style={styles.header_text} text={'Platinum'} />
            </View> : null}
          <FlatList
            data={Tour?.sponsors.platinum}
            contentContainerStyle={{ justifyContent: 'center' }}
            numColumns={3}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => item?.url ? Linking.openURL(item?.url) : null}>
                  <Image
                    source={{ uri: item.icon }}
                    style={styles.sponsor_image}
                    resizeMode={'stretch'}
                  />
                </TouchableOpacity>
              );
            }}
          />
          {Tour?.sponsors?.gold?.length > 0 ?
            <View style={styles.mini_header}>
              <TextComponent style={styles.header_text} text={'Gold'} />
            </View> : null}
          <FlatList
            data={Tour?.sponsors.gold}
            contentContainerStyle={{ justifyContent: 'center' }}
            numColumns={3}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => item?.url ? Linking.openURL(item?.url) : null}>
                  <Image
                    source={{ uri: item.icon }}
                    style={styles.sponsor_image}
                    resizeMode={'stretch'}
                  />
                </TouchableOpacity>
              );
            }}
          />
          {Tour?.sponsors?.silver?.length > 0 ?
            <View style={styles.mini_header}>
              <TextComponent style={styles.header_text} text={'Silver'} />
            </View> : null}
          <FlatList
            data={Tour?.sponsors.silver}
            // horizontal
            numColumns={3}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ justifyContent: 'center' }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => item?.url ? Linking.openURL(item?.url) : null}>
                  <Image
                    source={{ uri: item.icon }}
                    style={styles.sponsor_image}
                    resizeMode={'stretch'}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Sponsors;

const styles = StyleSheet.create({
  hr: {
    borderBottomColor: Colors.Light_gray,
    borderBottomWidth: 2,
    alignSelf: 'stretch',
    width: '100%',
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
  images_view: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sponsor_image: {
    // backgroundColor:'#000',
    height: 110,
    width: 110,
    resizeMode: 'contain',
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 5,
  },
  sub_view: {
    width: '90%',
    alignSelf: 'center',
  },
});
