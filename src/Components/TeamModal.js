import React from "react";
import { Modal } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Colors } from "../Config/Colors";
import TextComponent from "./TextComponent";

const TeamModal = (props) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props?.visible}
            onRequestClose={props?.onClose}
        >
            <View showsVerticalScrollIndicator={false} style={styles.modal}>
                <View style={[styles.inner_container_modal, {height: props?.height ? props?.height : '60%'}]}>
                    {props?.children}
                    <TouchableOpacity style={styles.modal_button} onPress={props?.onClose}>
                        <TextComponent text={props?.buttonText} style={styles.modal_button_text} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default TeamModal;

const styles = StyleSheet.create({
    modal_image: {
        width: 50,
        height: 50
    },
    modal: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: "center",
        // justifyContent: "center"
    },
    inner_container_modal: {
        backgroundColor: Colors.White,
        width: '89%',
        borderRadius: 20,
        marginTop: '20%'
    },
    modal_button: {
        width: '100%',
        height: 50,
        backgroundColor: Colors.Dark_Blue,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: 'center',
        alignItems: "center"
    },
    modal_button_text: {
        color: Colors.White
    }
})