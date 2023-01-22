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

const ReadAnnouncements = ({navigation, route}) => {
  const {announcements} = useAnnouncements();
  // const {isAnnouncement, data} = route.params;
  return (
    <SafeAreaView style={[styles.container]}>
      <FlatList
        data={announcements.sort((a, b) => b.createdAt - a.createdAt)}
        renderItem={({item}) => {
          console.log(new Date(item.createdAt.seconds * 1000).toUTCString());
          let date = new Date(item.createdAt.seconds * 1000).toUTCString();
          return (
            <View
              style={{
                // borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: 'lightgray',
                paddingHorizontal: 20,
                paddingBottom: 10,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '500',
                  marginTop: 10,
                  color: 'black',
                }}>
                {item.title}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '300',
                  marginTop: 5,
                  color: 'gray',
                }}>
                {moment(date).fromNow()}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '300',
                  marginVertical: 5,
                  color: 'black',
                }}>
                {item.message}
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
