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
import {addMember, ProgramChat, useProgramChatGroup} from '@app/lib/programchat';

const JoinProgram = ({navigation, route}) => {
  const {signout} = useAuth();
  const {user} = useAuthenticatedUser();
  const {navigate} = useNavigation();
  // const {params} = useRoute();
  // console.log(params);

  const {group} = useProgramChatGroup(route?.params?.id);

  console.log(route?.params?.id)


  return (
    <SafeAreaView style={[styles.container]}>
      <Card mode="outlined" style={{borderRadius: 12}}>
        <Card.Title
          title={group?.name}
          subtitle={`${group?.members?.length} members`}
          // left={LeftContent}
        />
        {/* <Card.Content>
          <Text variant="titleLarge">{data?.name}</Text>
          <Text variant="bodyMedium">Card content</Text>
        </Card.Content> */}
        <Card.Cover source={{uri: group?.pfp}} />
        <Card.Actions>
          <View style={{flex: 1, margin: 5, marginBottom: -5}}>
            <BlockButton outlined onPress={() => addMember(user, group).finally(() => navigation.navigate('Potato'))}> Join </BlockButton>
          </View>
        </Card.Actions>
      </Card>
    </SafeAreaView>
  );
};

export default JoinProgram;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    justifyContent: 'center',
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
});
