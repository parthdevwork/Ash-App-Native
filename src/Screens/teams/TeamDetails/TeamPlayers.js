import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  I18nManager,
  Pressable,
} from 'react-native';
import TextComponent from '../../../Components/TextComponent';
import {Colors} from '../../../Config/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  management,
  PlayerImg
} from '../../../Components/Assets';
import {ScrollView} from 'react-native-gesture-handler';
import TagLabel from '../../../Components/TagLabel';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

const TeamPlayers = () => {
  const {t, i18n} = useTranslation();
  const [open, setopen] = useState(false);
  const [openx, setopenx] = useState(false);
  const navigation = useNavigation();
  const TeamDetails = useSelector(state => state.TeamReducer.SelectedTeam);
  const user = useSelector(state => state.AuthReducer.user);

  // const goalKeepers = [
  //   {
  //     id: 1,
  //     name: 'Wallace Wood',
  //     img: goalperson1,
  //     label: 'GK',
  //   },
  //   {
  //     id: 2,
  //     name: 'Andrew Stewart',
  //     img: goalperson2,
  //     label: 'GK',
  //   },
  // ];
  // const defenders = [
  //   {
  //     id: 1,
  //     name: 'Douglas Wells',
  //     img: defender1,
  //     label: 'CB',
  //   },
  //   {
  //     id: 2,
  //     name: 'Amelie Butler',
  //     img: defender2,
  //     label: 'LB',
  //   },
  //   {
  //     id: 3,
  //     name: 'Ira Burns',
  //     img: defender3,
  //     label: 'BB',
  //   },
  // ];

  const renderItem = ({item}) => {
    return (
      <Pressable style={styles.option} onPress={()=>navigation.navigate('Profile')}>
        <View style={styles.flxDR}>
          <Image
            source={item?.picture ? {uri: item?.picture} : PlayerImg}
            style={styles.icon_image}
          />
          <TextComponent
            text={item?.fullName ? item?.fullName : '--'}
            style={styles.left}
          />
        </View>
        <View style={styles.flxDR}>
          <TagLabel
            text={item?.features?.inGamePosition?.shortPosition}
            bR={10}
            pH={8}
          />
          <MaterialIcons
            name={
              I18nManager.isRTL ? 'keyboard-arrow-left' : 'keyboard-arrow-right'
            }
            size={30}
            color={Colors.Blue}
            style={styles.left}
          />
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.ScrollView}
        showsVerticalScrollIndicator={false}>
        {user.id == TeamDetails?.user ? (
          <TouchableOpacity
            style={styles.green_header}
            onPress={() =>
              navigation.navigate('PlayersManagement', {id: TeamDetails.id})
            }>
            <Image source={management} style={styles.short_image} />
            <TextComponent
              text={t('Players Managment')}
              style={styles.heading}
            />
          </TouchableOpacity>
        ) : null}

        {/* <View style={styles.dropdown_header}>
          <TextComponent
            style={styles.dropdown_text}
            text={t('Goal Keepers')}
          />
          <TouchableOpacity onPress={() => setopen(!open)}>
            <MaterialIcons
              name={open ? 'arrow-drop-down' : 'arrow-drop-up'}
              color={Colors.gray}
              size={26}
            />
          </TouchableOpacity>
        </View> */}
        {/* {open ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={goalKeepers}
            renderItem={renderItem}
            keyExtractor={item => item?.id}
            ListEmptyComponent={
              <TextComponent
                style={styles.no_data_found}
                text={t('No data found')}
              />
            }
          />
        ) : null} */}

        {/* <View style={styles.dropdown_header}>
          <TextComponent style={styles.dropdown_text} text={t('Defenders')} />
          <TouchableOpacity onPress={() => setopenx(!openx)}>
            <MaterialIcons
              name={openx ? 'arrow-drop-down' : 'arrow-drop-up'}
              color={Colors.gray}
              size={26}
            />
          </TouchableOpacity>
        </View> */}

        <FlatList
          showsVerticalScrollIndicator={false}
          data={TeamDetails?.players}
          renderItem={renderItem}
          keyExtractor={item => item?.id}
          ListEmptyComponent={
            <View style={{alignItems: 'center'}}>
              <TextComponent
                style={styles.no_data_found}
                text={t('No Players found')}
              />
            </View>
          }
        />
      </ScrollView>
    </View>
  );
};

export default TeamPlayers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.homeGray,
    paddingHorizontal: 10,
  },
  short_image: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  heading: {
    fontSize: 15,
    marginLeft: 5,
  },
  green_header: {
    backgroundColor: Colors.SuccessGreen,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    width: '100%',
  },
  dropdown_header: {
    width: '100%',
    backgroundColor: Colors.light_opacity,
    borderRadius: 5,
    alignSelf: 'center',
    padding: 5,
    alignItems: 'center',
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  dropdown_text: {
    color: Colors.Blue,
    fontSize: 13,
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 17,
    backgroundColor: 'transparent',
    borderBottomColor: Colors.light_opacity,
    borderBottomWidth: 0.5,
  },
  flxDR: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon_image: {
    resizeMode: 'contain',
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  left: {
    marginLeft: 10,
  },
  no_data_found: {
    // fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 30,
  },
  ScrollView: {
    width: '95%',
    alignSelf: 'center',
  },
});
