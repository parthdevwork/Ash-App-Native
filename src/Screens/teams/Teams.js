import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  I18nManager,
} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../../Components/Header';
import {Colors} from '../../Config/Colors';
import {teamImage, persons, request} from '../../Components/Assets';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TextComponent from '../../Components/TextComponent';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {TeamMiddleware} from '../../Store/Middleware/TeamMiddleware';

const Teams = () => {
  const {t, i18n} = useTranslation();
  const navigation = useNavigation();

  const TeamData = useSelector(state => state.TeamReducer.ManageTeam);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(TeamMiddleware.teamManagement());
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Header title={t('Teams')} />
      <ScrollView style={styles.innerContainer}>
        <Image source={teamImage} style={styles.image} 
         resizeMode={'contain'}
        />

        <TouchableOpacity
          style={styles.option}
          onPress={() =>
            navigation.navigate('TeamManagement', {Screen: 'My Teams'})
          }>
          <View style={styles.flxDR}>
            <Image source={persons} style={styles.icon_image} resizeMode={'contain'} />
            <TextComponent text={t('My Teams')} style={styles.left} />
          </View>
          <View style={styles.flxDR}>
            <TextComponent text={TeamData?.teams?.length} />
            <MaterialIcons
              name={I18nManager.isRTL ? 'keyboard-arrow-left' : 'keyboard-arrow-right'}
              size={30}
              color={Colors.Blue}
              style={styles.left}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() =>
            navigation.navigate('TeamManagement', {Screen: 'Pending Requests'})
          }>
          <View style={styles.flxDR}>
            <Image source={request} style={styles.icon_image} resizeMode={'contain'}/>
            <TextComponent text={t('Pending Requests')} style={styles.left} />
          </View>
          <View style={styles.flxDR}>
            <TextComponent text={TeamData?.requests?.length} />
            <MaterialIcons
              name={ I18nManager.isRTL ? 'keyboard-arrow-left' : 'keyboard-arrow-right'}
              size={30}
              color={Colors.Blue}
              style={styles.left}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.footerView}>
          <TextComponent
            text={t(
              'You can also become a coach and create your own team or browse the teams to request to join your dream team',
            )}
            style={styles.text}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate('CreateNewTeam')}
            style={styles.create_button}>
            <TextComponent
              style={styles.button_text}
              text={t('Create New Team')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('AllTeams')}
            style={styles.browse_button}>
            <TextComponent
              style={styles.button2_text}
              text={t('Browse All Teams')}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Teams;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.homeGray,
  },
  innerContainer: {
    paddingVertical: 15,
  },
  image: {
    alignSelf: 'center',
    width: '100%',
    height: 140,
    marginVertical: 16,
  },
  icon_image: {
    width: 30,
    height: 30,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 17,
    backgroundColor: Colors.White,
    borderColor: Colors.light_opacity,
    borderWidth: 0.5,
  },
  flxDR: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    marginLeft: 10,
  },
  text: {
    color: Colors.likeGray,
    fontSize: 13,
    textAlign: 'center',
    marginVertical: 15,
  },
  footerView: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 10,
  },
  create_button: {
    backgroundColor: Colors.Dark_Blue,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    marginTop: 10,
  },
  browse_button: {
    backgroundColor: 'transparent',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    marginTop: 10,
    borderColor: Colors.Dark_Blue,
    borderWidth: 1,
  },
  button_text: {
    color: Colors.White,
    fontSize: 15,
  },
  button2_text: {
    color: Colors.Dark_Blue,
    fontSize: 15,
  },
});
