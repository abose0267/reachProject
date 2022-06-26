import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { BlockButton, ContactCard, Header, TextInput } from '@app/components';
import { colors } from '@app/constants';
import { useAuth } from '@app/lib';

const Contacts = ({ navigation }) => {
  const { signout } = useAuth();
  return (
    <SafeAreaView style={[styles.container]}>
      <View style={[styles.padding]}>
        <Header label="The REACH Directory" containerStyle={{ marginBottom: 5 }} />
        <TextInput label="Search" dense style={{ height: 35 }} disabled />
      </View>
      <Divider />
      <View style={[styles.padding]}>
        <ContactCard
          data={{
            firstname: 'John',
            lastname: 'Doe',
          }}
          onPress={() => navigation.navigate('profile', {
            firstname: 'John',
            lastname: 'Doe',
          })}
        />
        <ContactCard
          data={{
            firstname: 'Bob',
            lastname: 'Smith',
          }}
          onPress={() => navigation.navigate('profile', {
            firstname: 'Bob',
            lastname: 'Smith',
          })}
        />
        <ContactCard
          data={{
            firstname: 'Arvind',
            lastname: 'Balaji',
          }}
          onPress={() => navigation.navigate('profile', {
            firstname: 'Bob',
            lastname: 'Smith',
          })}
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
