import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {BlockButton, ContactCard, Header, TextInput} from '@app/components';
import {colors} from '@app/constants';
import {useAuth, UserProfile} from '@app/lib';
import SelectUsers from '@app/features/directory/screens/SelectUsers';
import Ionicons from '@expo/vector-icons/Ionicons';
import {MaterialCommunityIcons} from '@expo/vector-icons';

// import { FlatList } from 'react-native-gesture-handler';
import {useCollection} from '@app/lib/useFirebase';
import {getMessageGroup} from '../useMessaging';
const CreateMessage = ({navigation}) => {
  const {data: users} = useCollection<UserProfile>('users');

  const [selected, setSelected] = useState([]);
  const [name, setName] = useState('');


  return (
    <SafeAreaView style={[styles.container]}>
      {/* <TextInput
              value={searchVal}
              onChangeText={(val)=> setSearch(val)}
      /> */}
      <View style={[styles.padding]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Header label="Create Group" containerStyle={{marginBottom: 5}} />
          {selected.length > 1 && name.length > 0 && (
            <MaterialCommunityIcons
              name="message-arrow-right"
              size={30}
              color={colors.green}
              onPress={() =>
                getMessageGroup(selected.map(uid => ({uid})), name).then(id =>
                  console.log(id),
                )
              }
            />
          )}
        </View>

        <TextInput
          label="Group Name"
          dense
          style={{height: 40}}
          value={name}
          onChange={e => setName(e.nativeEvent.text)}
          returnKeyType='done'
        />
      </View>
      <Divider />
      <SelectUsers onChange={s => setSelected(s)} />

      {/* <TouchableOpacity style={{bottom: 15,right:10,position:'absolute',marginHorizontal:20,borderRadius:20,backgroundColor:"#379770"}}>
              <Ionicons name= 'search-outline' size={30} style={{ borderWidth: 1, borderRadius: 20, padding: 20 }} />
        
          </TouchableOpacity> */}
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
        height: 1,
      },
      shadowOpacity: 1,
      shadowRadius: 1,
      marginTop: 10,
      zIndex: 100,
    }}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // marginHorizontal: 20,
    marginBottom: 20,
    // padding: 75,
    // flexDirection: 'column-reverse',
  },
  padding: {
    paddingHorizontal: 20,
  },
});
