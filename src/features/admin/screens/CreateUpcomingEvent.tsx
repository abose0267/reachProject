import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, SafeAreaView, StyleSheet, SectionList, Text, FlatList, TouchableOpacity, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, Alert, Image, KeyboardAvoidingView } from 'react-native';
import * as Calendar from 'expo-calendar';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { ProgramChat, useProgramChats } from '@app/lib/programchat';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createEvent } from '@app/lib/upcoming';

const CreateUpcomingEvent = ({ navigation }) => {
    const [name, setName] = useState("");
    const [date, setDate] = useState(new Date());
    const [height, setHeight] = useState(140);
    const [message, setMessage] = useState("");
    const [selectedProgram, setSelectedProgram] = React.useState<ProgramChat>(null);
    const [visible, setVisible] = React.useState(false);
    const { programs } = useProgramChats();

    function open() {
        setVisible(true)
        console.log(visible)
        // pickerRef.current.focus();
    }
    function close() {
        setVisible(false);
        // pickerRef.current.blur();
    }
    return (
        <SafeAreaView
            style={{
                flex: 1,
                alignItems: "center",
            }}
        >
            <StatusBar style="auto" />
            <View
                style={{
                    marginTop: 20,
                    marginHorizontal: 15,
                    width: "90%",
                }}
            >
                <Text
                    style={{
                        fontSize: 20,
                        textAlign: "left"
                    }}
                >
                    Create Upcoming Event
                </Text>
            </View>
            <TextInput
                placeholder="Name"
                style={{ marginBottom: 5, marginTop: 20, borderWidth: 1, borderColor: "#379770", padding: 10, borderRadius: 5, width: 350, height: 50, backgroundColor: "white" }}
                onChangeText={text => setName(text)}
                value={name}
            />
            <TextInput
                style={{
                    borderWidth: 1,
                    borderColor: "#379770",
                    borderRadius: 5,
                    padding: 10,
                    marginTop: 10,
                    width: 350,
                    // paddingLeft: 20,
                    paddingTop: 15,
                    minHeight: 140,
                    height: height,
                    fontSize: 15,
                    backgroundColor: "white",
                }}
                placeholder="Description"
                multiline
                onContentSizeChange={(event) => {
                    setHeight(event.nativeEvent.contentSize.height)
                }}
                value={message}
                onChangeText={(text) => setMessage(text)}
            />
            <View
                style={{
                    marginTop: 20,
                    width: '100%',
                    paddingHorizontal: 15,
                    alignItems: "center",
                }}
            >
                <Text
                    style={{
                        fontSize: 17,
                        textAlign: "left",
                        fontWeight: '300',
                        marginVertical: 10,
                        color: "gray",
                        width: "100%",
                    }}
                >
                    Date and Time of Event
                </Text>
                <DateTimePicker
                    mode="datetime"
                    display='calendar'
                    value={date}
                    onChange={(event, selectedDate) => {
                        const currentDate = selectedDate || date;
                        setDate(currentDate);
                    }}
                    minimumDate={new Date()}
                    // minimumDateMessage="Date must be in the future"
                    themeVariant="light"
                >

                </DateTimePicker>
            </View>
            {/* <TouchableOpacity
                style={{
                    borderWidth: 1,
                    borderColor: "#379770",
                    borderRadius: 5,
                    padding: 10,
                    width: "90%",
                    marginTop: 20,
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
            } */}
            <TouchableOpacity
                style={{
                    backgroundColor: "#379770",
                    width: 350,
                    height: 50,
                    position: "absolute",
                    bottom: 20,
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center",
                }}
                onPress={() => {
                    const randomId = Math.random().toString(36).substring(2, 15)
                    if(name === "" || message === "") {
                        Alert.alert("Please fill out all fields")
                        return;
                    } else {
                        createEvent({
                            name: name,
                            description: message,
                            date: date,
                            event_id: randomId,
                        }).then(() => {
                            Alert.alert("Event created!")
                        })
                        .then(() => {
                            navigation.navigate("adminpanel")
                        })
                    }
                }}
            >
                <Text
                    style={{
                        color: "white",
                        fontSize: 15,
                    }}
                >
                    Create event!
                </Text>
            </TouchableOpacity>
            <KeyboardAvoidingView behavior="padding" />
        </SafeAreaView>
    )
}

export default CreateUpcomingEvent;