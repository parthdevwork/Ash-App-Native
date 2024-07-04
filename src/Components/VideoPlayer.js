import React, {useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Video from 'react-native-video';
import FullScreenChz from 'react-native-fullscreen-chz';
import Orientation from 'react-native-orientation-locker';
import {
  Dimensions,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import {Grid} from 'react-native-animated-spinkit';
import {Colors} from '../Config/Colors';

const {width, height} = Dimensions.get('screen');

const VideoPlayer = ({uri, h, w, onFullScreenChange}) => {
  const [buffering, setBuffering] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);
  return (
    <View
      style={
        fullScreen
          ? {
              ...StyleSheet.absoluteFill,
              backgroundColor: 'black',
            }
          : {
              alignSelf: 'center',
              borderRadius: 15,
              overflow: 'hidden',
              height: h,
              width: w,
            }
      }>
      <Video
        source={{
          uri,
        }}
        resizeMode="contain"
        controls={!buffering}
        style={{flex: 1}}
        onBuffer={data => {
          setBuffering(data.isBuffering);
        }}
        paused={buffering}
      />
      {Platform.OS == 'android' ? (
        <View
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            // backgroundColor: 'rgba(0,0,0,0.8)',
            padding: 30,
            borderRadius: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              if (onFullScreenChange) onFullScreenChange(!fullScreen);

              if (!fullScreen) {
                Orientation.lockToLandscape();
                FullScreenChz.enable();
              } else {
                Orientation.lockToPortrait();
                FullScreenChz.disable();
              }
              setFullScreen(!fullScreen);
            }}>
            <FontAwesome5 name={'expand'} size={20} color={'#fff'} />
          </TouchableOpacity>
        </View>
      ) : null}
      {buffering ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(173,173,173,0.1)',
          }}>
          <Grid size={48} color={Colors.White} />
        </View>
      ) : null}
    </View>
  );
};

export default VideoPlayer;
