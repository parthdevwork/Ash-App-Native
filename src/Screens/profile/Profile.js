import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import React from 'react';
import {Colors} from '../../Config/Colors';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import Header from '../../Components/Header';
import {
  femalesymbol,
  foot,
  footl,
  Male,
  malesymbol,
  pencil,
  picture,
  profilebanner,
  rank,
  speed,
  unlike,
} from '../../Components/Assets';
import TagLabel from '../../Components/TagLabel';
import TextComponent from '../../Components/TextComponent';
import TopTab from '../../Navigation/TopTabs/TopTab';
import ProfileAttributes from './ProfileAttributes';
import ProfileStats from './ProfileStats';
import ProfileTeams from './ProfileTeams';
import ProfileMore from './ProfileMore';
import {useSelector} from 'react-redux';

const Profile = () => {
  const navigation = useNavigation();
  const {t, i18n} = useTranslation();
  const user = useSelector(state => state.AuthReducer.user);
  const today = new Date().getFullYear();
  const dateofbirth = new Date(user?.dateOfBirth);
  const age = today - dateofbirth.getFullYear();


  return (
    <View style={styles.container}>
      <Header
        title={user?.fullName}
        rightIcon={true}
        leftIcon
        onPressRightIcon={() => navigation.navigate('EditProfile')}
        IconRight={
          <Image
            source={pencil}
            style={{width: 25, height: 20}}
            resizeMode={'contain'}
          />
        }
      />

      <ImageBackground source={profilebanner} style={styles.View}>
        <View style={styles.header}>
          <View style={{width: '30%', alignItems: 'flex-start'}}>
            <TagLabel
              text={t(`${age ? age : '0'} Y`)}
              width={45}
              pH={3}
              backgroundColor={Colors.White}
            />
            <View
              style={{
                backgroundColor: Colors.light_Blue,
                paddingHorizontal: 10,
                borderRadius: 15,
                paddingVertical: 5,
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Image
                source={user?.isMale ? malesymbol : femalesymbol}
                style={{
                  width: 20,
                  height: 15,
                  marginRight: 2,
                  tintColor: Colors.White,
                }}
                resizeMode={'contain'}
              />
              <TextComponent
                text={user?.isMale ? 'Male' : 'Female'}
                style={{fontSize: 14, color: Colors.White}}
              />
            </View>
          </View>
          <View style={styles.Align}>
            <Image
              source={user?.picture ? {uri: user?.picture} : picture}
              style={styles.profile_img}
            />
            <TagLabel
              text={user?.features?.inGamePosition?.shortPosition}
              bR={10}
              pH={7}
              // width={40}
              TextStyle={{fontSize: 14, marginVertical: 2, fontWeight: 'bold'}}
            />
          </View>
          <View style={{width: '30%', alignItems: 'flex-end'}}>
            <View
              style={{
                backgroundColor: Colors.White,
                paddingHorizontal: 10,
                borderRadius: 15,
                paddingVertical: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={user?.features?.specialFoot == 'RIGHT' ? foot : footl}
                style={{
                  width: 20,
                  height: 15,
                  marginRight: 2,
                }}
                resizeMode={'contain'}
              />
              <TextComponent
                text={user?.features?.specialFoot}
                style={{
                  fontSize: 14,
                  color: Colors.Dark_Blue,
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                }}
              />
            </View>

            <View
              style={{
                backgroundColor: Colors.White,
                paddingHorizontal: 10,
                borderRadius: 15,
                paddingVertical: 5,
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <Image
                source={speed}
                style={{
                  width: 20,
                  height: 15,
                  marginRight: 2,
                }}
                resizeMode={'contain'}
              />
              <TextComponent
                text={user?.features?.topSpeed}
                style={{
                  fontSize: 14,
                  color: Colors.Dark_Blue,
                  fontWeight: 'bold',
                }}
              />
              <TextComponent
                text={' km/h'}
                style={{fontSize: 14, color: Colors.Dark_Blue}}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 25,
          paddingVertical: 10,
        }}>
        <View style={[styles.Align, {flexDirection: 'row'}]}>
          <Image
            source={rank}
            style={{
              width: 25,
              height: 25,
              marginRight: 10,
            }}
            resizeMode={'contain'}
          />
          <TextComponent
          
            text={ 
              user?.level?.history?.[user?.level?.history.length - 1]?.value ??
             
              'Amateur'
            }
            style={{
              fontSize: 25,
              color: Colors.textColor,
              fontWeight: '600',
              textTransform: 'capitalize',
            }}
          />
      
        </View>

        <View style={[styles.Align, {flexDirection: 'row'}]}>
          <Image
            source={unlike}
            style={{
              width: 25,
              height: 25,
              marginRight: 10,
            }}
            resizeMode={'contain'}
          />
          <View>
            <TextComponent
              text={'Popularity'}
              style={{fontSize: 12, color: '#666666'}}
            />
            <TextComponent
              text={user?.level?.popularity}
              style={{fontSize: 16, color: Colors.textColor, fontWeight: '600'}}
            />
          </View>
        </View>
      </View>

      <TopTab
        components={[
          {
            component: ProfileAttributes,
            name: 'Attributes',
            label: t('Attributes'),
          },
          {
            component: ProfileStats,
            name: 'Statistics',
            label: t('Statistics'),
          },
          {
            component: ProfileTeams,
            name: 'ProfileTeams',
            label: t('Teams'),
          },
          {
            component: ProfileMore,
            name: 'ProfileMore',
            label: t('Info'),
          },
        ]}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.homeGray,
  },
  View: {
    height: 150,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 150,
    paddingBottom: 20,
  },
  profile_img: {
    width: 85,
    height: 85,
    borderRadius: 55,
    borderColor: '#F5F5F5',
    borderWidth: 1,
    marginBottom: 10,
  },
  Align: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
