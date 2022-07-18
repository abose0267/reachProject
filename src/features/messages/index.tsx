import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Messages from './screens/Messages';


const Stack = createNativeStackNavigator();

const MessagesStack = () => {
  return (
    <>
      {/*// @ts-ignore */}
      <Stack.Navigator>
        <Stack.Screen
          name="landing"
          component={Messages}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </>
  )
}

export default MessagesStack;