import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import { Settings } from 'react-native';
import Home from './screens/Home';
import {AppHeader} from '@app/components';
import Announcements from '../directory/screens/Announcements';
import ReadAnnouncements from '../directory/screens/ReadAnnouncements';
import ProgramChat from './screens/ProgramChat';
import JoinProgram from '../joinProgram';

const Stack = createNativeStackNavigator();
const HomeStack = ({}) => {
  return (
    <>
      {/*// @ts-ignore */}
      <Stack.Navigator
        initialRouteName="Potato"
        screenOptions={{header: props => <AppHeader {...props} />}}
        >
        <Stack.Screen
          name="Potato"
          component={Home}
          // options={{
          //   headerShown: false,
          // }}
        />
        <Stack.Screen
          component={ReadAnnouncements}
          name="Announcements"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={ProgramChat}
          name="ProgramChat"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="JoinProgram"
          component={JoinProgram}
          options={{ title: 'Join Program', presentation: 'modal'}}
        />
      </Stack.Navigator>
    </>
  );
};
export default HomeStack;
