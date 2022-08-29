import { BlockButton, Header } from '@app/components';
import { useAuthenticatedUser } from '@app/lib';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, SectionList, Text, FlatList, TouchableOpacity, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createAnnouncement } from '@app/lib/announcement';


const SendAnnouncement = ({ navigation }) => {
    const [message, setMessage] = React.useState('');
    const {user} = useAuthenticatedUser()
    const handleCreate = () => {
        createAnnouncement(
            {
                message: message,
                creatorUID: user?.uid,
                createdAt: new Date(),
            }
        ).then(() => {
            Alert.alert("Announcement sent!")
        }).then(() => {
            navigation.goBack()
        })
    }
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={styles.container}>
            <SafeAreaView style={[styles.container]}>
                <View style={{ paddingHorizontal: 15, }}>
                    <Header label="Send an announcement" containerStyle={{ marginBottom: 5 }} />
                </View>

                <View style={{
                    marginTop: 20,
                    paddingHorizontal: 15,

                }}>
                    <Text style={{ fontSize: 15, fontWeight: '300', marginVertical: 10, color: "gray" }}>Type a message</Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: "lightgray",
                            borderRadius: 5,
                            padding: 10,
                            paddingLeft: 20,
                            paddingTop: 20,
                            height: 140,
                            fontSize: 15,
                            backgroundColor: "white",
                        }}
                        placeholder="Hello, this is an announcement"
                        multiline
                        onChangeText={(text) => setMessage(text)}
                    />
                </View>
                <View
                    style={{
                        position: "absolute",
                        bottom: 20,
                        alignSelf: "center",
                        width: Dimensions.get("screen").width - 20,
                    }}
                >
                    <BlockButton onPress={() => {
                        handleCreate();
                    }} style={{borderColor: "green"}} textStyle={{color: "white"}}>Send</BlockButton>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default SendAnnouncement;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    }
})