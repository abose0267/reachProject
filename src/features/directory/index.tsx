import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './screens/Profile';
import Directory from './screens/Directory';
import Messages from '../messages/screens/Messages';
import Directory_New from './screens/Directory_New';
import Announcements from './screens/Announcements';

const Stack = createNativeStackNavigator();

const DirectoryStack = () => (
    <>
      {/*// @ts-ignore */}
      <Stack.Navigator>
        <Stack.Screen
          name="directory"
          component={Directory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="profile"
          component={Profile}
          options={{ headerShown: false }}
      />
              <Stack.Screen
          name="messages"
          component={Messages}
          options={{ title: 'Messages' }}
      />
      
               <Stack.Screen
          name="directory2"
          component={Directory_New}
          options={{ title: 'Directory' }}
      />
      
             <Stack.Screen
          name="announcements"
          component={Announcements}
          options={{ title: 'Announcements' }}
        />
      </Stack.Navigator>
    </>
  )
  
export default DirectoryStack;