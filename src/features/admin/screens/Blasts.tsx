import { BlockButton, Header } from '@app/components';
import { useAuthenticatedUser } from '@app/lib';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, SectionList, Text, FlatList, TouchableOpacity, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createAnnouncement } from '@app/lib/announcement';
import SelectUsers from '@app/features/directory/screens/SelectUsers';


const Blasts = ({ navigation, route }) => {
    const [users, setUsers] = React.useState([]);
    // const onChange = (selected) => {
    //     const exists = users.some((m) => m.uid === selected.uid);
    //     setUsers((prev) => (exists ? prev : [...prev, selected]));
    //     console.log(users);
    // }
    const {isAnnouncement}  = route.params;
    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.padding]}>
                <Header label="Select users" containerStyle={{ marginBottom: 5 }} />
            </View>
            <SelectUsers
                onChange={selected => {
                    setUsers(selected)
                    console.log(users);
                }}
            />
            <View
                style={{
                    position: "absolute",
                    bottom: 20,
                    alignSelf: "center",
                    width: Dimensions.get("screen").width - 20,
                }}
            >
                <BlockButton onPress={() => {
                    if (users.length == 0) {
                        Alert.alert("Please fill out all fields")
                    } else {
                        navigation.navigate('sendannouncement', {isAnnouncement: isAnnouncement, users: users})
                    }
                }} style={{ borderColor: "green" }} textStyle={{ color: "white" }}>Next</BlockButton>
            </View>
        </SafeAreaView>

    )
}

export default Blasts;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    padding: {
        paddingHorizontal: 20,
    }
})