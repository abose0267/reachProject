import {ContactCard, Header, UserProfileView} from '@app/components';
import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useMessageGroup} from '../useMessaging';

const MemberInfo = ({route, navigation}) => {
    return(
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    marginTop: 20,
                }}
            >
                <UserProfileView 
                    user={route.params.user}
                />
            </View>
        </SafeAreaView>
    )
}

export default MemberInfo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
})