import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './screens/Profile';
import Directory from './screens/Directory';

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
          options={{ title: 'Profile' }}
        />
      </Stack.Navigator>
    </>
  )
  
export default DirectoryStack;