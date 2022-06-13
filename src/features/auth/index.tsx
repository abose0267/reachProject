import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "./screens/Landing";
import Login from './screens/Login';
import Register from './screens/Register';


const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <>
      {/*// @ts-ignore */}
      <Stack.Navigator>
        <Stack.Screen
          name="landing"
          component={Landing}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="register"
          component={Register}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  )
}

export default AuthStack;