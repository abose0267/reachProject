import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from './screens/Profile';
import Directory from './screens/Directory';
import Messages from '../messages/screens/Messages';
import Directory_New from './screens/Directory_New';
import Announcements from './screens/ReadAnnouncements';
import {AppHeader} from '@app/components';
import {View} from 'react-native';

const Stack = createNativeStackNavigator();

const DirectoryStack = () => (
  <>
    {/*// @ts-ignore */}
    <Stack.Navigator
      screenOptions={{header: props => <AppHeader {...props} />}}>
      {/* <Stack.Screen
        name="directory"
        component={Directory}
        options={{headerShown: false,}}
      /> */}

      <Stack.Screen
        name="directory2"
        component={Directory_New}
        options={{title: 'Directory'}}
      />

      <Stack.Screen
        name="profile"
        component={Profile}
        options={{
          title: 'Profile',
          headerRight: () => (
            <View style={{height: 50, width: 50, backgroundColor: 'red'}} />
          ),
        }}
      />
      <Stack.Screen
        name="messages"
        component={Messages}
        options={{title: 'Messages'}}
      />
{/* 
      <Stack.Screen
        name="announcements"
        component={Announcements}
        options={{title: 'Announcements'}}
      /> */}
    </Stack.Navigator>
  </>
);

export default DirectoryStack;
