import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Linking,
  I18nManager,
  Modal,
} from 'react-native';
import TagLabel from '../../Components/TagLabel';
import TextComponent from '../../Components/TextComponent';
import {
  info,
  dollar,
  Female,
  calender,
  Male,
  locationpin,
  Tbanner,
  awards,
  medal1,
  teamLogo1,
  medal2,
  teamLogo2,
  medal3,
  teamLogo3,
} from '../../Components/Assets';
import {Colors} from '../../Config/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import Committees from './DetailsTabs/Committees';
import Terms from './DetailsTabs/Terms';
import Sponsors from './DetailsTabs/Sponsors';
import Awards from './DetailsTabs/Awards';
import TopTab from '../../Navigation/TopTabs/TopTab';
import Header from '../../Components/Header';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import moment from 'moment';
import Image from '../../Components/Image';

const TournamentDetails = props => {
  const {t, i18n} = useTranslation();
  const Tour = useSelector(state => state.HomeReducer.TourDetails);
  const [openModal, setOpenModal] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <Header leftIcon={true} title={Tour?.title} />
      <View style={styles.TourView}>
        <Image
          source={Tour?.thumbnail ? {uri: Tour?.thumbnail} : Tbanner}
          style={styles.TBanner}
          resizeMode={'stretch'}
        />
        <View style={styles.Theader}>
          <TagLabel
            text={Tour?.status}
            backgroundColor={
              Tour?.status != 'ONGOING' ? Colors.White : Colors.SuccessGreen
            }
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TagLabel
              text={Tour?.ageGroup + ' Y'}
              pH={10}
              backgroundColor={Colors.White}
            />
            <Image
              source={Tour?.isForMales ? Male : Female}
              style={{width: 25, height: 25, marginLeft: 5, borderRadius: 25}}
              resizeMode={'contain'}
            />
          </View>
        </View>

        <View style={styles.TourViewOuterFooter}>
          <View style={styles.TourViewInnerFooter}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={info}
                style={{width: 16, height: 20, marginRight: 3}}
                resizeMode={'contain'}
              />
              <TextComponent
                text={Tour?.tournamentType}
                style={styles.Tourtitle}
              />
            </View>

            <View
              style={{
                flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
                alignItems: 'center',
              }}>
              <Image
                source={dollar}
                style={{width: 18, height: 20, marginRight: 3}}
                resizeMode={'contain'}
              />
              <TextComponent
                text={' ' + Tour?.entryFees + ' Sar'}
                style={styles.Tourtitle}
              />
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={calender}
                style={{width: 18, height: 20, marginRight: 3}}
                resizeMode={'contain'}
              />
              <TextComponent
                text={`${moment(Tour?.startsFrom).format('DD MMM')} - ${moment(
                  Tour?.endsAt,
                ).format('DD MMM')}`}
                style={styles.Tourtitle}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '65%',
              }}>
              <Image
                source={locationpin}
                style={{width: 16, height: 20, marginRight: 3}}
                resizeMode={'contain'}
              />
              <TextComponent
                numberOfLines={1}
                text={Tour?.location}
                style={styles.Touraddress}
              />
            </View>
            <TouchableOpacity
              style={styles.directionButton}
              onPress={() =>
                Tour?.locationUrl ? Linking.openURL(Tour.locationUrl) : null
              }>
              <TextComponent style={styles.buttonText} text={t('Directions')} />
              <Entypo
                name={!I18nManager.isRTL ? 'chevron-right' : 'chevron-left'}
                size={15}
                color={Colors.Blue}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TopTab
        components={[
          {
            component: Terms,
            name: 'Terms',
            label: t('Terms'),
          },
          {
            component: Committees,
            name: 'Committees',
            label: t('Comitees'),
          },
          {
            component: Sponsors,
            name: 'Sponsors',
            label: t('Sponsors'),
          },
          {
            component: Awards,
            name: 'Awards',
            label: t('Awards'),
          },
        ]}
      />
    </View>
  );
};

export default TournamentDetails;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.homeGray,
  },
  TourView: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: Colors.White,
    maxHeight: 240,
  },
  TBanner: {
    width: '100%',
    height: 150,
    // resizeMode: 'contain',
  },
  Theader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 10,
    width: '100%',
    paddingHorizontal: 10,
  },
  date_View: {
    position: 'absolute',
    top: 38,
    width: '100%',
    paddingHorizontal: 10,
  },
  date_text: {
    color: Colors.SuccessGreen,
    fontSize: 12,
    margin: 5,
  },
  TourViewOuterFooter: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  TourViewInnerFooter: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
  },
  Tourtitle: {
    fontSize: 13,
    textAlign: 'center',
    color: '#190A41',
  },
  Touraddress: {
    fontSize: 13,
    //   textAlign: 'center',
    color: '#190A41',
    //   width: '80%'
  },
  TourScore: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#190A41',
    marginTop: 5,
  },
  no_data_found: {
    // fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 30,
  },
  directionButton: {
    backgroundColor: Colors.SuccessGreen,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 88,
  },
  buttonText: {
    color: Colors.Blue,
    fontSize: 14,
    padding: 2,
  },
});
