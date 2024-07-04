import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const Skeleton = props => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        padding: 5,
        marginBottom: 1,
        width: '100%',
        borderRadius: props?.radius ? props?.radius : 0,
        ...props.styles,
      }}>
      <ShimmerPlaceholder style={{borderRadius: 10, ...props.style}} />
    </View>
  );
};

export default Skeleton;

const styles = StyleSheet.create({});
