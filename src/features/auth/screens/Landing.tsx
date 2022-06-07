import React from 'react';
import { View, Image, StyleSheet, SafeAreaView, Text } from 'react-native';
import { NavigationProp } from '@react-navigation/core';
import { ActionContainer } from '@app/components';
import { BlockButton } from '@app/components';

type Props = {
  navigation: NavigationProp<any>;
};

const Landing = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.banner}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../../assets/logo.png')}
            style={styles.image}
          />
        </View>
        <Text style={styles.text}>
          Welcome to The REACH Portal
        </Text>
      </View>
      <ActionContainer>
        <BlockButton outlined onPress={() => navigation.navigate('login')}>
          Login
        </BlockButton>
        <BlockButton onPress={() => navigation.navigate('register')}>
          Sign Up
        </BlockButton>
      </ActionContainer>
    </SafeAreaView>
  );
};

export default Landing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    marginBottom: 75,
  },
  text: {
    fontSize: 25,
    color: 'black',
    fontWeight: '500',
    paddingTop: 20,
    textAlign: 'center',
  },
  banner: {
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  imageContainer: {
    maxWidth: 200
  }
});
