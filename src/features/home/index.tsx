import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { Settings } from 'react-native';
import Home from './screens/Home';
import { AppHeader } from '@app/components';
import Announcements from '../directory/screens/Announcements';
import ReadAnnouncements from '../directory/screens/ReadAnnouncements';

const Stack = createNativeStackNavigator();
const HomeStack = ({}) => {
    return(
        <>
            {/*// @ts-ignore */}
            <Stack.Navigator initialRouteName='landing'
                screenOptions={{header: props => <AppHeader {...props} />}}
            >
                <Stack.Screen
                    name="Potato"
                    component={Home}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen 
                    component={ReadAnnouncements}
                    name="Announcements"
                    options={{
                        headerShown: false,
                    }}

                />
            </Stack.Navigator>
        </>
    )
}
export default HomeStack;