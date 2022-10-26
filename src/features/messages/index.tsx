import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Messages from './screens/Messages';
import MessageList from './screens/MessageList';
import Settings from '../settings';
import CreateGroup from './screens/CreateGroup';
import ReadAnnouncements from './screens/ReadAnnouncements';
import GroupInfo from './screens/GroupInfo';
import CreateBlast from '../blast/CreateBlast';
import DraftBlast from '../blast/DraftBlast';
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
          name="CreateGroup"
          component={CreateGroup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateBlast"
          component={CreateBlast}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="DraftBlast"
          component={DraftBlast}
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
        <Stack.Screen 
          name="readannouncements"
          component={ReadAnnouncements}
          options={{
            headerShown: false, 
            presentation: 'modal'
          }}
        />
      </Stack.Navigator>
    </>
  )
}

export default MessagesStack;