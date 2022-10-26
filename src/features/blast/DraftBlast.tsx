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
import {
  db,
  Message,
  useAuth,
  useAuthenticatedUser,
  UserProfile,
} from '@app/lib';
import SelectUsers from '@app/features/directory/screens/SelectUsers';
import Ionicons from '@expo/vector-icons/Ionicons';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import * as fb from 'firebase/firestore';

// import { FlatList } from 'react-native-gesture-handler';
import {useCollection} from '@app/lib/useFirebase';
import {getMessageGroup} from '../messages/useMessaging';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Text} from 'react-native-paper';
const DraftBlast = ({}) => {
  const {data: users} = useCollection<UserProfile>('users');
  const {user} = useAuthenticatedUser();

  const {params} = useRoute();

  //   console.log(params);

  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState('');

  const handlePress = async () => {
    for (const uid of params.selected) {
      const id = await getMessageGroup([{uid}, {uid: user.uid}]);
      const collectionRef = fb.collection(
        db,
        `messageGroups/${id}/messages`,
      ) as fb.CollectionReference<Message>;
      const m: Message = {
        _id: (Math.random() + 1).toString(36).substring(2),
        createdAt: new Date(),
        text: message,
        user: {
          _id: user.uid,
          name: `${user.firstname} ${user.lastname}`,
        },
      };
      await fb.addDoc(collectionRef, m);
    }
  };

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
          <Header label="Draft Message" containerStyle={{marginBottom: 5}} />
          {selected.length > 0 && (
            <MaterialCommunityIcons
              name="message-arrow-right"
              size={30}
              color={colors.green}
              onPress={handlePress}
            />
          )}
        </View>
      </View>
      <Divider />

      <View style={{marginHorizontal: 20, marginVertical: 15}}>
        <TextInput
          style={{
            marginBottom: 5,
            height: 100,
            backgroundColor: 'white',
          }}
          placeholder="Type a message..."
          multiline
          onChangeText={text => setMessage(text)}
          value={message}
        />
        <Text>
          Use keywords such as to{' '}
          <Text style={{color: colors.green}}>$firstname</Text> and{' '}
          <Text style={{color: colors.green}}>$lastname</Text> to automatically
          substitute values
        </Text>
        <BlockButton style={{marginTop: 20}} onPress={handlePress}>
          {' '}
          Send{' '}
        </BlockButton>
      </View>
    </SafeAreaView>
  );
};

export default DraftBlast;

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
