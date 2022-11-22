import React, {ComponentProps} from 'react';
import { BlockButton, ContactCard, Header, TextInput } from '@app/components';
import { colors } from '@app/constants';
import { useAuth } from '@app/lib';
import { View, Image, StyleSheet, SafeAreaView, Text, Linking, Alert } from 'react-native';
import { ActionContainer } from '@app/components';
import { Avatar } from 'react-native-paper';
import { useAuthenticatedUser, UserProfile } from '@app/lib';

import { Ionicons } from '@expo/vector-icons';
const Settings = ({ navigation }) => {
  const { signout } = useAuth();
  const { user } = useAuthenticatedUser();
  return (
    <SafeAreaView style={[styles.container]}>
          <View style={{zIndex: 100, marginBottom: 5}}>
        <View
          style={{
            marginHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
       
          <Header
            label="Profile"
            containerStyle={{marginBottom: 5}}
          />
        </View>
     
      </View>
      <ImageContainer style={{marginTop:200}}>
        <Avatar.Text label={`${user?.firstname[0] + user?.lastname[0]}`} size={200} />
        <Text style={styles.nameText}>{`${user?.firstname} ${user?.lastname}`}</Text>
        <Text style={styles.nameText}>{  user?.title != null?`${user?.title}`: ""}</Text>
        <Text style={styles.handleText}>{`@${user?.username}`}</Text>
        
      </ImageContainer>
      <BlockButton onPress={() => navigation.navigate("editProfile")} outlined style={{ marginTop: 20 }}>Edit Profile</BlockButton>
      <BlockButton onPress={() => signout()} outlined style={{borderColor: "red",marginHorizontal:20}} textStyle={{color: "red"}}>Log Out</BlockButton>
      {/* <BlockButton onPress={() => {navigation.navigate()} } outlined style={{borderColor: "black",marginHorizontal:20}} textStyle={{color: "black"}}>Edit Profile</BlockButton> */}
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
    // marginHorizontal: 20,
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
    marginTop:30
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
