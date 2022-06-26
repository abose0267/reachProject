import React, { ComponentProps } from 'react';
import { View, Image, StyleSheet, SafeAreaView, Text, Linking } from 'react-native';
import BlockButton from '@app/components/BlockButton';
import { ActionContainer } from '@app/components';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-paper';

const data = {
  name: 'Jerry Mathews',
  handle: '@jerrymathews',
  profileImage: 'https://tinyurl.com/ypp7rvs6',
};

const Contacts = ({ route }) => {
  const { firstname, lastname } = route.params
  return (
    <SafeAreaView style={styles.container}>
      <ImageContainer>
        {/* <Image source={{ uri: data.profileImage }} style={styles.image} /> */}
        <Avatar.Text label={firstname[0]+lastname[0]} size={200} />
        <Text style={styles.nameText}>{`${firstname} ${lastname}`}</Text>
        <Text style={styles.handleText}>{`@${firstname}${lastname[0]}`}</Text>
      </ImageContainer>
      <ActionContainer>
        <BlockButton style={styles.button} outlined
          onPress={() => Linking.openURL('mailto:kirthivel@gmail.com') }>
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
