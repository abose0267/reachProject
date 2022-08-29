import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminPanel from './screens/AdminPanel';
import SendAnnouncement from './screens/Announcement';
import Blasts from './screens/Blasts';


const Stack = createNativeStackNavigator();


const AdminStack = () => (
    <>
        <Stack.Navigator>
            <Stack.Screen 
                name="adminpanel"
                component={AdminPanel}
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name="sendannouncement"
                component={SendAnnouncement}
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name="blasts"
                component={Blasts}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    </>
)


export default AdminStack;