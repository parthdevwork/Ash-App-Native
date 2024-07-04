import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import {Colors} from '../../../Config/Colors';
import {
  team1,
  team2,
  team3,
  team4,
  team5,
  team6,
  team7,
  team8,
  menu,
  team9,
  persons,
} from '../../../Components/Assets';
import {TextComponent} from '../../../Components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import Skeleton from '../../../Components/Skeleton';
import {TeamMiddleware} from '../../../Store/Middleware/TeamMiddleware';
import {useNavigation} from '@react-navigation/native';

const MyTeam = () => {
  const TeamData = useSelector(state => state.TeamReducer.ManageTeam);
  const TeamDetails = useSelector(state => state.TeamReducer.SelectedTeam);
  const navigation = useNavigation();

  const {t, i18n} = useTranslation();
  const [refresh, setrefresh] = useState(false);
  const dispatch = useDispatch();

  const onRefresh = () => {
    setrefresh(true);
    dispatch(TeamMiddleware.teamManagement());
    setrefresh(false);
  };

  const renderTeamItem = ({item}) => {
    return TeamData ? (
      <TouchableOpacity
        style={styles.option}
        onPress={() => {
          if (TeamDetails && TeamDetails.id == item.team.id) {
            navigation.navigate('TeamDetails');
          } else
            dispatch(TeamMiddleware.teamDetails({id: item.team.id}))
              .then(() => {
                navigation.navigate('TeamDetails');
              })
              .catch();
        }}>
        <View style={styles.flxDR}>
          <Image
            source={item?.team.logo ? {uri: item?.team.logo} : persons}
            style={styles.icon_image}
          />
          <View style={{width: '85%'}}>
            <TextComponent
              text={item?.team.teamName ? item?.team.teamName : '--'}
              style={styles.left}
            />
            <TextComponent
              text={item?.team.teamBio}
              numberOfLines={1}
              style={[styles.bio, {color: '#00AF66'}]}
            />
          </View>
        </View>
        <MaterialIcons
          name={
            !I18nManager.isRTL ? 'keyboard-arrow-right' : 'keyboard-arrow-left'
          }
          size={30}
          color={Colors.Blue}
          style={styles.left}
        />
      </TouchableOpacity>
    ) : (
      <Skeleton
        style={{
          height: 60,
          width: '100%',
          borderColor: Colors.light_opacity,
          borderWidth: 0.5,
        }}
      />
    );
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={TeamData ? TeamData?.teams : [1, 2, 3, 4, 5, 6, 7]}
        renderItem={renderTeamItem}
        refreshing={refresh}
        onRefresh={onRefresh}
        keyExtractor={item => item?.id}
        ListEmptyComponent={
          <View style={{alignItems:'center'}}>
          <TextComponent
            text={t('No Teams Available')}
            style={styles.no_data_found}
          />
          </View>
        }
      />
    </View>
  );
};

export default MyTeam;

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
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 30,
  },
});
