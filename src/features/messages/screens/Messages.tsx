import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
  Alert,
  KeyboardAvoidingView,
  Dimensions,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {
  BlockButton,
  ActionContainer,
  Header,
  ControlledTextInput,
  ControlledInputProps,
  Divider,
} from '@app/components';
import { Message, useAuth, useAuthenticatedUser, UserLoginInput } from '@app/lib';
import { useForm } from 'react-hook-form';
import { GiftedChat, Bubble, Send, IMessage } from 'react-native-gifted-chat';
import { useMessageGroup } from '../useMessaging';
import { addDoc } from 'firebase/firestore';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Fuse from 'fuse.js'
// wrap controlled input to add type safety (name field must match valid key)
const LoginTextInput = (props: ControlledInputProps<UserLoginInput>) => (
  <ControlledTextInput {...props} />
);

const Messages = ({ route, navigation }) => {
  const { group, messages, sendMessage } = useMessageGroup(route.params.id);
  const { user, loading } = useAuthenticatedUser();

  const onSend = useCallback((messages: Message[] = []) => {
    sendMessage(messages[0]);
  }, []);

  // console.log({user});
  const [height, setHeight] = useState(50);
  const [text, setText] = useState('');
  const [people, setPeople] = useState([]);
  const { goBack } = useNavigation();
  // console.log(messages.map(m => ({...m, date: m.createdAt})))
  const options = {
    keys: [
      "username",
      "firstname"
    ]
  }
  const fuse = new Fuse(group?.members, options)
  useEffect(() => {
    const textmatch = text.match(/@(\w+)/)
    if(text.length == 0) {
      setPeople([])
    }
    if (textmatch != null) {
      // console.log(textmatch)
      // console.log(JSON.stringify(group.members, null, 2))
      const result = fuse.search(textmatch[1])
      console.log(result)
      setPeople(result.map(r => r.item))
    }
  }, [text])
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ marginBottom: 5 }}>
        <View
          style={{
            marginHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Ionicons
            name="arrow-back"
            size={28}
            color="black"
            style={{ position: 'relative', top: 3 }}
            onPress={() => goBack()}
          />
          <Header
            label={group?.members?.length > 2 ? group?.name : 'Messages'}
            containerStyle={{ marginBottom: 5, marginLeft: 20 }}
          />
          {user?.role == 'Admin' && (
            <Ionicons
              name="information-circle-outline"
              size={28}
              color="black"
              style={{ marginLeft: 'auto' }}
              onPress={() =>
                navigation.navigate('GroupInfo', { id: route?.params?.id })
              }
            />
          )}
        </View>
        <Divider />
      </View>
      <GiftedChat
        messages={messages.sort((a, b) => b.createdAt - a.createdAt)}
        onSend={messages => onSend(messages)}
        user={{
          _id: user?.uid,
          name: `${user?.firstname} ${user?.lastname}`,
        }}
        onInputTextChanged={text => setText(text)}
        parsePatterns={linkStyle => [
          {
            // match all strings starting with @
            pattern: /@(\w+)/,
            style: {
              fontWeight: "800",
              color: "white",
            },
            onPress: (user) => {
              alert(`Pressed on username: ${user}`);
            },
          }
        ]}
        
        renderComposer={props => (
          <>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#f2f2f2',
                borderRadius: 10,
                top: 15,
                paddingHorizontal: 10,
                paddingVertical: 5,
                marginHorizontal: 10,
              }}>
                <TextInput
                  style={{
                    flex: 1,
                    minHeight: 30,
                    height: height < 100 ? height : 100,
                    fontSize: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                  }}
                  placeholder="Type a message"
                  multiline
                  value={props.text}
                  onChangeText={props.onTextChanged}
                  onContentSizeChange={e =>
                    setHeight(e.nativeEvent.contentSize.height)
                  }
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: '#f2f2f2',
                    borderRadius: 20,
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                  }}
                  onPress={() => {
                    const messages = JSON.parse(JSON.stringify(props.messages))
                    messages.unshift({
                      // generate a random id
                      _id: Math.random().toString(36).substr(2, 9),
                      text: props.text,
                      createdAt: new Date(),
                      user: {
                        _id: user?.uid,
                        name: `${user?.firstname} ${user?.lastname}`,
                      },
                    })
                    onSend(messages) // send the message
                    props.onTextChanged('') // clear the input
                  }}
                  >
                  <Ionicons name="send" size={24} color="#379770" />
                </TouchableOpacity>
            </View>
          </>
        )}
        renderAccessory={() => (
          (people.length > 0) && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
                top: 20,
                left: 5,
              }}
            >
              {people.map(person => (
                <TouchableOpacity
                  style={{
                    backgroundColor: '#379770',
                    borderRadius: 10,
                    minWidth: 60,
                    minHeight: 40,
                    margin: 5,
                    paddingHorizontal: 5,
                    alignItems: 'center',
                    justifyContent: 'center',

                  }}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    @{person.username}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )
        )}
      />
    </SafeAreaView>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

    justifyContent: 'space-between',
  },
  text: {
    fontSize: 25,
    color: 'black',
    fontWeight: '500',
    paddingTop: 20,
    textAlign: 'center',
  },
  banner: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  imageContainer: {
    maxWidth: 200,
  },
});