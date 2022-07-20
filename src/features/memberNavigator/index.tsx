import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DirectoryStack from '@app/features/directory';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '@app/constants';
import Settings from '../settings';
import MessageList from '../messages/screens/MessageList';
import MessagesStack from '../messages';

const Tab = createBottomTabNavigator();

const MemberNavigator = () => (
    <>
      {/*// @ts-ignore */}
      <Tab.Navigator 
       screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Directory') {
            iconName = focused
              ? 'bookmarks'
              : 'bookmarks-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'Messages') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.green,
        tabBarInactiveTintColor: colors.black,
        initialRouteName: 'Directory',
      })
    }
      >
        <Tab.Screen name="Messages" component={MessagesStack} options={{ headerShown: false }}/>
        <Tab.Screen name="Directory" component={DirectoryStack} options={{ headerShown: false }}/>
        <Tab.Screen name="Settings" component={Settings} options={{ headerShown: true }}/>
      </Tab.Navigator>
    </>
  )

export default MemberNavigator;