import { BlockButton, Header, TextInput } from '@app/components';
import { colors } from '@app/constants';
import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';


const Contacts = ({ navigation }) => (
    <SafeAreaView style={[styles.container]}>
        <Header label="The REACH Directory" containerStyle={{ marginBottom: 5 }}/>
        <TextInput label="Search" dense style={{ height: 35 }} />
        <Divider/>
        <View style={{height: 20}}/>
        <BlockButton onPress={() => navigation.navigate('profile')} outlined >Foo</BlockButton>
        <BlockButton onPress={() => navigation.navigate('profile')} outlined >Bar</BlockButton>
    </SafeAreaView>
)

export default Contacts;

const Divider = () => <View style={{ flexDirection: 'row', height: 1, backgroundColor: colors.black, marginTop: 10 }}/>

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginHorizontal: 20,
        // justifyContent: 'space-between',
        marginBottom: 75,
    },
})