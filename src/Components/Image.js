import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'

const Image = (props) => {
    return (
        <FastImage
            source={props?.source?.uri ? { uri: props?.source?.uri, priority: FastImage.priority.high } : props?.source}
            style={props?.style}
            resizeMode={props?.resizeMode == 'stretch' ? FastImage.resizeMode.stretch : props?.resizeMode == 'cover' ? FastImage.resizeMode.cover : FastImage.resizeMode.contain}
        />
    )
}

export default Image

const styles = StyleSheet.create({})