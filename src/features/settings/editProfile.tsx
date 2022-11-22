import React, { useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { BlockButton, ActionContainer, Header, ControlledTextInput, ControlledInputProps } from '@app/components';
import { NavigationProp } from '@react-navigation/native';
import { useForm,useFieldArray} from 'react-hook-form';
import { editUserProfile, updateUser, useAuth, useAuthenticatedUser, UserAccountCreateInput } from '@app/lib';



// wrap controlled input to add type safety (name field must match valid key)
const RegisterTextInput = (props: ControlledInputProps<UserAccountCreateInput>) => (
  <ControlledTextInput {...props} />
);

type Props = {
  navigation: NavigationProp<any>;
};

const EditProfile = ({ navigation }: Props) => {
  const { signup } = useAuth();
  
  const {user} = useAuthenticatedUser();
  const {
    control,
    handleSubmit,
    setValue

  } = useForm<UserAccountCreateInput>({defaultValues: {
    firstname: user?.firstname,
    lastname: user?.lastname,
    email: user?.email,
    username: user?.username,
    title: user?.title,

  }});
  

//   const { update } = useFieldArray({ name: 'array' });
                            
// unmount fields and remount with updated value


// will directly update input value
                            
  // unmount fields and remount with updated value
  useEffect(() => {
    // unmount fields and remount with updated valu
    setValue('firstname', user?.firstname);
    setValue('lastname', user?.lastname);
    setValue('email', user?.email);
    setValue('username', user?.username);
    setValue('title', user?.title);
    
 }, [user?.firstname, user?.lastname, user?.email, user?.username, setValue]);
  
  



  const onSubmit = (data: UserAccountCreateInput) => {
    console.log({data});
    if (!data.title)
        delete data['title'];
    editUserProfile(user.uid,data).catch(err => Alert.alert(err.message));
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header label="Edit Profile" />
        <RegisterTextInput name="firstname" control={control} label="First Name" textContentType="givenName" />
        <RegisterTextInput name="lastname" control={control} label="Last Name" textContentType="familyName" />
        <Spacer />
        <RegisterTextInput name="username" control={control} label="Username" />
      </View>
      <ActionContainer>
        <BlockButton onPress={handleSubmit(onSubmit)}>
          Save
        </BlockButton>
      </ActionContainer>
    </SafeAreaView>
  );
};

const Spacer = () => <View style={{ height: 30 }} />;

export default EditProfile;

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
