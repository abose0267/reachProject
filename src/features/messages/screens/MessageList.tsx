import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Platform } from 'react-native';
import { FlatList } from 'react-native';
import { useCollection } from '@app/lib/useFirebase';
import { MessageGroup, updateUser, useAuth } from '@app/lib';
import { useIsFocused } from '@react-navigation/native';
import { MessageCard } from '@app/components/MessageCard';
import { getMessageGroup } from '../useMessaging';
import { StatusBar } from 'expo-status-bar';
import { useAnnouncements, useBlasts } from '@app/lib/announcement';
import { CreateMessageButton } from '../components';
import {
  getExpoPushTokenAsync,
  getPermissionsAsync,
  requestPermissionsAsync,
  setNotificationChannelAsync,
} from 'expo-notifications';

const MessageList = ({ navigation }) => {
  const { user } = useAuth();
  const { data: groups } = useCollection<MessageGroup>(
    `users/${user.uid}/groups`,
  );
  const { announcements } = useAnnouncements();
  const sortedAnnounce = announcements
    ?.filter(item => item.isAnnouncement == true)
    .sort((a, b) => b.createdAt - a.createdAt);
  const { blasts } = useBlasts();
  const isFocused = useIsFocused();

  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    const token = (await getExpoPushTokenAsync()).data;
    console.log(token);
    updateUser(user.uid, {
      token,
    }).catch(err => console.log(err));
    // this.setState({ expoPushToken: token });

    if (Platform.OS === 'android') {
      setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  };

  useEffect(() => {
    if (user.uid) registerForPushNotificationsAsync();
  }, [user]);
  // sort groups such that program chats are first
  groups.sort((a, b) => {
    if (a.program_id && !b.program_id) return -1;
    if (!a.program_id && b.program_id) return 1;
    return 0;
  });

  return (
    <>
      <SafeAreaView style={[styles.container]}>
        <StatusBar style="dark" />
        <FlatList
          data={groups.sort((a, b) => {
            if (a.program_id && !b.program_id) return -1;
            if (!a.program_id && b.program_id) return 1;
            return 0;
          })}
          contentContainerStyle={{ marginHorizontal: 20 }}
          renderItem={({ item }) => (
            <MessageCard
              data={item}
              onPress={() => {
                if (item.program_id == null) {
                  getMessageGroup(
                    item.members.map(m => ({ uid: m.uid })),
                    item.members.length > 2 ? item.name : null,
                  )
                    .then(id => navigation.navigate('messages', { id }))
                    .catch(err => console.error(err));
                } else {
                  navigation.navigate('ProgramChat', { data: item });
                }
              }}
            />
          )}
        />
        {isFocused && <CreateMessageButton />}
      </SafeAreaView>
    </>
  );
};

export default MessageList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // marginBottom: 20,
  },
  padding: {
    paddingHorizontal: 20,
  },
});
