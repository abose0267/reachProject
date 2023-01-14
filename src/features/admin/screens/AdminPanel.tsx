import { Header } from '@app/components';
import { useAuthenticatedUser } from '@app/lib';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, SectionList ,Text, FlatList, TouchableOpacity, Dimensions} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';


const AdminPanel = ({navigation}) => {
    const {user} = useAuthenticatedUser();
    const DATA = [
        {
            title: "Create an announcement",
            icon: "megaphone-outline",
            description: "Send a quick message to all users",
            onPress: () => navigation.navigate('sendannouncement', {isAnnouncement: true})
        },
        {
            title: "Create a program chat",
            icon: "apps-outline",
            description: "Create a group chat for a specific program within REACH",
            onPress: () => navigation.navigate('blasts', {isAnnouncement: false})
        }
    ]
    return(
        <SafeAreaView style={[styles.container]}>
            <View style={styles.topContainer}>
                <Header label="The REACH Control Center" containerStyle={{ marginBottom: 5 }} />
            </View>

            <View style={{
                marginTop: 20,
                // borderWidth: 1,
                // paddingHorizontal: 15,
                marginHorizontal: 15,
            }}>
                <Text style={{fontSize: 15, fontWeight: '300', marginVertical: 10, color: "gray"}}>What would you like to do?</Text>
                <FlatList 
                    data={DATA}
                    renderItem={({item, index}) => (
                        <TouchableOpacity
                            onPress={item.onPress}
                            style={{
                                flexDirection: "row",
                                // borderWidth: 1,
                                // borderColor: "red",
                                width: "100%",
                                height: 60,
                                alignItems: "center",
                                borderBottomWidth: index == 0 ? 1 : 0,
                                borderBottomColor: "lightgray",
                                marginVertical: 5,
                                // paddingHorizontal: 10,
                            }}
                        >
                            <Ionicons 
                                name={item.icon}
                                size={35}
                                color="black"
                            />
                            
                            <View style={{flexDirection: "column", marginLeft: 20,}}>
                                <Text style={{fontSize: 17, fontWeight: '600', color: "black",}}>{item.title}</Text>
                                <Text style={{fontSize: 15, fontWeight: '300', color: "gray", maxWidth: 300,}}>{item.description}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>

        </SafeAreaView>
    )
}

export default AdminPanel;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    topContainer: {
        paddingHorizontal: 20,
        marginTop: 0,
    }
})