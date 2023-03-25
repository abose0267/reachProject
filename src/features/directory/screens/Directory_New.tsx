import React, { useEffect } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  SectionList,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  BlockButton,
  ContactCard,
  Header,
  TextInput,
  BigButton,
} from '@app/components';
import { colors } from '@app/constants';
import { useAuth, useAuthenticatedUser, UserProfile } from '@app/lib';
import { useCollection } from '@app/lib/useFirebase';
import { useAnnouncements, useBlasts } from '@app/lib/announcement';
import { AnnouncementCard } from '@app/components/Announcements';

const Directory_New = ({ navigation }) => {
  const { signout } = useAuth();
  const { data: users } = useCollection<UserProfile>('users');
  const { user } = useAuthenticatedUser();
  const { announcements } = useAnnouncements();
  const sortedAnnounce = announcements
    ?.filter(item => item.isAnnouncement == true)
    .sort((a, b) => b.createdAt - a.createdAt);
  var sectionedList = [];
  var adminList = [];
  var memberList = [];

  if (users) {
    for (var i = 0; i < users.length; i++) {
      if (users[i].role == 'Admin' && users[i].uid != user?.uid) {
        adminList.push(users[i]);
      } else if (users[i].uid != user?.uid) {
        memberList.push(users[i]);
      }
    }
    sectionedList = [
      { title: 'REACH Staff', data: adminList },
      { title: 'Members', data: memberList },
    ];
  }

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={[styles.padding]}>
        <View>
          {/* <AnnouncementCard 
        title={"Announcements"}
        latestMessage={sortedAnnounce?.length > 0 ? sortedAnnounce[0]?.title || "New announcement": null}
        onPress={() => navigation.navigate("readannouncements", {isAnnouncement: true, data: sortedAnnounce})}
        /> */}

          {/* <TouchableOpacity style={{ height: Dimensions.get('window').height / 2.6, backgroundColor: '#379770', borderRadius: 10, padding: 20, justifyContent:'center' }} onPress={() => { navigation.navigate("") }}>
          <Text style={{textAlign:'center',fontSize:30}}>
            Announcements
          </Text>
        </TouchableOpacity>
        
         <TouchableOpacity style={{ height: Dimensions.get('window').height / 2.6, backgroundColor: '#379770', borderRadius: 10, padding: 20, justifyContent:'center' ,marginTop:20}} onPress={() => { navigation.navigate("") }}>
          <Text style={{textAlign:'center',fontSize:30}}>
            Access Directory
          </Text>
          </TouchableOpacity>
     */}

          <SectionList
            renderSectionHeader={({ section: { title } }) => (
              <View style={{ backgroundColor: '#dedede', width: '100%' }}>
                <Text
                  style={{
                    fontSize: 15,
                    padding: 5,
                    left: 6,
                    fontWeight: '600',
                    color: '#262626',
                  }}>
                  {title}
                </Text>
              </View>
            )}
            sections={sectionedList}
            renderItem={({ item }) => (
              <ContactCard
                data={item}
                onPress={() => navigation.navigate('profile', item)}
              />
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Directory_New;

const Divider = () => (
  <View
    style={{
      flexDirection: 'row',
      height: 1,
      backgroundColor: colors.grey,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 1,
      shadowRadius: 1,
      marginTop: 10,
    }}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // marginHorizontal: 20,
    // marginBottom: 75,
  },
  padding: {
    // paddingHorizontal: 20,
  },
});
