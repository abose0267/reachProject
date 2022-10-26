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
import {db, Message, useAuth, useAuthenticatedUser, UserProfile} from '@app/lib';
import SelectUsers from '@app/features/directory/screens/SelectUsers';
import Ionicons from '@expo/vector-icons/Ionicons';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import * as fb from 'firebase/firestore';

// import { FlatList } from 'react-native-gesture-handler';
import {useCollection} from '@app/lib/useFirebase';
import {getMessageGroup} from '../messages/useMessaging';
import { useNavigation } from '@react-navigation/native';
const CreateBlast = ({navigation}) => {
  const {data: users} = useCollection<UserProfile>('users');
  const {user} = useAuthenticatedUser();

  const [selected, setSelected] = useState([]);
  const [name, setName] = useState('');
  const {navigate} = useNavigation()

  const handlePress = async () => {
    for (const uid of selected) {
      const id = await getMessageGroup([{uid}, {uid: user.uid}])
      const collectionRef = fb.collection(
        db,
        `messageGroups/${id}/messages`,
      ) as fb.CollectionReference<Message>;
      const m:Message = {
        _id: (Math.random() + 1).toString(36).substring(2),
        createdAt: new Date(),
        text: 'blast??',
        user: {
          _id: user.uid,
          name: `${user.firstname} ${user.lastname}`
        }
      }
      await fb.addDoc(collectionRef, m);

    }
    

  }
  
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
          <Header label="Create ??" containerStyle={{marginBottom: 5}} />
          {selected.length > 0 && (
            <MaterialCommunityIcons
              name="message-arrow-right"
              size={30}
              color={colors.green}
              onPress={() => navigation.navigate('DraftBlast', {selected})}
            />
          )}
        </View>

        {/* <TextInput
          label="Group Name"
          dense
          style={{height: 40,}}
          value={name}
          onChange={e => setName(e.nativeEvent.text)}
          returnKeyType="done"
        /> */}
      </View>
      <Divider />
      <SelectUsers onChange={s => setSelected(s)} showCurrentUser={false} />
    </SafeAreaView>
  );
};

export default CreateBlast;

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
