import React, {ComponentProps} from 'react';
import {
  BlockButton,
  ContactCard,
  Header,
  TextInput,
  UserProfileView,
} from '@app/components';
import {colors} from '@app/constants';
import {useAuth} from '@app/lib';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
  Linking,
  Alert,
  Dimensions,
} from 'react-native';
import {useAuthenticatedUser, UserProfile} from '@app/lib';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Button, Card} from 'react-native-paper';
import {useCollection, useDoc} from '@app/lib/useFirebase';
import {ProgramChat} from '@app/lib/programchat';

const JoinProgram = ({navigation}) => {
  const {signout} = useAuth();
  const {user} = useAuthenticatedUser();
  const {navigate} = useNavigation();
  const {params} = useRoute();
  console.log(params);

  

  const {data} = useDoc<ProgramChat>(`programs/${params.id}`);
  return (
    <SafeAreaView style={[styles.container]}>
      <Card mode="outlined">
        <Card.Title
          title={data?.name}
          subtitle="5 Members"
          // left={LeftContent}
        />
        {/* <Card.Content>
          <Text variant="titleLarge">{data?.name}</Text>
          <Text variant="bodyMedium">Card content</Text>
        </Card.Content> */}
        <Card.Cover source={{uri: data?.pfp}} />
        <Card.Actions>
          <View style={{flex: 1, margin: 5, marginBottom: -5,}}>
            <BlockButton outlined> Join</BlockButton>
          </View>
        </Card.Actions>
      </Card>
    </SafeAreaView>
  );
};

export default JoinProgram;

const ImageContainer = ({children}: ComponentProps<typeof View>) => (
  <View style={styles.imageContainer}>{children}</View>
);
const Divider = () => (
  <View
    style={{
      flexDirection: 'row',
      height: 1,
      backgroundColor: colors.grey,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 1,
      shadowRadius: 1,
      marginTop: 10,
      marginHorizontal: 20,
    }}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingHorizontal: 20,
    marginHorizontal: 20,
    marginTop: 20,
    // marginBottom: 20,
    // padding: 75,
    // flexDirection: 'column-reverse',
  },
  padding: {
    paddingHorizontal: 20,
  },
  imageContainer: {
    alignItems: 'center',
    flex: 1,
    marginTop: 30,
  },
  actionContainer: {},
  // nameText: ,
});
