import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './screens/Profile';
import Directory from './screens/Directory';
import Messages from '../messages/screens/Messages';

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
      </Stack.Navigator>
    </>
  )
  
export default DirectoryStack;