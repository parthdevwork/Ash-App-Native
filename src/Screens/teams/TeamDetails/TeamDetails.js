import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../Components/Header';
import {Colors} from '../../../Config/Colors';
import {
  redBanner,
  redLogo,
  Rating,
  Popularity,
  kick,
  infoCircle,
  infoCircle2,
  pencil,
  createPic,
  createLogo,
} from '../../../Components/Assets';
import TextComponent from '../../../Components/TextComponent';
import TopTab from '../../../Navigation/TopTabs/TopTab';
import TeamStatistics from './TeamStatistics';
import TeamMatches from './TeamMatches';
import TeamPlayers from './TeamPlayers';
import TeamAwards from './TeamAwards';
import Modal from '../../../Components/Modal';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {constraints} from '../../../Config/Constraints';
import {useNavigation} from '@react-navigation/native';
import Image from '../../../Components/Image';

const TeamDetails = props => {
  const {t, i18n} = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const TeamDetails = useSelector(state => state.TeamReducer.SelectedTeam);
  const user = useSelector(state => state.AuthReducer.user);

  const navigation = useNavigation();

  return (
    <View style={styles.mainContainer}>
      <Header
        title={TeamDetails?.teamName}
        leftIcon={true}
        rightIcon={user.id == TeamDetails?.user ? true : false}
        onPressRightIcon={() =>
          navigation.navigate('CreateNewTeam', {
            screen: 'TeamDetails',
            TeamDetails,
          })
        }
        IconRight={
          <Image
            source={pencil}
            style={{width: 25, height: 20}}
            resizeMode={'contain'}
          />
        }
      />
      <View>
        <Image
          source={TeamDetails?.cover ? {uri: TeamDetails?.cover} : createPic}
          style={styles.main_image}
          resizeMode={'stretch'}
        />
        <TouchableOpacity
          style={styles.info_image}
          onPress={() => setOpenModal(true)}>
          <Image source={infoCircle} style={{width: 20, height: 20}} />
        </TouchableOpacity>
      </View>

      <View style={styles.upper_view}>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 100,
            marginTop: -50,
            height: 80,
            width: 80,
            alignItems: 'center',
            justifyContent: 'center',
            ...constraints.myShadow,
          }}>
          <Image
            source={TeamDetails?.logo ? {uri: TeamDetails?.logo} : createLogo}
            style={styles.logo_image}
            resizeMode={'stretch'}
          />
        </View>
        <View style={[styles.flxDR, {width: '40%'}]}>
          <Image source={Rating} style={styles.short_image} />
          <View style={{marginLeft: 5}}>
            <TextComponent text={t('Points')} style={styles.span} />
            <TextComponent
              text={TeamDetails?.level?.points}
              style={styles.points}
            />
          </View>
        </View>

        <View style={styles.flxDR}>
          <Image source={Popularity} style={styles.short_image} />
          <View style={{marginLeft: 5}}>
            <TextComponent text={t('Popularity')} style={styles.span} />
            <TextComponent
              text={TeamDetails?.level?.popularity}
              style={styles.points}
            />
          </View>
        </View>
      </View>

      <TopTab
        components={[
          {
            component: TeamStatistics,
            name: 'Statistics',
            label: t('Statistics'),
          },
          {
            component: TeamMatches,
            name: 'Matches',
            label: t('Matches'),
          },
          {
            component: TeamPlayers,
            name: 'Players',
            label: t('Players'),
          },
          {
            component: TeamAwards,
            name: 'Awards',
            label: t('Awards'),
          },
        ]}
      />

      <Modal
        visible={openModal}
        close={true}
        OnClose={() => setOpenModal(false)}>
        <View
          style={{
            minHeight: 200,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <Image source={infoCircle2} style={styles.info_image2} />
            <TextComponent
              text={'Team’s Bio'}
              style={{fontSize: 20, marginLeft: 5}}
            />
          </View>
          <TextComponent
            style={styles.modal_text}
            text={TeamDetails?.teamBio}
          />
        </View>
      </Modal>
    </View>
  );
};

export default TeamDetails;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.homeGray,
  },

  main_image: {
    alignSelf: 'center',
    width: '100%',
    height: 160,
  },
  logo_image: {
    width: 75,
    height: 75,
    // resizeMode: 'contain',
    borderRadius: 100,
  },
  short_image: {
    width: 30,
    height: 30,
  },
  modal_text: {
    fontSize: 14,
    marginVertical: 15,
    lineHeight: 20,
    textAlign: 'center',
    marginHorizontal: 15,
  },
  flxDR: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  span: {
    color: Colors.gray,
    fontSize: 11,
  },

  points: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  upper_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  info_image: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  info_image2: {
    width: 25,
    height: 25,
  },
});
