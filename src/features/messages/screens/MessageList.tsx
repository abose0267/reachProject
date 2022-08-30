import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {BlockButton, ContactCard, Header, TextInput} from '@app/components';
import {colors} from '@app/constants';
// import { useAuth } from '@app/lib';
import {FlatList} from 'react-native';
import {useCollection} from '@app/lib/useFirebase';
import {MessageGroup, useAuth, UserProfile} from '@app/lib';
import {useFocusEffect} from '@react-navigation/native';
import {MessageCard} from '@app/components/MessageCard';
import {getAuth} from 'firebase/auth';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getMessageGroup } from '../useMessaging';
import { StatusBar } from 'expo-status-bar';
import { useAnnouncements } from '@app/lib/announcement';
import { AnnouncementCard } from '@app/components/Announcements';

const MessageList = ({navigation}) => {
  const {user} = useAuth();
  const {data: groups} = useCollection<MessageGroup>(`users/${user.uid}/groups`);
  const {announcements} = useAnnouncements();
  return (
    <SafeAreaView style={[styles.container]}>
      <Header label="Messages" containerStyle={{marginBottom: 5}} />
      <StatusBar style="dark" />
      <AnnouncementCard 
        title={"Announcements"}
        latestMessage={announcements?.length > 0 ? announcements[0].message : null}
        onPress={() => navigation.navigate("readannouncements")}
      />
      <AnnouncementCard 
        title={"Blasts"}
        latestMessage={announcements?.length > 0 ? announcements[0].message : null}
        onPress={() => console.log("howdy")}
      />
      <FlatList
        data={groups}
        renderItem={({item}) => <MessageCard data={item} onPress={() => 
          getMessageGroup(item.members.map(m => ({uid: m.uid})), item.members.length > 2 ? item.name : null)
          .then(id => navigation.navigate('messages', { id }))
          .catch(err => console.error(err))
        }  />}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CreateMessage');
        }}
        style={{
          position: 'absolute',
          bottom: 10,
          right: 10,
          zIndex: 10,
          backgroundColor: '#379770',
          borderRadius: 20,
        }}>
        <Ionicons
          name="chatbox-outline"
          size={25}
          style={{borderWidth: 1, borderRadius: 20, padding: 20}}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MessageList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  padding: {
    paddingHorizontal: 20,
  },
});
