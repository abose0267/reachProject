import React, {ComponentProps, useCallback, useMemo, useRef} from 'react';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
  Linking,
  Alert,
} from 'react-native';
import BlockButton from '@app/components/BlockButton';
import {ActionContainer, Divider, Header} from '@app/components';
import {Avatar} from 'react-native-paper';
import {useAuthenticatedUser, UserProfile} from '@app/lib';
import {getMessageGroup} from '@app/features/messages/useMessaging';
import {useNavigation} from '@react-navigation/native';
import {Ionicons, FontAwesome5} from '@expo/vector-icons';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';

const Contacts = ({route, navigation}) => {
  const params = route.params as UserProfile;
  const {firstname, lastname, email, uid, username} = params;
  const initials = firstname[0] + lastname[0];
  const {user} = useAuthenticatedUser();

  const {goBack} = useNavigation();

  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => [180], []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginBottom: 5}}>
        <View
          style={{
            marginHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Ionicons
            name="arrow-back"
            size={28}
            color="black"
            style={{position: 'relative', top: 3}}
            onPress={() => goBack()}
          />
          <Header
            label="Profile"
            containerStyle={{marginBottom: 5, marginLeft: 20}}
          />
          {user?.role == 'Admin' && (
            <FontAwesome5
              name="user-cog"
              size={22}
              color="black"
              style={{marginLeft: 'auto'}}
              onPress={() => bottomSheetRef.current.expand()}
            />
          )}
        </View>
        <Divider />
      </View>
      <ImageContainer>
        <Avatar.Text label={initials} size={200} />
        <Text style={styles.nameText}>{`${firstname} ${lastname}`}</Text>
        <Text style={styles.handleText}>{`@${username}`}</Text>
      </ImageContainer>
      <View style={{paddingHorizontal: 20, paddingBottom: 20}}>
        <BlockButton
          style={styles.button}
          outlined
          onPress={() =>
            Linking.openURL(`mailto:${email}`).catch(console.error)
          }>
          Email
        </BlockButton>
        <BlockButton
          onPress={() =>
            getMessageGroup([{uid: user.uid as string}, {uid}])
              .then(id => navigation.navigate('messages', {id}))
              .catch(err => console.error(err))
          }
          style={styles.button}>
          Message
        </BlockButton>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        style={{zIndex: 100}}
        enablePanDownToClose
        backdropComponent={props => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
          />
        )}
        snapPoints={snapPoints}>
        <View style={{paddingHorizontal: 20, paddingBottom: 20}}>
          <BlockButton
            style={styles.button}
            outlined
            onPress={() =>
              Linking.openURL(`mailto:${email}`).catch(console.error)
            }>
            Make Admin
          </BlockButton>
          <BlockButton
            disabled
            // outlined
            style={{backgroundColor: "red", borderColor: "red", marginTop: 10}} 
            textStyle={{color: "#fff"}}
          >
            Remove User
          </BlockButton>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

const ImageContainer = ({children}: ComponentProps<typeof View>) => (
  <View style={styles.imageContainer}>{children}</View>
);

export default Contacts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginTop: 10,
  },
  image: {
    width: 250,
    aspectRatio: 1,
    borderRadius: 150,
  },
  imageContainer: {
    alignItems: 'center',
    flex: 1,
    marginTop: 40,
  },
  actionContainer: {},
  nameText: {
    fontSize: 25,
    fontWeight: '500',
    marginTop: 20,
  },
  handleText: {
    fontSize: 17,
    fontWeight: '400',
    marginTop: 5,
  },
});
