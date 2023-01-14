import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { Settings } from 'react-native';
import Home from './screens/Home';
import { AppHeader } from '@app/components';

const Stack = createNativeStackNavigator();
const HomeStack = ({}) => {
    return(
        <>
            {/*// @ts-ignore */}
            <Stack.Navigator initialRouteName='landing'
                screenOptions={{header: props => <AppHeader {...props} />}}
            >
                <Stack.Screen
                    name="Home"
                    component={Home}
                />
            </Stack.Navigator>
        </>
    )
}
export default HomeStack;