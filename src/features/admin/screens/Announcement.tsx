import { BlockButton, Header } from '@app/components';
import { useAuthenticatedUser } from '@app/lib';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, SectionList, Text, FlatList, TouchableOpacity, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createAnnouncement } from '@app/lib/announcement';


const SendAnnouncement = ({ navigation, route }) => {
    const {isAnnouncement, users} = route.params;
    const [message, setMessage] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [height, setHeight] = React.useState(140);
    const {user} = useAuthenticatedUser()
    const handleCreate = () => {
        if(isAnnouncement) {
            createAnnouncement(
                {
                    message: message,
                    creatorUID: user?.uid,
                    createdAt: new Date(),
                    title: title,
                    isAnnouncement: isAnnouncement,
                }
            ).then(() => {
                Alert.alert("Announcement sent!")
            }).then(() => {
                navigation.goBack()
            })
        } else {
            createAnnouncement(
                {
                    message: message,
                    creatorUID: user?.uid,
                    createdAt: new Date(),
                    title: title,
                    isAnnouncement: isAnnouncement,
                    users: users,
                }
            ).then(() => {
                Alert.alert("Blast sent!")
            }).then(() => {
                navigation.navigate("adminpanel")
            })
        }
    }
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={styles.container}>
            <SafeAreaView style={[styles.container]}>
                <View style={{ paddingHorizontal: 15, }}>
                    <Header label={isAnnouncement ? "Send an announcement" : "Send a blast"} containerStyle={{ marginBottom: 5 }} />
                </View>

                <View style={{
                    marginTop: 10,
                    paddingHorizontal: 15,

                }}>
                    <TextInput 
                        style={{
                            borderWidth: 1,
                            borderColor: "lightgray",
                            borderRadius: 5,
                            padding: 10,
                            // paddingLeft: 20,
                            height: 50,
                            marginBottom: 10,
                            fontSize: 15,
                        }}
                        placeholder="Type a title..."
                        onChangeText={(text) => setTitle(text)}
                        value={title}
                        
                    />
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: "lightgray",
                            borderRadius: 5,
                            padding: 10,
                            // paddingLeft: 20,
                            paddingTop: 15,
                            minHeight: 140,
                            height: height,
                            fontSize: 15,
                            backgroundColor: "white",
                        }}
                        placeholder="Type a message..."
                        multiline
                        onContentSizeChange={(event) => {
                            setHeight(event.nativeEvent.contentSize.height)
                        }}
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
                        if(title.length == 0 || message.length == 0) {
                            Alert.alert("Please fill out all fields")
                        } else {
                            handleCreate();
                        }
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