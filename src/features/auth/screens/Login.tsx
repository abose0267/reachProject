import React from 'react';
import { View, Image, StyleSheet, SafeAreaView, Text } from 'react-native';
import { BlockButton, TextInput, ActionContainer, Header } from '@app/components';
import { useAuth, UserAccountCreateInput, UserLoginInput } from '@app/lib';
import { Controller, useForm } from 'react-hook-form';

const Login = ({ navigation }) => {
  const { user, signin } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginInput>({});

  const onSubmit = (data: UserLoginInput) => signin(data);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header label="Login" />
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
        />
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="password"
        />
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
