import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Messages from './screens/Messages';
import MessageList from './screens/MessageList';
import Settings from '../settings/settings';
import CreateGroup from './screens/CreateGroup';
// import ReadAnnouncements from './screens/ReadAnnouncements';
import GroupInfo from './screens/GroupInfo';
import CreateBlast from '../blast/CreateBlast';
import DraftBlast from '../blast/DraftBlast';
import Pinned from './screens/Pinned';
import { AppHeader } from '@app/components';
import MemberInfo from './screens/MemberInfo';
// import { Settings } from 'react-native';


const Stack = createNativeStackNavigator();

const MessagesStack = ({}) => {
  return (
    <>
      {/*// @ts-ignore */}
      <Stack.Navigator initialRouteName='landing'
              screenOptions={{header: props => <AppHeader {...props} />}}
      >
        <Stack.Screen
          name="Messages"
          component={MessageList}
        />
        <Stack.Screen
          name="CreateGroup"
          component={CreateGroup}
          options={{title: "Create Group"}}
        />
        <Stack.Screen
          name="CreateBlast"
          component={CreateBlast}
          options={{title: "Members"}}

        />
         <Stack.Screen
          name="DraftBlast"
          component={DraftBlast}
          options={{title: "Draft Blast"}}
          />
        <Stack.Screen
          name="GroupInfo"
          component={GroupInfo}
          options={{ presentation: 'modal', title: 'Group' }}
        />
        <Stack.Screen
          name="messages"
          component={Messages}
          options={{title: "Messages"}}
        />
        <Stack.Screen 
          name="Pinned"
          component={Pinned}
          options={{
            headerShown: false,
            presentation: 'modal'
          }}
        />
        <Stack.Screen 
          name="MemberInfo"
          component={MemberInfo}
          options={{
            headerShown: false,
            presentation: "modal",
          }}
        />
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