import React from 'react';
import { View, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { BlockButton, ActionContainer, Header, ControlledTextInput, ControlledInputProps } from '@app/components';
import { NavigationProp } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { useAuth, UserAccountCreateInput } from '@app/lib';


// wrap controlled input to add type safety (name field must match valid key)
const RegisterTextInput = (props: ControlledInputProps<UserAccountCreateInput>) => (
  <ControlledTextInput {...props} />
);

type Props = {
  navigation: NavigationProp<any>;
};

const Register = ({ navigation }: Props) => {
  const { signup } = useAuth();
  const {
    control,
    handleSubmit,
  } = useForm<UserAccountCreateInput>({});

  const onSubmit = (data: UserAccountCreateInput) => signup(data).catch(err => Alert.alert(err.message));

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header label="Sign Up" />
        <RegisterTextInput name="firstname" control={control} label="First Name" textContentType="givenName" />
        <RegisterTextInput name="lastname" control={control} label="Last Name" textContentType="familyName" />
        <Spacer />
        <RegisterTextInput name="email" control={control} label="Email" textContentType="emailAddress" keyboardType="email-address" />
        <RegisterTextInput name="password" control={control} label="Password" textContentType="password" secureTextEntry={true} />
        <Spacer />
        <RegisterTextInput name="username" control={control} label="Username" />
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

export default Register;

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
