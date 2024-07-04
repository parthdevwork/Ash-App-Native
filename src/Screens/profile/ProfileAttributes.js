import { StyleSheet, Text, View, FlatList, I18nManager } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../Config/Colors';
import { TextComponent } from '../../Components';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { PCenter, PLeft, PRight } from '../../Components/Assets';
import Image from '../../Components/Image'

const ProfileAttributes = () => {
  const user = useSelector(state => state.AuthReducer.user);

  let progress = [
    {
      id: 1,
      image: I18nManager.isRTL ? PRight : PLeft
    },
    {
      id: 2,
      image: PCenter
    },
    {
      id: 3,
      image: PCenter
    },
    {
      id: 4,
      image: PCenter
    },
    {
      id: 5,
      image: PCenter
    },
    {
      id: 6,
      image: PCenter
    },
    {
      id: 7,
      image: PCenter
    },
    {
      id: 8,
      image: PCenter
    },
    {
      id: 9,
      image: PCenter
    },

    {
      id: 10,
      image: !I18nManager.isRTL ? PRight : PLeft
    }

  ]

  const renderProgress = ({ item, index }) => {
    return (
      <View style={{ marginBottom: 10 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            marginBottom: 5,
          }}>
          <TextComponent
            text={item.key}
            style={{
              fontSize: 16,
              color: '#666666',
              textTransform: 'capitalize',
            }}
          />

          <TextComponent
            text={item.level}
            style={{ fontSize: 16, color: Colors.textColor }}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5, marginHorizontal: 5 }}>
          {progress.map((items, index) => {
            return (
              <Image source={items.image} style={{ width: '10%', height: 13, tintColor: item.progress >= items.id ? Colors.Dark_Blue : Colors.Light_gray }} resizeMode={'stretch'} />
            )
          })}
        </View>

      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.View}>
        <FlatList
          data={
            user?.level?.history[user?.level?.history.length - 1]?.attributes
          }
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={renderProgress}
        />
      </View>
    </View>
  );
};

export default ProfileAttributes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  View: {
    margin: 20,
    marginTop: 0,
    backgroundColor: Colors.White,
    borderRadius: 20,
    padding: 20,
  },
});
