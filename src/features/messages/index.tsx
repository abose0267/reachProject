import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Messages from './screens/Messages';
import MessageList from './screens/MessageList';
import Settings from '../settings';
import CreateMessage from './screens/CreateGroup';
import GroupInfo from './screens/GroupInfo';
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
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateMessage"
          component={CreateMessage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GroupInfo"
          component={GroupInfo}
          options={{ headerShown: false, presentation: 'modal' }}
        />
        <Stack.Screen
          name="messages"
          component={Messages}
          options={{ headerShown: false }} />
        {/* <Stack.Screen 
          name="readannouncements"
          component={ReadAnnouncements}
          options={{
            headerShown: false, 
            presentation: 'modal'
          }}
        /> */}
      </Stack.Navigator>
    </>
  )
}

export default MessagesStack;