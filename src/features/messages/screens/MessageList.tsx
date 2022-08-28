import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {BlockButton, ContactCard, Header, TextInput} from '@app/components';
import {colors} from '@app/constants';
// import { useAuth } from '@app/lib';
import {FlatList} from 'react-native';
import {useCollection} from '@app/lib/useFirebase';
import {MessageGroup, MessageProfile, useAuth, UserProfile} from '@app/lib';
import {useFocusEffect} from '@react-navigation/native';
import {MessageCard} from '@app/components/MessageCard';
import {getAuth} from 'firebase/auth';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getMessageGroup } from '../useMessaging';
import { StatusBar } from 'expo-status-bar';

const MessageList = ({navigation}) => {
  const {signout} = useAuth();

  const {user} = useAuth();
  const [searchVal, setSearch] = useState('');
  const {data: groups} = useCollection<MessageGroup>(`users/${user.uid}/groups`);

  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar style="dark" />
      <FlatList
        style={
          {
            //   backgroundColor:'green',
          }
        }
        data={groups}
        renderItem={({item}) => <MessageCard data={item} onPress={() => 
          getMessageGroup([{ uid: user.uid as string }, { uid: item.members.find((item) => item?.uid != user?.uid).uid }])
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
          bottom: 25,
          right: 30,
          zIndex: 10,
          backgroundColor: '#379770',
          borderRadius: 20,
        }}>
        <Ionicons
          name="chatbox-outline"
          size={30}
          style={{borderWidth: 1, borderRadius: 20, padding: 20}}
        />
      </TouchableOpacity> */}
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
    // padding: 75,
    // flexDirection: 'column-reverse',
  },
  padding: {
    paddingHorizontal: 20,
  },
});
