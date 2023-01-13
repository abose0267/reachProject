import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DirectoryStack from '@app/features/directory';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { colors } from '@app/constants';
import Settings from '../settings/settings';
import MessageList from '../messages/screens/MessageList';
import MessagesStack from '../messages';
import { useAuthenticatedUser } from '@app/lib';
import AdminStack from '../admin';
import { Portal, Provider } from 'react-native-paper';
import SettingsStack from '../settings';

const Tab = createBottomTabNavigator();
// 
const MemberNavigator = () => {
  const {user} = useAuthenticatedUser();
  return(
    <Provider>
      {/*// @ts-ignore */}
      <Tab.Navigator 
       screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Directory') {
            iconName = focused
              ? 'contacts'
              : 'contacts-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'Messages') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === "Admin") {
            iconName = focused ? "shield" : "shield-outline";
          }

          // You can return any component that you like here!
          // return a MaterialCommunityIcons only if the iconName is 'contacts'. Otherwise, return an Ionicons
          return iconName == 'contacts' || iconName == 'contacts-outline' ? <MaterialCommunityIcons name={iconName} size={size} color={color} /> : <Ionicons name={iconName} size={size} color={color} />;
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
        <Tab.Screen name="Settings" component={SettingsStack} options={{ headerShown: false }}/>
      </Tab.Navigator>
    </Provider>
  )}

export default MemberNavigator;