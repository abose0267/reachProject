import React, {ComponentProps} from 'react';
import {
  BlockButton,
  ContactCard,
  Header,
  TextInput,
  UserProfileView,
} from '@app/components';
import {colors} from '@app/constants';
import {useAuth} from '@app/lib';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
  Linking,
  Alert,
  Dimensions,
} from 'react-native';
import {ActionContainer} from '@app/components';
import {Avatar} from 'react-native-paper';
import {useAuthenticatedUser, UserProfile} from '@app/lib';

import {Ionicons} from '@expo/vector-icons';
const Settings = ({navigation}) => {
  const {signout} = useAuth();
  const {user} = useAuthenticatedUser();
  return (
    <SafeAreaView style={[styles.container]}>
      {/* <View style={{zIndex: 100, marginBottom: 10}}>
        <View
          style={{
            marginHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Header label="Profile" containerStyle={{marginBottom: 5}} />
        </View>
      </View> */}
      <UserProfileView user={user} />
      <View style={{flex: 1, marginBottom: 10, justifyContent: 'flex-end'}}>
        <BlockButton
          onPress={() => navigation.navigate('editProfile')}
          outlined
          style={{marginTop: 80, marginHorizontal: 20}}>
          Edit Profile
        </BlockButton>
        <BlockButton
          onPress={() => signout()}
          outlined
          style={{borderColor: 'red', marginHorizontal: 20, marginTop: 10}}
          textStyle={{color: 'red'}}>
          Log Out
        </BlockButton>
      </View>

      {/* <BlockButton onPress={() => {navigation.navigate()} } outlined style={{borderColor: "black",marginHorizontal:20}} textStyle={{color: "black"}}>Edit Profile</BlockButton> */}
    </SafeAreaView>
  );
};

export default Settings;

const ImageContainer = ({children}: ComponentProps<typeof View>) => (
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
        height: 1,
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
    // marginBottom: 20,
    // padding: 75,
    // flexDirection: 'column-reverse',
  },
  padding: {
    paddingHorizontal: 20,
  },
  imageContainer: {
    alignItems: 'center',
    flex: 1,
    marginTop: 30,
  },
  actionContainer: {},
  // nameText: ,
});
