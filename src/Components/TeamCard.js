import { StyleSheet, Text, View, TouchableOpacity, I18nManager } from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import { Colors } from '../Config/Colors';
import { like, unlike } from './Assets';
import Image from './Image';


const TeamCard = props => {
  return (
    <View
      style={{
        alignItems: 'center',
        minWidth: 80,
        maxWidth: 90,
        alignItems: 'center',
      }}>
      <Image
        source={props.teamImage}
        style={[styles.teamImg, { ...props.imageStyle }]}
        resizeMode={'contain'}
      />
      <TextComponent
        text={props.teamName}
        style={[styles.teamName, { ...props.titleStyle }]}
      />
      {props.Like ? (
        <TouchableOpacity
          style={[
            styles.like,
            {
              ...props.likeStyle,
              backgroundColor: props.isWin ? Colors.SuccessGreen : '#CCCCCC',
            },
          ]}
          disabled={props.disabled}
          onPress={props.onPressLike}>
          <Image
            source={props.isLike ? like : unlike}
            style={{
              width: 20,
              height: 20,
              // tintColor: props.isWin ? Colors.Dark_Blue : Colors.likeGray,
            }}
          />
          <TextComponent
            text={props.likecount}
            style={[
              styles.teamlike,
              { color: props.isWin ? Colors.textColor : Colors.likeGray },
            ]}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default TeamCard;

const styles = StyleSheet.create({
  teamImg: {
    width: 50,
    height: 50,
    borderRadius:100
  },
  teamName: {
    fontSize: 15,
    color: Colors.gray,
    marginTop: 5,
    textAlign: 'center',
  },
  like: {
    minWidth: 70,
    padding: I18nManager.isRTL ? 0 : 5 ,
    flexDirection: I18nManager.isRTL ? 'row-reverse' :'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 5,
    backgroundColor: Colors.SuccessGreen,
    borderRadius: 10,
    marginTop: 5,
  },
  teamlike: {
    fontSize: 16,
    color: Colors.textColor,
    fontWeight: '400',
  },
});
