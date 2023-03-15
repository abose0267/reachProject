import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Settings } from 'react-native';
import Home from './screens/Home';
import { AppHeader } from '@app/components';
import Announcements from '../directory/screens/Announcements';
import ReadAnnouncements from '../directory/screens/ReadAnnouncements';
import ProgramChat from './screens/ProgramChat';
import JoinProgram from '../joinProgram';
import Messages from '../messages/screens/Messages';
import GroupInfo from '../messages/screens/GroupInfo';
import Pinned from '../messages/screens/Pinned';
import Program from '../program';

const Stack = createNativeStackNavigator();
const HomeStack = ({ }) => {
  return (
    <>
      {/*// @ts-ignore */}
      <Stack.Navigator
        initialRouteName="Potato"
        screenOptions={{ header: props => <AppHeader {...props} /> }}>
        <Stack.Screen
          name="Potato"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={ReadAnnouncements}
          name="Announcements"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={Program}
          name="ProgramChat"
          options={{
            title: 'Program',
          }}
        />
        <Stack.Screen
          name="JoinProgram"
          component={JoinProgram}
          options={{ title: 'Join Program', presentation: 'modal' }}
        />
        <Stack.Screen
          name="messages"
          component={Messages}
          options={{ title: 'Messages' }}
        />
        <Stack.Screen
          name="GroupInfo"
          component={GroupInfo}
          options={{ presentation: 'modal', title: 'Group' }}
        />
        <Stack.Screen
          name="Pinned"
          component={Pinned}
          options={{
            headerShown: false,
            presentation: 'modal',
          }}
        />
      </Stack.Navigator>
    </>
  );
};
export default HomeStack;
