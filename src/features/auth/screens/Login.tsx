import React from 'react';
import { View, Image, StyleSheet, SafeAreaView, Text, Alert } from 'react-native';
import { BlockButton, TextInput, ActionContainer, Header, ControlledTextInput, ControlledInputProps } from '@app/components';
import { useAuth, UserLoginInput } from '@app/lib';
import { useForm } from 'react-hook-form';

// wrap controlled input to add type safety (name field must match valid key)
const LoginTextInput = (props: ControlledInputProps<UserLoginInput>) => (
  <ControlledTextInput {...props} />
);

const Login = ({ navigation }) => {
  const { signin } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginInput>({});

  const onSubmit = (data: UserLoginInput) => signin(data).catch(err => Alert.alert(err.message));

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header label="Login" />
        <LoginTextInput name="email" control={control} label="Email" textContentType="emailAddress"/>
        <LoginTextInput name="password" control={control} label="Password" textContentType="password" secureTextEntry/>
      </View>
      <ActionContainer>
        <BlockButton onPress={handleSubmit(onSubmit)}>
          Login
        </BlockButton>
      </ActionContainer>
    </SafeAreaView>
  );
};

export default Login;

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
