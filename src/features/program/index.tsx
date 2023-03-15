import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppHeader } from '@app/components';
import ProgramChat from './screens/ProgramChat';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Messages from '../chat';
import { colors } from '@app/constants';

const Tab = createMaterialTopTabNavigator();

const Program = ({ route, navigation }) => {
  const { data } = route.params;
  console.log({ xyz: data });
  navigation.setOptions({ title: data.name });
  return (
    <Tab.Navigator
      initialRouteName="ProgramChatInfo"
      screenOptions={{
        header: props => <AppHeader {...props} />,
        tabBarIndicatorStyle: { backgroundColor: colors.green },
        tabBarLabelStyle: { fontWeight: '600' },
      }}>
      <Tab.Screen
        name="ProgramChatMessages"
        options={{ title: 'Messages' }}
        component={Messages}
        initialParams={{ id: data.program_id, isProgramChat: true }}
      />
      <Tab.Screen
        initialParams={{ data }}
        name="ProgramChatInfo"
        options={{ title: 'Group' }}
        component={ProgramChat}
      />
    </Tab.Navigator>
  );
};

export default Program;
