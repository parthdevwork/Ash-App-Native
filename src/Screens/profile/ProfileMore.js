import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React from 'react';
import { Colors } from '../../Config/Colors';
import { TextComponent } from '../../Components';
import { useTranslation } from 'react-i18next';
import {
  calender,
  league,
  leagueaward,
  MAward,
  Playbtn,
  trophy,
  Videobanner,
} from '../../Components/Assets';
import { useSelector } from 'react-redux';

const ProfileMore = () => {
  const { t, i18n } = useTranslation();
  const user = useSelector(state => state.AuthReducer.user);

  const data = [
    {
      id: 1,
      title: 'Premier League',
      image: leagueaward,
    },
    {
      id: 2,
      title: 'Man Of the Match',
      image: MAward,
    },
    {
      id: 3,
      title: 'Premier League',
      image: leagueaward,
    },
    {
      id: 4,
      title: 'Man Of the Match',
      image: MAward,
    },
  ];

  const renderVideos = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{ marginRight: 25, marginLeft: index == 0 ? 25 : 0 }}
        onPress={() => navigation.navigate('VideoScreen', { url: item?.url })}
        >
        <View style={styles.TourView}>
          <Image
            source={item?.thumbnail ? { uri: item?.thumbnail } : Videobanner}
            style={styles.TBanner}
            resizeMode={'cover'}
          />
          <View style={[styles.Theader, { top: 35 }]}>
            <TouchableOpacity
             onPress={() =>
              navigation.navigate('VideoScreen', { url: item?.url })
            }>
              <Image
                source={Playbtn}
                style={{ width: 25, height: 25, borderRadius: 25 }}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.TourViewFooter}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={league}
                style={{ width: 20, height: 20, marginRight: 10 }}
                resizeMode={'contain'}
              />
              <TextComponent text={'Premier League'} style={styles.Tourtitle} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={calender}
                style={{ width: 20, height: 20, marginRight: 10 }}
                resizeMode={'contain'}
              />
              <TextComponent
                text={'12 Nov - 30 Nov'}
                style={styles.Tourtitle}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderAwards = ({ item, index }) => {
    return (
      <View style={{ marginRight: 20, marginLeft: index == 0 ? 25 : 0 }}>
        <View style={[styles.TourView, { width: 150, height: 170 }]}>
          <Image
            source={item?.icon ? { uri: item?.icon } : trophy}
            style={{
              width: 150,
              height: 120,
            }}
            resizeMode={'contain'}
          />

          <View
            style={[
              styles.TourViewFooter,
              { borderColor: '#F5F5F5', borderTopWidth: 1 },
            ]}>
            <TextComponent text={item?.title ? item?.title : item?.label} style={styles.Tourtitle} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.View}>
        <View style={styles.dataRow}>
          <TextComponent text={t('Nickname')} style={styles.label} />
          <TextComponent text={user?.nickName} style={styles.text} />
        </View>
        <View style={styles.dataRow}>
          <TextComponent text={t('Date of Birth')} style={styles.label} />
          <TextComponent text={user?.dateOfBirth} style={styles.text} />
        </View>
        <View style={styles.dataRow}>
          <TextComponent text={t('Weight')} style={styles.label} />
          {user?.features?.weight ?
            <TextComponent
              text={`${user?.features?.weight} KG`}
              style={styles.text}
            /> : null}
        </View>
        <View style={[styles.dataRow, { borderBottomWidth: 0 }]}>
          <TextComponent text={t('Height')} style={styles.label} />
          {user?.features?.height ?
            <TextComponent
              text={`${user?.features?.height} CM`}
              style={styles.text}
            />
            : null}
        </View>
      </View>

      <View
        style={[styles.dataRow, { borderBottomWidth: 0, paddingHorizontal: 25 }]}>
        <TextComponent text={t('Awards')} style={styles.heading} />
        {user?.features?.awards.length ?
          <TextComponent
            text={`${user?.features?.awards.length} Awards`}
            style={[styles.text, { color: Colors.Dark_Blue }]}
          />
          : null}
      </View>

      <FlatList
        style={{ marginBottom: 10 }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        // contentContainerStyle={{marginLeft:20 , mar}}
        data={user?.features?.awards}
        renderItem={renderAwards}
        ListEmptyComponent={
          <TextComponent
            text={t("No Any Award Yet")}
            style={{
              fontSize: 16,
              textAlign: 'center',
              marginTop: 10,
              paddingHorizontal: 25,
            }}
          />
        }
      />

      <View
        style={[styles.dataRow, { borderBottomWidth: 0, paddingHorizontal: 25 }]}>
        <TextComponent text={t('Videos')} style={styles.heading} />
        {user?.features?.videos.length ?
          <TextComponent
            text={`${user?.features?.videos.length} Videos`}
            style={[styles.text, { color: Colors.Dark_Blue }]}
          /> : null}
      </View>

      <FlatList
        style={{ marginBottom: 20 }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        // contentContainerStyle={{marginLeft:20 , mar}}
        data={user?.features?.videos}
        renderItem={renderVideos}
        ListEmptyComponent={
          <TextComponent
            text={t("You don't have Any Video Right Now")}
            style={{
              fontSize: 16,
              textAlign: 'center',
              marginTop: 10,
              paddingHorizontal: 25,
            }}
          />
        }
      />
    </ScrollView>
  );
};

export default ProfileMore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  View: {
    margin: 20,
    backgroundColor: Colors.White,
    borderRadius: 20,
    paddingVertical: 20,
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#EEEEEE',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    padding: 15,
  },
  label: {
    fontSize: 18,
    color: Colors.likeGray,
  },
  text: {
    fontSize: 18,
    color: Colors.textColor,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textColor,
  },

  TourView: {
    width: 230,
    height: 150,
    backgroundColor: Colors.White,
    borderRadius: 20,
  },
  TourViewTeam: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TourViewFooter: {
    flex: 1,
    maxHeight: 60,
    // backgroundColor: Colors.Dark_Blue,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  Tourtitle: {
    fontSize: 13,
    textAlign: 'center',
    color: '#190A41',
  },
  TourScore: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#190A41',
    marginTop: 5,
  },
  TBanner: {
    width: 230,
    height: 90,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  Theader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    top: 10,
    width: 230,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
