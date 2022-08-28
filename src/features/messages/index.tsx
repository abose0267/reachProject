import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Messages from './screens/Messages';
import MessageList from './screens/MessageList';
import Settings from '../settings';
import CreateMessage from './screens/CreateMessage';
// import { Settings } from 'react-native';


const Stack = createNativeStackNavigator();

const MessagesStack = () => {
  return (
    <>
      {/*// @ts-ignore */}
      <Stack.Navigator initialRouteName='landing'>
        <Stack.Screen
          name="Messages"
          component={MessageList}
          // options={{ headerShown: false }}
        />
            <Stack.Screen
          name="CreateMessage"
          component={CreateMessage}
          options={{ headerShown: false }}
        />
      <Stack.Screen
          name="messages"
          component={Messages}
          options={{ title: 'Messages' }}
        />
      </Stack.Navigator>
    </>
  )
}

export default MessagesStack;