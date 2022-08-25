import React, { useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, SectionList ,Text} from 'react-native';
import { BlockButton, ContactCard, Header, TextInput } from '@app/components';
import { colors } from '@app/constants';
import { useAuth, UserProfile } from '@app/lib';
import { useCollection } from '@app/lib/useFirebase';
import { data } from 'autoprefixer';

const Contacts = ({ navigation }) => {
  const { signout } = useAuth();
  const { data: users } = useCollection<UserProfile>('users');

  var sectionedList = []
  var adminList = []
  var memberList = []

  if (users) {
     for (var i = 0; i < users.length; i++) {
    if (users[i].role == "Admin") {
      console.log("pushing")
      adminList.push(users[i])
    }
    else {
      console.log("pushing")
      memberList.push(users[i])
    }
  }
  sectionedList = [{ 'title': 'ADMIN', 'data': adminList }, { 'title': 'MEMBER', 'data': memberList }]

  }
 

useEffect(() => {
  console.log("section list changed")
  console.log(sectionedList)
}, [sectionedList])
return (
  <SafeAreaView style={[styles.container]}>
    <View style={[styles.padding]}>
      <Header label="The REACH Directory" containerStyle={{ marginBottom: 5 }} />
      <TextInput label="Search" dense style={{ height: 35 }} disabled />
    </View>
    <Divider />
    <View>
      <SectionList
        renderSectionHeader={({ section: { title } }) => (
          <View style={{backgroundColor:'#dedede',width:"100%"}}>
            <Text style={{ fontSize: 15, padding: 5 , left: 6,fontWeight:'600', color: '#262626'}}>{title}</Text>  
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
        height: 1
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
    marginBottom: 75,
  },
  padding: {
    paddingHorizontal: 20,
  }
});
