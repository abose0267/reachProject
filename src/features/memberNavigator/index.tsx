import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DirectoryStack from '@app/features/directory';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '@app/constants';
import Settings from '../settings';
import MessageList from '../messages/screens/MessageList';
import MessagesStack from '../messages';
import { useAuthenticatedUser } from '@app/lib';
import AdminStack from '../admin';

const Tab = createBottomTabNavigator();
// 
const MemberNavigator = () => {
  const {user} = useAuthenticatedUser();
  return(
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
          } else if (route.name === "Admin") {
            iconName = focused ? "shield" : "shield-outline";
          }

          // You can return any component that you like here!
          return <Ionicons style={{marginTop:10}} name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.green,
        tabBarInactiveTintColor: colors.black,
        initialRouteName: 'Directory',
        })
      
    }
      >
        <Tab.Screen name="Messages" component={MessagesStack} options={{ headerShown: false }}/>
        <Tab.Screen name="Directory" component={DirectoryStack} options={{ headerShown: false }} />
        {user?.role == "Admin" && <Tab.Screen name="Admin" component={AdminStack} options={{ headerShown: false }}/>}
        <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false }}/>
      </Tab.Navigator>
    </>
  )}

export default MemberNavigator;