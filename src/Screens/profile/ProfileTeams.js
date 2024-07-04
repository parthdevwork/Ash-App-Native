import {
  FlatList,
  I18nManager,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { Button, TextComponent } from '../../Components';
import {
  barcelona,
  Barcelonalogo,
  createLogo,
  liverpool,
  RealM,
  team3,
  team5,
} from '../../Components/Assets';
import { Colors } from '../../Config/Colors';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { TeamMiddleware } from '../../Store/Middleware/TeamMiddleware';

const ProfileTeams = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const user = useSelector(state => state.AuthReducer.user);
  const TeamDetails = useSelector(state => state.TeamReducer.SelectedTeam);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <FlatList
        style={{ flex: 1 }}
        data={user?.teams}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={styles.Team}
              onPress={() => {
                if (TeamDetails && TeamDetails.id == item.id) {
                  navigation.navigate('TeamDetails');
                } else
                  dispatch(TeamMiddleware.teamDetails({ id: item.id }))
                    .then(() => {
                      navigation.navigate('TeamDetails');
                    })
                    .catch();
              }}>
              <Image
                source={item.logo ? { uri: item?.logo } : createLogo}
                style={styles.icon}
                resizeMode={'contain'}
              />
              <View style={{ marginLeft: 20, flex: 1 }}>
                <TextComponent
                  text={t(item.teamName)}
                  style={styles.TeamText}
                />
              </View>
              <View>
                <Ionicons
                  name={!I18nManager.isRTL ? 'chevron-forward' : 'chevron-back'}
                  size={24}
                  color={Colors.textColor}
                />
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <TextComponent
            text={t("You're currently not in a team")}
            style={{ fontSize: 16, textAlign: 'center', marginTop: 10 }}
          />
        }
      />
      <Button
        text={'Team Management'}
        styles={{ backgroundColor: '#00FF94' , marginBottom:15 }}
        textStyle={{ color: Colors.Dark_Blue }}
        onPress={() => navigation.navigate('TeamManagement')}
      />
    </View>
  );
};

export default ProfileTeams;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Team: {
    flexDirection: 'row',
    height: 60,
    paddingHorizontal: 20,
    backgroundColor: Colors.White,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 1,
  },
  TeamText: {
    fontSize: 18,
    color: Colors.textColor,
    fontWeight: '600',
  },
  icon: {
    width: 35,
    height: 35,
  },
});
