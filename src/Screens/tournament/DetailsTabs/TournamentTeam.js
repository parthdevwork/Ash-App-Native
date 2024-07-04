import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  I18nManager,
} from 'react-native';
import {Colors} from '../../../Config/Colors';
import {
  team1,
  team2,
  team3,
  team5,
  team7,
  team8,
  goalperson1,
  goalperson2,
  defender1,
  defender3,
  defender2,
  persons,
  PlayerImg,
} from '../../../Components/Assets';
import {TextComponent} from '../../../Components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TagLabel from '../../../Components/TagLabel';
import TeamModal from '../../../Components/TeamModal';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {TeamMiddleware} from '../../../Store/Middleware/TeamMiddleware';

const TournamentTeam = () => {
  const [open, setopen] = useState(false);
  const [Team, setTeam] = useState(null);
  const isFocused = useIsFocused();

  const navigation = useNavigation();
  const Tour = useSelector(state => state.HomeReducer.TourDetails);
  const dispatch = useDispatch();
  const PlayerData = useSelector(state => state.TeamReducer.ManagePlayer);
  const sortedData = PlayerData?.sort((a, b) => a.player.shirt - b.player.shirt);
  useEffect(() => {
    if (Team && Team.id != null) {
      dispatch(
        TeamMiddleware.getTeamPlayers({
          id: Team.id,
          tournament: Tour.id,
        }),
      );
    }
  }, [isFocused, Team, Tour]);

  const MyTeamsList = [
    {
      id: 1,
      name: 'Real Madrid CF',
      image: team1,
      isParticipated: true,
      desc: 'Now participating in the "Champions League"',
    },
    {
      id: 2,
      name: 'FC Barcelona',
      image: team2,
      isParticipated: true,
      desc: 'Now participating in the "European League"',
    },
    {
      id: 3,
      name: 'Liverpool FC',
      image: team3,
      isParticipated: false,
    },
    {
      id: 4,
      name: 'Manchester United FC',
      image: team5,
      isParticipated: false,
    },
    {
      id: 5,
      name: 'Juventus FC',
      image: team8,
      isParticipated: false,
    },
    {
      id: 6,
      name: 'FC Bayern Munich',
      image: team7,
      isParticipated: false,
    },
  ];
  const Players = [
    {
      id: 1,
      name: 'Wallace Wood',
      img: goalperson1,
      label: 'GK',
      eligible: 1,
    },
    {
      id: 2,
      name: 'Andrew Stewart',
      img: goalperson2,
      label: 'GK',
      eligible: 2,
      reason: 'Age not applicable',
    },
    {
      id: 3,
      name: 'Douglas Wells',
      img: defender1,
      label: 'CB',
      eligible: 4,
    },
    {
      id: 4,
      name: 'Ira Burns',
      img: defender3,
      label: 'BB',
      eligible: 6,
    },
    {
      id: 5,
      name: 'Wallace Wood',
      img: goalperson1,
      label: 'GK',
      eligible: 7,
      reason: 'Gender not applicable',
    },
    {
      id: 6,
      name: 'Andrew Stewart',
      img: goalperson2,
      label: 'GK',
      eligible: 11,
    },
    {
      id: 7,
      name: 'Amelie Butler',
      img: defender2,
      label: 'LB',
      eligible: 16,
      reason: 'Participate in another tournament',
    },
    {
      id: 8,
      name: 'Douglas Wells',
      img: defender1,
      label: 'CB',
      eligible: 77,
    },
    {
      id: 9,
      name: 'Andrew Stewart',
      img: goalperson2,
      label: 'GK',
      eligible: 88,
    },
  ];
  const renderTeamItem = ({item}) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.option}
          onPress={() => {
            setopen(true), setTeam(item.team);
          }}>
          <View style={styles.flxDR}>
            <Image
              source={item?.team.logo ? {uri: item?.team.logo} : team1}
              style={styles.icon_image}
            />
            <TextComponent
              text={item?.team.teamName ? item?.team.teamName : '--'}
              style={styles.left}
            />
          </View>
          <MaterialIcons
            name={
              I18nManager.isRTL ? 'keyboard-arrow-left' : 'keyboard-arrow-right'
            }
            size={30}
            color={Colors.Blue}
            style={styles.left}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const renderModalListItem = ({item, index}) => {
    return (
      <View style={[styles.Menu, {paddingHorizontal:15,borderBottomWidth:1,borderBottomColor:Colors.box_gray}]}>
        <TextComponent
          text={item?.player.shirt}
          style={[styles.MenuText, , {width:24,marginRight:5}]}
        />
        <Image
          source={
            item?.player?.id?.picture ? {uri : item?.player?.id?.picture} : PlayerImg
          }
          style={[styles.icon_image, {height:36,width:36,borderWidth:0.5,borderColor:Colors.SuccessGreen}]}
          resizeMode={'contain'}
        />
        <View style={{marginLeft: 20, flex: 1}}>
          <TextComponent
            text={
              item?.player?.id?.fullName ? item?.player?.id?.fullName : '--'
            }
            style={styles.MenuText}
          />
        </View>
        <TagLabel
          text={item?.player?.id?.features?.inGamePosition?.shortPosition}
          bR={5}
          pH={8}
          TextStyle={{
            fontSize: 14,
            marginVertical: 2,
            fontWeight: '700',
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={Tour.teams}
        renderItem={renderTeamItem}
        keyExtractor={item => item?.id}
        ListEmptyComponent={
          <Text style={styles.no_data_found}>No Teams Available</Text>
        }
      />

      <TeamModal
        visible={open}
        buttonText={'Check Team Profile'}
        onClose={() => {
          setopen(false),
            setTimeout(() => {
              dispatch(TeamMiddleware.teamDetails({id: Team.id}))
                .then(() => {
                  navigation.navigate('TeamDetails');
                })
                .catch();
            }, 0);
        }}
        children={
          <View>
            <View style={{alignItems: 'center', padding: 10}}>
              <Image
                source={Team?.logo ? {uri: Team?.logo}  : PlayerImg}
                style={styles.modal_image}
              />
              <TextComponent text={Team?.teamName} style={{marginVertical:8}}/>
              <TextComponent
                text={'List of players participating in this tournament'}
                style={[styles.bio,{fontSize: 12}]}
              />
            </View>
            <View style={{backgroundColor: Colors.White,height:450}}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={sortedData}
                renderItem={renderModalListItem}
                keyExtractor={item => item?.id}
                ListEmptyComponent={
                  <Text style={styles.no_data_found}>No Player Found </Text>
                }
              />
            </View>
          </View>
        }
      />
    </View>
  );
};

export default TournamentTeam;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.homeGray,
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
  icon_image: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
    marginLeft: 7,
    borderRadius: 50,
  },

  left: {
    marginLeft: 10,
  },
  bio: {
    fontSize: 11,
    marginLeft: 10,
    color: Colors.likeGray,
  },
  no_data_found: {
    // fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 30,
    color: Colors.textColor,
  },
  modal_image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginTop: 15,
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner_container_modal: {
    backgroundColor: Colors.White,
    width: '89%',
    height: '80%',
    borderRadius: 20,
  },
  modal_button: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.Dark_Blue,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal_button_text: {
    color: Colors.White,
  },
  MenuText: {
    fontSize: 16,
    color: Colors.textColor,
    fontWeight: '600',
  },
  Menu: {
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 1,
    borderColor: Colors.White,
  },
  icon: {
    width: 40,
    height: 40,
    borderColor: Colors.SuccessGreen,
    borderRadius: 20,
    borderWidth: 1,
  },
});
