import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {BlockButton, ContactCard, Header, TextInput} from '@app/components';
import {colors} from '@app/constants';
// import { useAuth } from '@app/lib';
import {FlatList} from 'react-native';
import {useCollection} from '@app/lib/useFirebase';
import {MessageGroup, useAuth, UserProfile} from '@app/lib';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {MessageCard} from '@app/components/MessageCard';
import {getAuth} from 'firebase/auth';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getMessageGroup } from '../useMessaging';
import { StatusBar } from 'expo-status-bar';
import { useAnnouncements, useBlasts } from '@app/lib/announcement';
import { AnnouncementCard } from '@app/components/Announcements';
import { CreateMessageButton } from '../components';

const MessageList = ({navigation}) => {
  const {user} = useAuth();
  const {data: groups} = useCollection<MessageGroup>(`users/${user.uid}/groups`);
  const {announcements} = useAnnouncements();
  const sortedAnnounce = announcements?.filter((item) => item.isAnnouncement == true).sort((a, b) => b.createdAt - a.createdAt);
  const {blasts} = useBlasts();
  const isFocused = useIsFocused();

  console.log("blasts", blasts)
  return (
    <>
    <SafeAreaView style={[styles.container]}>

      <Header label="Messages" containerStyle={{marginBottom: 5}} />
      <StatusBar style="dark" />
      <AnnouncementCard 
        title={"Announcements"}
        latestMessage={sortedAnnounce?.length > 0 ? sortedAnnounce[0]?.title || "New announcement": null}
        onPress={() => navigation.navigate("readannouncements", {isAnnouncement: true, data: sortedAnnounce})}
      />
      <AnnouncementCard 
        title={"Blasts"}
        latestMessage={blasts?.length > 0 ? blasts[0]?.title || "New blast": null}
        // latestMessage={"New blast"}
        onPress={() => navigation.navigate("readannouncements", {isAnnouncement: false, data: blasts})}
      />
      <FlatList
        data={groups}
        renderItem={({item}) => <MessageCard data={item} onPress={() => 
          getMessageGroup(item.members.map(m => ({uid: m.uid})), item.members.length > 2 ? item.name : null)
          .then(id => navigation.navigate('messages', { id }))
          .catch(err => console.error(err))
        }  />}
      />
     
      {/* <TouchableOpacity
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
          size={30}
          color="white"
          style={{borderWidth: 0.5, borderRadius: 20, padding: 20}}
        />
      </TouchableOpacity> */}
          {isFocused && <CreateMessageButton/>}

    </SafeAreaView>
    </>
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
