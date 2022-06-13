import React, { ComponentType } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import Profile from '@app/features/directory/screens/Profile';
import Directory from './features/directory/screens/Contacts';
import Register from './features/auth/screens/Register';
import Login from './features/auth/screens/Login';
import Landing from '@app/features/auth/screens/Landing';
import '@app/lib/firebase';
import { ProvideAuth, useAuth } from './lib';
import AuthStack from '@app/features/auth';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

const Stack = createNativeStackNavigator();
const AppStack = () => (
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
    </Stack.Navigator>
  </>
)

const App = () => {

  return (
    <ProvideAuth>
      <NavigationContainer theme={navTheme}>
        <Navigator />
      </NavigationContainer>
    </ProvideAuth>
  );
};

const Navigator = () => {
  const { user } = useAuth();
  return (
    <>
      {user ? <AppStack /> : <AuthStack />}
    </>
  )
}

export default registerRootComponent(App as unknown as ComponentType<any>);
