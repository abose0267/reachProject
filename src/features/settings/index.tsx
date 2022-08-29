import React, {ComponentProps} from 'react';
import { BlockButton, ContactCard, Header, TextInput } from '@app/components';
import { colors } from '@app/constants';
import { useAuth } from '@app/lib';
import { View, Image, StyleSheet, SafeAreaView, Text, Linking, Alert } from 'react-native';
import { ActionContainer } from '@app/components';
import { Avatar } from 'react-native-paper';
import { useAuthenticatedUser, UserProfile } from '@app/lib';
const Settings = ({ navigation }) => {
  const { signout } = useAuth();
  const { user } = useAuthenticatedUser();
  return (
    <SafeAreaView style={[styles.container]}>
      <ImageContainer>
        <Avatar.Text label={`${user?.firstname[0] + user?.lastname[0]}`} size={200} />
        <Text style={styles.nameText}>{`${user?.firstname} ${user?.lastname}`}</Text>
        <Text style={styles.handleText}>{`@${user?.username}`}</Text>
      </ImageContainer>
      {/* <BlockButton onPress={() => signout()} outlined style={{ marginTop: 20 }}>Edit Profile</BlockButton> */}
      <BlockButton onPress={() => signout()} outlined style={{borderColor: "red"}} textStyle={{color: "red"}}>Log Out</BlockButton>
    </SafeAreaView>
  );
};

export default Settings;
const ImageContainer = ({ children }: ComponentProps<typeof View>) => (
  <View style={styles.imageContainer}>{children}</View>
);
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
  },
  imageContainer: {
    alignItems: 'center',
    flex: 1,
  },
  actionContainer: {},
  nameText: {
    fontSize: 25,
    fontWeight: '500',
    marginTop: 20,
  },
  handleText: {
    fontSize: 17,
    fontWeight: '400',
    marginTop: 5,
  },
});
