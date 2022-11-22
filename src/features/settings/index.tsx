import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Settings from './settings';
import EditProfile from './editProfile';

// import { Settings } from 'react-native';


const Stack = createNativeStackNavigator();

const SettingsStack = () => {
  return (
    <>
          <Stack.Navigator>

    <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="editProfile"
          component={EditProfile}
          options={{
            headerShown: false,
          }}
        />

          </Stack.Navigator>
    
   
    </>
  )
}

export default SettingsStack;