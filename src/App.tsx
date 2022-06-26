import React, { ComponentType } from 'react';
import { registerRootComponent } from 'expo';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import AuthStack from '@app/features/auth';
import MemberNavigator from '@app/features/memberNavigator';
import '@app/lib/firebase';
import { ProvideAuth, useAuth } from './lib';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

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
   //TODO: check user role and render MemberNavigator or AdminNavigator
  if (user)
    return <MemberNavigator />;
  else 
    return <AuthStack />;
 }

export default registerRootComponent(App as unknown as ComponentType<any>);
