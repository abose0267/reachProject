import React, {useEffect, useState, useCallback} from 'react';
import {View, Image, StyleSheet, SafeAreaView, Text, Alert} from 'react-native';
import {
  BlockButton,
  TextInput,
  ActionContainer,
  Header,
  ControlledTextInput,
  ControlledInputProps,
} from '@app/components';
import {useAuth, UserLoginInput} from '@app/lib';
import {useForm} from 'react-hook-form';
import {GiftedChat, Bubble, Send, IMessage} from 'react-native-gifted-chat';
import { useMessageGroup } from '../useMessaging';

// wrap controlled input to add type safety (name field must match valid key)
const LoginTextInput = (props: ControlledInputProps<UserLoginInput>) => (
  <ControlledTextInput {...props} />
);

const Messages = ({route, navigation}) => {
  const { group, messages, sendMessage } = useMessageGroup(route.params.id);

  const displayMessages= messages.map<IMessage>((m, i) => ({
    _id: i,
    text: m.text,
    createdAt: new Date(),
    user: {
      _id: m.from.uid,
    }
  }))

  // const [messages, setMessages] = useState([]);


  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ]);
  // }, []);

  const onSend = useCallback((messages = []) => {
    sendMessage(messages[0].text);
  }, []);

  return (
    <GiftedChat
      messages={displayMessages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
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
