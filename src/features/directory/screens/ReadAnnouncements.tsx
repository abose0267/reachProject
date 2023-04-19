import {BlockButton, Header} from '@app/components';
import {useAuthenticatedUser} from '@app/lib';
import {StatusBar} from 'expo-status-bar';
import React, {useEffect} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  SectionList,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useAnnouncements} from '@app/lib/announcement';
import moment from 'moment';
import { ProgramChat } from '@app/lib/programchat';
import { useCollection } from '@app/lib/useFirebase';

const ReadAnnouncements = ({navigation, route}) => {
  const {announcements} = useAnnouncements();
  const {user} = useAuthenticatedUser();
  const {data: groups} = useCollection<ProgramChat>(
    `users/${user?.uid}/groups`,
  );

  const userPrograms = groups?.filter(group => group?.program_id != null).map(g => g.program_id);
  // const {isAnnouncement, data} = route.params;
  return (
    <SafeAreaView style={[styles.container]}>
      <FlatList
        data={announcements
          .filter(item => item.program_id == null || userPrograms.includes(item.program_id) || item.program_id == '0')
          .sort((a, b) => b.createdAt - a.createdAt)
        }
        renderItem={({item, index}) => {
          console.log(new Date(item.createdAt.seconds * 1000).toUTCString());
          let date = new Date(item.createdAt.seconds * 1000).toUTCString();
          return (
            <View
              style={{
                // borderTopWidth: 1,
                // borderBottomWidth: 1,
                backgroundColor: index % 2 == 0 ? '#f5f5f5' : 'white',
                borderColor: 'lightgray',
                paddingHorizontal: 20,
                paddingBottom: 10,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  marginTop: 10,
                  color: 'black',
                }}>
                {`${item.program_name}: ${item.title}`}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '300',
                  marginBottom: 5,
                  color: 'black',
                }}>
                {item.message}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: 'gray',
                  textTransform: 'capitalize'
                }}>
                {moment(date).fromNow()}
              </Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default ReadAnnouncements;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // marginHorizontal: 10,
  },
});
