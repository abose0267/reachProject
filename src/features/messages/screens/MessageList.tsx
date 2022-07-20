import React, { useEffect, useState } from 'react'
import { View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { BlockButton, ContactCard, Header, TextInput } from '@app/components';
import { colors } from '@app/constants';
// import { useAuth } from '@app/lib';
import { FlatList } from 'react-native'
import { useCollection } from '@app/lib/useFirebase';
import { MessageProfile, useAuth, UserProfile } from '@app/lib';
import { useFocusEffect } from '@react-navigation/native';
import { MessageCard } from '@app/components/MessageCard';
import { getAuth } from 'firebase/auth';
import Ionicons from '@expo/vector-icons/Ionicons';



const MessageList = ({ navigation }) => {
    const { signout } = useAuth();


    const { data: messages } = useCollection<MessageProfile>('messageGroups');

    const [messageData, setMessages] = useState([])



    useEffect(() => {
        console.log("messages", messages)
        let messages2 = []
        for (var i = 0; i < messages.length; i++) {
            for (var j = 0; j < messages[i].members.length; j++) {
                if (messages[i].members[j].uid == getAuth().currentUser.uid) {
                    messages2.push(messages[i])
                }
            }
        }

        setMessages(messages2)
    }, [messages])
    return (
        <SafeAreaView style={[styles.container]}>
            <FlatList
                style={
                    {
                        //   backgroundColor:'green',
                    }
                }
                data={messageData}
                renderItem={({ item }) => (
                    <MessageCard data={item} />
                )}
            />
            <TouchableOpacity style={{ position: 'absolute', bottom: 25, right: 30, zIndex: 10, backgroundColor: '#379770', borderRadius: 20 }}>
                <Ionicons name='chatbox-outline' size={30} style={{ borderWidth: 1, borderRadius: 20, padding: 20 }} />
            </TouchableOpacity>


        </SafeAreaView>
    );
};

export default MessageList;

const Divider = () => (
    <View
        style={{
            flexDirection: 'row',
            height: 1,
            backgroundColor: colors.grey,
            shadowOffset: {
                width: 0,
                height: 1
            },
            shadowOpacity: 1,
            shadowRadius: 1,
            marginTop: 10,
            marginHorizontal: 20,
        }}
    />
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginBottom: 20,
        // padding: 75,
        // flexDirection: 'column-reverse',

    },
    padding: {
        paddingHorizontal: 20,
    }
});
