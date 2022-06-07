import React from 'react';
import { View, Image, StyleSheet, SafeAreaView, Text } from 'react-native';
import { BlockButton, TextInput, ActionContainer, Header  } from '@app/components';
import { NavigationProp } from '@react-navigation/native';

type Props = {
  navigation: NavigationProp<any>;
};

const Landing = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header label="Sign Up"/>
        <TextInput label="First Name" />
        <TextInput label="Last Name" />
        <Spacer/>
        <TextInput label="Email" />
        <TextInput label="Password" />
        <Spacer/>
        <TextInput label="Username" />
      </View>
      <ActionContainer>
        <BlockButton onPress={() => navigation.navigate('directory')}>
          Register
        </BlockButton>
      </ActionContainer>
    </SafeAreaView>
  );
};

const Spacer = () => <View style={{ height: 30 }} />;

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
