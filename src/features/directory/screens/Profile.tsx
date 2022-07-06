import React, { ComponentProps } from 'react';
import { View, Image, StyleSheet, SafeAreaView, Text, Linking } from 'react-native';
import BlockButton from '@app/components/BlockButton';
import { ActionContainer } from '@app/components';
import { Avatar } from 'react-native-paper';
import { UserProfile } from '@app/lib';

const Contacts = ({ route }) => {
  const params = route.params as UserProfile;
  const { firstname, lastname, email } = params;
  const initials = firstname[0] + lastname[0]; 
  return (
    <SafeAreaView style={styles.container}>
      <ImageContainer>
        <Avatar.Text label={initials} size={200} />
        <Text style={styles.nameText}>{`${firstname} ${lastname}`}</Text>
        <Text style={styles.handleText}>{`@${firstname}${lastname[0]}`}</Text>
      </ImageContainer>
      <ActionContainer>
        <BlockButton 
          style={styles.button} 
          outlined
          onPress={() => Linking.openURL(`mailto:${email}`).catch(console.error)}
        >
          Email
        </BlockButton>
        <BlockButton style={styles.button}>Message</BlockButton>
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
