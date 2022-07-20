import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet,TouchableOpacity,FlatList } from 'react-native';
import { BlockButton, ContactCard, Header, TextInput } from '@app/components';
import { colors } from '@app/constants';
import { useAuth, UserProfile } from '@app/lib';

import Ionicons from '@expo/vector-icons/Ionicons';
// import { FlatList } from 'react-native-gesture-handler';
import { useCollection } from '@app/lib/useFirebase';
const CreateMessage = ({ navigation }) => {
    const { signout } = useAuth();
    const [searchVal, setSearch] = useState("")
    const { data: users } = useCollection<UserProfile>('users');

    

  return (
    <SafeAreaView style={[styles.container]}>
          <TextInput
              value={searchVal}
              onChangeText={(val)=> setSearch(val)}
          />
        
               <FlatList
          data={users}
          renderItem={({ item }) => (
            <ContactCard
              data={item}
              onPress={() => navigation.navigate('profile', item)}
            />
          )}
      /> 

          <TouchableOpacity style={{bottom: 15,right:10,position:'absolute',marginHorizontal:20,borderRadius:20,backgroundColor:"#379770"}}>
              <Ionicons name= 'search-outline' size={30} style={{ borderWidth: 1, borderRadius: 20, padding: 20 }} />
        
          </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CreateMessage;

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
