import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { BlockButton, ContactCard, Header, TextInput } from '@app/components';
import { colors } from '@app/constants';
import { useAuth } from '@app/lib';

const Settings = ({ navigation }) => {
  const { signout } = useAuth();
  return (
    <SafeAreaView style={[styles.container]}>
      <BlockButton onPress={() => signout()} outlined style={{ marginTop: 20 }}>Edit Profile</BlockButton>
      <BlockButton onPress={() => signout()} outlined >Log Out</BlockButton>
    </SafeAreaView>
  );
};

export default Settings;

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
      marginHorizontal: 20,
    }}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    // padding: 75,
    // flexDirection: 'column-reverse',

  },
  padding: {
    paddingHorizontal: 20,
  }
});
