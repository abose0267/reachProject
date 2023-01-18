import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';
import {BlockButton, ContactCard, Header, TextInput} from '@app/components';
import {colors} from '@app/constants';
import {
  BlastGroup,
  db,
  Message,
  useAuth,
  useAuthenticatedUser,
  useRightHeaderIconButton,
  UserProfile,
} from '@app/lib';
import SelectUsers from '@app/features/directory/screens/SelectUsers';
import Ionicons from '@expo/vector-icons/Ionicons';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import * as fb from 'firebase/firestore';

// import { FlatList } from 'react-native-gesture-handler';
import {useCollection} from '@app/lib/useFirebase';
import {getMessageGroup} from '../messages/useMessaging';
import {useNavigation} from '@react-navigation/native';
import {List} from 'react-native-paper';
const CreateBlast = ({navigation}) => {
  const {data: users} = useCollection<UserProfile>('users');
  const {user} = useAuthenticatedUser();

  const [selected, setSelected] = useState([]);
  const [name, setName] = useState('');
  const {navigate} = useNavigation();

  const {data: blastGroups} = useCollection<BlastGroup>('blastGroups');

  useRightHeaderIconButton({
    icon: 'message-arrow-right',
    onPress: () => navigation.navigate('DraftBlast', {selected}),
    show: selected.length > 0,
  });

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={[styles.padding]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {/* <Header label="Members" containerStyle={{marginBottom: 5}} /> */}
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
      <View style={{backgroundColor: '#dedede', width: '100%'}}>
        <Text
          style={{
            fontSize: 15,
            padding: 5,
            left: 6,
            fontWeight: '600',
            color: '#262626',
          }}>
          GROUPS
        </Text>
      </View>
      {blastGroups.map(g => (
        <List.Item
          title={g.name}
          description={g.members.map(m => m.firstname).join(', ')}
          left={props => <List.Icon {...props} icon="account-group" />}
          onPress={() =>
            navigation.navigate('DraftBlast', {
              selected: g.members.map(m => m.uid),
            })
          }
        />
      ))}
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
    'backgroundColor': 'red'
  },
  padding: {
    paddingHorizontal: 20,
  },
});
