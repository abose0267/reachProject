import React, { useEffect, useState, useCallback } from 'react';
import { View, Image, StyleSheet, SafeAreaView, Text, Alert } from 'react-native';
import { BlockButton, TextInput, ActionContainer, Header, ControlledTextInput, ControlledInputProps } from '@app/components';
import { useAuth, UserLoginInput } from '@app/lib';
import { useForm } from 'react-hook-form';
import { GiftedChat,Bubble,Send } from 'react-native-gifted-chat'

// wrap controlled input to add type safety (name field must match valid key)
const LoginTextInput = (props: ControlledInputProps<UserLoginInput>) => (
  <ControlledTextInput {...props} />
);

const Messages = ({ navigation }) => {




  const { signin } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginInput>({});

  const onSubmit = (data: UserLoginInput) => signin(data).catch(err => Alert.alert(err.message));


  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])


  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
   
       <GiftedChat
      messages={messages}
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
    maxWidth: 200
  }
});
