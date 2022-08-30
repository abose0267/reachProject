import React, { useEffect, useState, useCallback } from 'react';
import { View, Image, StyleSheet, SafeAreaView, Text, Alert, KeyboardAvoidingView, Dimensions, TextInput, Keyboard, TouchableOpacity, } from 'react-native';
import {
  BlockButton,
  ActionContainer,
  Header,
  ControlledTextInput,
  ControlledInputProps,
} from '@app/components';
import { Message, useAuth, useAuthenticatedUser, UserLoginInput } from '@app/lib';
import { useForm } from 'react-hook-form';
import { GiftedChat, Bubble, Send, IMessage } from 'react-native-gifted-chat';
import { useMessageGroup } from '../useMessaging';
import { addDoc } from 'firebase/firestore';

// wrap controlled input to add type safety (name field must match valid key)
const LoginTextInput = (props: ControlledInputProps<UserLoginInput>) => (
  <ControlledTextInput {...props} />
);

const Messages = ({ route, navigation }) => {
  const { group, messages, sendMessage } = useMessageGroup(route.params.id);
  const { user, loading } = useAuthenticatedUser();

  // const displayMessages= messages.map<IMessage>((m, i) => ({
  //   _id: i,
  //   text: m.text,
  //   createdAt: new Date(),
  //   user: {
  //     _id: m.from.uid,
  //   }
  // }))

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

  const onSend = useCallback((messages: Message[] = []) => {
    sendMessage(messages[0]);
  }, []);

  console.log({ user })
  const [height, setHeight] = useState(50);
  const [keyboardisOpen, setKeyboardisOpen] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [text, setText] = useState('');
  const isOpen = Keyboard.addListener('keyboardDidShow', (e) => {
    setKeyboardHeight(e.endCoordinates.height);
    setKeyboardisOpen(true);
  })
  const isClose = Keyboard.addListener('keyboardDidHide', (e) => {

    setKeyboardisOpen(false);
  })
  // console.log(messages.map(m => ({...m, date: m.createdAt})))
  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages.sort((a, b) => b.createdAt - a.createdAt)}
        onSend={messages => onSend(messages)}
        user={{
          _id: user?.uid,
          name: `${user?.firstname} ${user?.lastname}`,
        }}
        //@ts-ignore
        // multiline
        // textInputStyle={{
        //   marginRight: 10,
        //   // padding: 10,
        //   borderWidth: 1,
        //   height: 50,
        // }}
        // renderInputToolbar={() => (
        //   <View
        //     style={{
        //       flexDirection: 'row',
        //       position: "absolute",
        //       width: Dimensions.get("screen").width,
        //       bottom: keyboardisOpen ? keyboardHeight - 100 : -25,
        //     }}
        //   >
        //     <TextInput
        //       style={{
        //         borderWidth: 1,
        //         width: Dimensions.get("screen").width - 60,
        //         minHeight: 50,
        //         height: height,
        //         padding: 10,
        //         fontSize: 15,
        //         flexDirection: "column",
        //         justifyContent: "center",
        //         textAlign: "justify",
        //         paddingTop: 10,
        //         paddingBottom: 10,
        //       }}
        //       scrollEnabled={false}
        //       onContentSizeChange={(e) =>
        //         setHeight(e.nativeEvent.contentSize.height)

        //       }
        //       onChangeText={(text) => {
        //         setText(text);
        //       }}
        //       // returnKeyLabel="send"
        //       multiline
        //     />
        //     <TouchableOpacity
        //       style={{
        //         height: height,
        //         minHeight: 50,
        //         width: 60,
        //         borderWidth: 1,
        //         borderColor: "black",
        //         position: "absolute",
        //         alignItems: "center",
        //         justifyContent: "center",
        //         right: 0,
        //       }}
        //       onPress={() => {

        //       }}
        //     >
        //       <Text style={{ textAlign: "center", fontSize: 17, color: "#f76f6d"}}>Send</Text>
        //     </TouchableOpacity>
        //   </View>
        // )}
        // minComposerHeight={50}
        // maxComposerHeight={50}
        // minInputToolbarHeight={40}
      // isKeyboardInternallyHandled={false}
      />
      <KeyboardAvoidingView behavior='position' />
    </View>
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
