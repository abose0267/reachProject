import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Settings from './settings';
import EditProfile from './editProfile';
import {View, Text} from 'react-native';
import {AppHeader, Header} from '@app/components';

// import { Settings } from 'react-native';

const Stack = createNativeStackNavigator();

const SettingsStack = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{header: props => <AppHeader {...props} />}}>
        <Stack.Screen
          name="Settings"
          component={Settings}
          // options={{header: props => <AppHeader {...props} />}}
        />
        <Stack.Screen
          name="editProfile"
          component={EditProfile}
          options={{title: 'Edit Profile'}}
          // options={{
          //   headerShadowVisible: false,
          //   title: 'Edit Profile',
          //   headerTitleAlign: 'left',
          //   header: props => <AppHeader {...props} />,
          // }}
        />
      </Stack.Navigator>
    </>
  );
};

export default SettingsStack;
