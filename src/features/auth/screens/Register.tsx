import React from 'react';
import { View, Image, StyleSheet, SafeAreaView, Text } from 'react-native';
import { BlockButton, TextInput, ActionContainer, Header } from '@app/components';
import { NavigationProp } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import { useAuth, UserAccountCreateInput } from '@app/lib';

type Props = {
  navigation: NavigationProp<any>;
};

const Landing = ({ navigation }: Props) => {
  const { user, signup } = useAuth();
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAccountCreateInput>({});

  const onSubmit = (data: UserAccountCreateInput) => signup(data);

  // interface ControlledInputProps {
  //   label: string;
  //   name: keyof UserAccountCreateInput;
  // }

  // const ControlledInput = ({ name, label }: ControlledInputProps) => (
  //   <Controllear
  //     control={control}
  //     rules={{ required: true }}
  //     render={({ field: { onChange, onBlur, value } }) => (
  //       <TextInput
  //         label={label}
  //         // onBlur={onBlur}
  //         onChangeText={onChange}
  //         value={value}
  //       />
  //     )}
  //     name={name}
  //   />
  // );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header label="Sign Up" />
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="First Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="firstname"
        />
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Last Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="lastname"
        />
        <Spacer />
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
        <Spacer />
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Username"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="username"
        />
      </View>
      <ActionContainer>
        <BlockButton onPress={handleSubmit(onSubmit)}>
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
    maxWidth: 200,
  },
});
