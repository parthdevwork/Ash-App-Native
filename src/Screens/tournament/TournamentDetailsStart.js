import React, {useState} from 'react';
import {
  View,
  StyleSheet,
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
  Female,
  calender,
  Male,
  locationpin,
  Tbanner,
  dollar,
  medal1,
  teamLogo1,
  medal2,
  teamLogo2,
  medal3,
  teamLogo3,
  awards,
} from '../../Components/Assets';
import {Colors} from '../../Config/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import TopTab from '../../Navigation/TopTabs/TopTab';
import Header from '../../Components/Header';
import Matches from './DetailsTabs/Matches';
import Statistics from './DetailsTabs/Statistics';
import TournamentTeam from './DetailsTabs/TournamentTeam';
import Sponsors from './DetailsTabs/Sponsors';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import moment from 'moment';
import Image from '../../Components/Image';

const TournamentDetailsStart = props => {
  const routeData = null;
  const {t, i18n} = useTranslation();
  const Tour = useSelector(state => state.HomeReducer.TourDetails);
  const [openModal, setOpenModal] = useState(false);

  const model_json = [
    {
      priceImg: medal1,
      teamImg: teamLogo1,
      teamName: 'Real madrid',
      price: '1st Place',
    },
    {
      priceImg: medal2,
      teamImg: teamLogo2,
      teamName: 'FC Barcelona',
      price: '2st Place',
    },
    {
      priceImg: medal3,
      teamImg: teamLogo3,
      teamName: 'Liverpool FC',
      price: '3st Place',
    },
  ];

  return (
    <View style={styles.mainContainer}>
      <Header
        leftIcon={true}
        title={Tour?.title}
        showAward={Tour.status === 'CLOSED' ? true : false}
        showList={() => setOpenModal(true)}
      />
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

            {/* <View
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
            </View> */}

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
      <Modal
        visible={openModal }
        transparent={true}
        onRequestClose={() => setOpenModal(true)}
        >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              paddingTop: 15,
              width: '90%',
              backgroundColor: Colors.White,
              borderRadius: 15,
              alignItems: 'center',
            }}>
            <Image source={awards} style={{height: 66, width: 66}} />
            <TextComponent
              text="Awards & Winners"
              style={{
                color: Colors.textColor,
                marginTop: 10,
                fontSize: 20,
                fontWeight: '600',
              }}
            />
            <View style={{marginTop: 25}} />
            <FlatList
              data={model_json}
              renderItem={({item}) => {
                return (
                  <View style={{alignItems: 'center'}}>
                    <View
                      style={{
                        width: '95%',
                        backgroundColor: Colors.box_gray,
                        height: 75,
                        borderRadius: 20,
                        marginTop: 10,
                        borderRadius: 10,
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          width: '25%',
                          height: 75,
                          alignItems: 'center',
                          paddingTop: 5,
                          borderTopLeftRadius: 10,
                          borderBottomLeftRadius: 10,
                          backgroundColor: Colors.box_white,
                        }}>
                        <Image
                          source={item.priceImg}
                          style={{height: 32, width: 32, marginTop: 5}}
                        />
                        <TextComponent
                          text={item.price}
                          style={{
                            fontSize: 10,
                            color: Colors.likeGray,
                            marginTop: 10,
                            fontWeight:"400"
                          }}
                        />
                      </View>
                      <View
                        style={{
                          marginLeft: 2,
                          backgroundColor: Colors.box_white,
                          width: '70%',
                          flexDirection: 'row',
                        }}>
                        <View
                          style={{
                            height: 75,
                            width: '32%',
                            justifyContent: 'center',
                            marginLeft: 25,
                          }}>
                          <Image
                            source={item.teamImg}
                            style={{height: 36, width: 36}}
                          />
                        </View>
                        <View
                          style={{
                            height: 75,
                            width: '62%',
                            borderTopRightRadius: 15,
                            position: 'absolute',
                            borderBottomRightRadius: 15,
                            justifyContent: 'center',
                            marginLeft: 75,
                          }}>
                          <TextComponent
                            text={item.teamName}
                            style={{fontSize: 15, fontWeight: '600',color:Colors.textColor }}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
            <TouchableOpacity
              onPress={() => setOpenModal(false)}
              style={{
                backgroundColor: Colors.btn_Color,
                height: 58,
                width: '100%',
                marginTop: 35,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TextComponent
                text="Close"
                style={{color: Colors.White, fontSize: 17, fontWeight: '600'}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TopTab
        components={[
          {
            component: Matches,
            name: 'Matches',
            label: t('Matches'),
          },
          {
            component: Statistics,
            name: 'Statistics',
            label: t('Statistics'),
          },
          {
            component: TournamentTeam,
            name: 'Teams',
            label: t('Teams'),
          },
          {
            component: Sponsors,
            name: 'Sponsors',
            label: t('Sponsors'),
          },
        ]}
      />
    </View>
  );
};

export default TournamentDetailsStart;

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
    textTransform: 'capitalize',
  },
  Touraddress: {
    fontSize: 13,
    color: '#190A41',
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
