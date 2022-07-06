import React from 'react';
import { View, SafeAreaView, StyleSheet, FlatList } from 'react-native';
import { BlockButton, ContactCard, Header, TextInput } from '@app/components';
import { colors } from '@app/constants';
import { useAuth, UserProfile } from '@app/lib';
import { useCollection } from '@app/lib/useFirebase';

const Contacts = ({ navigation }) => {
  const { signout } = useAuth();
  const { data: users } = useCollection<UserProfile>('users');

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={[styles.padding]}>
        <Header label="The REACH Directory" containerStyle={{ marginBottom: 5 }} />
        <TextInput label="Search" dense style={{ height: 35 }} disabled />
      </View>
      <Divider />
      <View style={[styles.padding]}>
      <FlatList
          data={users}
          renderItem={({ item }) => (
            <ContactCard
              data={item}
              onPress={() => navigation.navigate('profile', item)}
            />
          )}
      /> 
      </View>
    </SafeAreaView>
  );
};

export default Contacts;

const Divider = () => (
  <View
    style={{
      flexDirection: 'row',
      height: 1,
      backgroundColor: colors.grey,
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 1,
      shadowRadius: 1,
      marginTop: 10,
    }}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // marginHorizontal: 20,
    marginBottom: 75,
  },
  padding: {
    paddingHorizontal: 20,
  }
});
