import React from 'react';
import { View, Image, StyleSheet, SafeAreaView, Text } from 'react-native';
import { BlockButton, TextInput, ActionContainer, Header  } from '@app/components';

const Landing = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header label="Login"/>
        <TextInput label="Username" />
        <TextInput label="Password" />
      </View>
      <ActionContainer>
        <BlockButton onPress={() => navigation.navigate('directory')}>
          Login
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
