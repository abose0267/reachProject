import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminPanel from './screens/AdminPanel';
import SendAnnouncement from './screens/Announcement';
import CreateProgramChat from './screens/CreateProgramChat';
import CreateUpcomingEvent from './screens/CreateUpcomingEvent';
import { AppHeader } from '@app/components';

const Stack = createNativeStackNavigator();

const AdminStack = () => (
    <>
        <Stack.Navigator
            screenOptions={{ header: props => <AppHeader {...props} /> }}>
            <Stack.Screen
                name="adminpanel"
                component={AdminPanel}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="sendannouncement"
                component={SendAnnouncement}
                options={{ title: 'Send Announcement' }}
            />
            <Stack.Screen
                name="blasts"
                component={CreateProgramChat}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="events"
                component={CreateUpcomingEvent}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    </>
);

export default AdminStack;
