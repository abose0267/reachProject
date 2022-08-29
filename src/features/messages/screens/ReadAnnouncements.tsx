import { BlockButton, Header } from '@app/components';
import { useAuthenticatedUser } from '@app/lib';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, SectionList, Text, FlatList, TouchableOpacity, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAnnouncements } from '@app/lib/announcement';


const ReadAnnouncements = ({ navigation }) => {
    const {announcements} = useAnnouncements();
    return (
        <SafeAreaView style={[styles.container]}>
            <Header label="Announcements" containerStyle={{ marginBottom: 5, padding: 10, paddingTop: 20,}} />
            <FlatList 
                data={announcements}
                renderItem={({item}) => {
                    console.log(new Date(item.createdAt.seconds * 1000).toUTCString())
                    let date = new Date(item.createdAt.seconds * 1000).toUTCString()
                    return(
                        <View style={{ borderTopWidth: 1, borderTopColor: "lightgray", paddingHorizontal: 20,}}>
                            <Text style={{ fontSize: 20, fontWeight: '500', marginTop: 10, color: "black" }}>{item.message}</Text>
                            <Text style={{ fontSize: 15, fontWeight: '300', marginTop: 5, color: "gray" }}>At {date}</Text>
                        </View>
                    )
                }}
            />
        </SafeAreaView>
    )
}

export default ReadAnnouncements;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginHorizontal: 10,
    },
})