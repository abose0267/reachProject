import React, { ComponentProps } from 'react';
import { View, Image, StyleSheet, SafeAreaView, Text } from 'react-native';
import BlockButton from '@app/components/BlockButton';
import { ActionContainer } from '@app/components';

const data = {
  name: 'Jerry Mathews',
  handle: '@jerrymathews',
  profileImage: 'https://tinyurl.com/ypp7rvs6',
};

const Contacts = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageContainer>
        <Image source={{ uri: data.profileImage }} style={styles.image} />
        <Text style={styles.nameText}>{data.name}</Text>
        <Text style={styles.handleText}>{data.handle}</Text>
      </ImageContainer>
      <ActionContainer>
        <BlockButton style={styles.button} outlined>
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
