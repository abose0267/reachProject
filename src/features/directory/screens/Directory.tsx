import React, {useEffect} from 'react';
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
import {colors} from '@app/constants';
import {useAuth, useAuthenticatedUser, UserProfile} from '@app/lib';
import {useCollection} from '@app/lib/useFirebase';
import {useAnnouncements, useBlasts} from '@app/lib/announcement';
import {AnnouncementCard} from '@app/components/Announcements';

const Contacts = ({navigation}) => {
  const {signout} = useAuth();
  const {data: users} = useCollection<UserProfile>('users');
  const {user} = useAuthenticatedUser();
  const {announcements} = useAnnouncements();
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
      {title: 'REACH Staff', data: adminList},
      {title: 'MEMBER', data: memberList},
    ];
  }

  useEffect(() => {
    // console.log("section list changed")
    // console.log(sectionedList)
  }, [sectionedList]);
  return (
    <SafeAreaView style={[styles.container]}>
      <View style={[styles.padding]}>
        <Header label="The REACH Project" containerStyle={{marginBottom: 5}} />

        {/* <View>
        <TouchableOpacity style={{ height: Dimensions.get('window').height / 2.6, backgroundColor: '#379770', borderRadius: 10, padding: 20, justifyContent:'center' }} onPress={() => { navigation.navigate("announcements") }}>
          <Text style={{textAlign:'center',fontSize:30}}>
            Announcements
          </Text>
        </TouchableOpacity>
        
         <TouchableOpacity style={{ height: Dimensions.get('window').height / 2.6, backgroundColor: '#379770', borderRadius: 10, padding: 20, justifyContent:'center' ,marginTop:20}} onPress={() => { navigation.navigate("directory2") }}>
          <Text style={{textAlign:'center',fontSize:30}}>
            Access Directory
          </Text>
          </TouchableOpacity>
      </View> */}
      </View>
      <Divider />
      <View style={[styles.padding, {flex: 1, justifyContent: 'center'}]}>
        <BlockButton style={{height: 80}} onPress={() => {navigation.navigate("announcements")}} >Announcements</BlockButton>
        <BlockButton style={{height: 80, marginTop:20}} outlined onPress={() => {navigation.navigate("directory2")}}>Directory</BlockButton>
      </View>
    </SafeAreaView>
  );
};

export default Contacts;

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
    paddingHorizontal: 20,
  },
});
