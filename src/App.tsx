import React, { ComponentType, useEffect } from 'react';
import { registerRootComponent } from 'expo';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import AuthStack from '@app/features/auth';
import MemberNavigator from '@app/features/memberNavigator';
import '@app/lib/firebase';
import { ProvideAuth, useAuth } from './lib';
import { Linking, LogBox } from 'react-native';

LogBox.ignoreLogs([/AsyncStorage has been extracted from react-native core/]);
LogBox.ignoreLogs(['Require Cycle']);


const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

const App = () => {
  const handleDeepLink = (event: any) => {};
  useEffect(() => {
    Linking.addEventListener('url', handleDeepLink);
    return(() => {
      Linking.removeAllListeners('url');
    })
  })
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
   //TODO: check user role and render MemberNavigator or AdminNavigator
  if (user)
    return <MemberNavigator />;
  else 
    return <AuthStack />;
 }

export default App; 

