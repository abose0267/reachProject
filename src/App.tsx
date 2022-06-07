import React, {ComponentType} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {registerRootComponent} from 'expo';
import Profile from '@app/features/directory/screens/Profile';
import Directory from './features/directory/screens/Contacts';
import Register from './features/auth/screens/Register';
import Login from './features/auth/screens/Login';
import Landing from '@app/features/auth/screens/Landing';
import './firebase';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="landing"
          component={Landing}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="directory"
          component={Directory}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="profile"
          component={Profile}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default registerRootComponent(App as unknown as ComponentType<any>);
