import { BlockButton, Header } from '@app/components';
import { useAuthenticatedUser } from '@app/lib';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, SectionList, Text, FlatList, TouchableOpacity, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createAnnouncement } from '@app/lib/announcement';
import { Picker } from '@react-native-picker/picker';
import { Dropdown } from '@app/components/Dropdown';
import { ProgramChat, useProgramChats } from '@app/lib/programchat';


const SendAnnouncement = ({ navigation, route }) => {
    const { isAnnouncement, users } = route.params;
    const [message, setMessage] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [height, setHeight] = React.useState(140);
    const [selectedProgram, setSelectedProgram] = React.useState<ProgramChat>(null);
    const [visible, setVisible] = React.useState(false);
    const { user } = useAuthenticatedUser()
    const handleCreate = () => {
        if (isAnnouncement) {
            createAnnouncement(
                {
                    message: message,
                    creatorUID: user?.uid,
                    createdAt: new Date(),
                    title: title,
                    isAnnouncement: isAnnouncement,
                    programcode: selectedProgram.joinCode,
                    programname: selectedProgram.name,
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
                    programcode: selectedProgram.joinCode,
                    programname: selectedProgram.name,
                }
            ).then(() => {
                Alert.alert("Blast sent!")
            }).then(() => {
                navigation.navigate("adminpanel")
            })
        }
    }
    const {programs} = useProgramChats();
    function open() {
        setVisible(true)
        // pickerRef.current.focus();
    }
    function close() {
        setVisible(false);
        // pickerRef.current.blur();
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
                    <TouchableOpacity
                        style={{
                            borderWidth: 1,
                            borderColor: "lightgray",
                            borderRadius: 5,
                            padding: 10,
                            width: "100%",
                            marginBottom: 10,
                            height: 45,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                        onPress={() => {
                            if (visible) {
                                close();
                            } else {
                                open();
                            }
                        }}
                    >
                        <Text
                            style={{
                                color: selectedProgram === null ? "lightgray" : "black"
                            }}
                        >
                            {selectedProgram === null ? "Send to program (Optional)" : selectedProgram.name}
                        </Text>
                        <Ionicons
                            name='chevron-down-outline'
                            color={"lightgray"}
                            size={24}
                        />
                    </TouchableOpacity>
                    {visible &&
                        <Picker
                            selectedValue={selectedProgram?.name}
                            onValueChange={(itemValue, itemIndex) => {
                                setSelectedProgram(programs[itemIndex]);
                            }}>
                            {programs.map((item) => (
                                <Picker.Item label={item.name} value={item.name} />
                            ))}
                        </Picker>
                    }
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
                        if (title.length == 0 || message.length == 0) {
                            Alert.alert("Please fill out all fields")
                        } else {
                            handleCreate();
                        }
                    }} style={{ borderColor: "green" }} textStyle={{ color: "white" }}>Send</BlockButton>
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