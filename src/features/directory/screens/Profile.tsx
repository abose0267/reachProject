import React, { ComponentProps } from 'react';
import { View, Image, StyleSheet, SafeAreaView, Text, Linking, Alert } from 'react-native';
import BlockButton from '@app/components/BlockButton';
import { ActionContainer } from '@app/components';
import { Avatar } from 'react-native-paper';
import { useAuthenticatedUser, UserProfile } from '@app/lib';
import { getMessageGroup } from '@app/features/messages/useMessaging';

const Contacts = ({ route,navigation }) => {
  const params = route.params as UserProfile;
  const { firstname, lastname, email, uid, username} = params;
  const initials = firstname[0] + lastname[0]; 
  const { user } = useAuthenticatedUser();
  
  return (
    <SafeAreaView style={styles.container}>
      <ImageContainer>
        <Avatar.Text label={initials} size={200} />
        <Text style={styles.nameText}>{`${firstname} ${lastname}`}</Text>
        <Text style={styles.handleText}>{`@${username}`}</Text>
      </ImageContainer>
      <ActionContainer>
        <BlockButton 
          style={styles.button} 
          outlined
          onPress={() => Linking.openURL(`mailto:${email}`).catch(console.error)}
        >
          Email
        </BlockButton>
        <BlockButton 
          onPress={() => 
            getMessageGroup([{ uid: user.uid as string }, { uid }])
            .then(id => navigation.navigate('messages', { id }))
            .catch(err => console.error(err))
          } 
          style={styles.button}
        >
            Message
        </BlockButton>
      </ActionContainer>
    </SafeAreaView>
  );
};

const ImageContainer = ({ children }: ComponentProps<typeof View>) => (
  <View style={styles.imageContainer}>{children}</View>
);


export default Contacts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 75,
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 10,
  },
  image: {
    width: 250,
    aspectRatio: 1,
    borderRadius: 150,
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
