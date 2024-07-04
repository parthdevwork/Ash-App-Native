import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import VideoPlayer from '../../Components/VideoPlayer';
import { Colors } from '../../Config/Colors';
const { width, height } = Dimensions.get('window');

const VideoScreen = props => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#000' }}>
      <TouchableOpacity style={{ position: 'absolute', top: 45, right: 15 }} onPress={() => navigation.goBack()}>
        <Ionicons
          name={'ios-close-circle-outline'}
          size={28}
          color={Colors.White}
        />
      </TouchableOpacity>
      <VideoPlayer uri={props.route.params.url} h={250} w={width} />
    </View>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({});
