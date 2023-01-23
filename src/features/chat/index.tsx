import {pinMessage} from '@app/lib/pinned';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import React from 'react';
import {
  SafeAreaView,
  Alert,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {Ionicons, FontAwesome5, AntDesign} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

const Chat = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1}}>
      <Ionicons
        name="file-tray-full"
        size={28}
        color="black"
        style={{marginLeft: 'auto'}}
        onPress={() => navigation.navigate('Pinned', {id: route?.params?.id})}
      />
      <GiftedChat
        bottomOffset={80}
        onLongPress={(context, message) => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          Alert.alert(
            'Pin this message?',
            "This will show up on everyone's pin in this group chat",
            [
              {
                text: 'Yes',
                onPress: () => {
                  pinMessage({
                    chat_id: route.params.id,
                    //@ts-ignore
                    message_id: message._id,
                    text: message.text,
                    image: message.image ? message.image : null,
                    file: message.file ? message.file : null,
                    createdAt: message.createdAt,
                  });
                },
              },
              {
                text: 'No',
                onPress: () => {},
              },
            ],
          );
        }}
        messages={messages.sort((a, b) => b.createdAt - a.createdAt)}
        renderBubble={props => renderBubble(props)}
        onSend={messages => onSend(messages)}
        user={{
          _id: user?.uid,
          name: `${user?.firstname} ${user?.lastname}`,
        }}
        onInputTextChanged={text => setText(text)}
        parsePatterns={linkStyle => [
          {
            // match all strings starting with @
            pattern: /@(\w+)/,
            style: {
              fontWeight: '800',
              color: 'white',
            },
            onPress: user => {
              if (
                group.members.map(mem => mem.username).includes(user.slice(1))
              ) {
                // find user in group members
                const member = group.members.find(
                  mem => mem.username == user.slice(1),
                );
                navigation.navigate('MemberInfo', {user: member});
              } else {
                Alert.alert('User not found', 'This user is not in this group');
              }
            },
          },
        ]}
        renderMessageImage={props => renderMessageImage(props)}
        renderCustomView={props => renderCustomView(props)}
        renderComposer={props => (
          <View
            style={{
              flexDirection: 'column',
              width: '100%',
            }}>
            {image != '' && (
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 20,
                  marginTop: 20,
                }}>
                <Image
                  source={{uri: image}}
                  style={{
                    width: 200,
                    height: 150,
                    borderRadius: 10,
                  }}
                />
              </View>
            )}
            {file != null && (
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 10,
                  marginTop: 20,
                  backgroundColor: '#f2f2f2',
                  alignItems: 'center',
                  height: 50,
                  width: 120,
                  borderRadius: 10,
                }}>
                <Ionicons
                  name="document-attach"
                  size={25}
                  color="#379770"
                  style={{
                    marginHorizontal: 5,
                  }}
                />
                <Text>{file?.name}</Text>
              </View>
            )}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#f2f2f2',
                borderRadius: 10,
                top: 15,
                paddingHorizontal: 10,
                paddingVertical: 5,
                marginHorizontal: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  bottomSheetRef.current?.expand();
                }}>
                <Ionicons name="add-outline" size={30} color="#379770" />
              </TouchableOpacity>
              <TextInput
                style={{
                  flex: 1,
                  minHeight: 30,
                  height: height < 100 ? height : 100,
                  fontSize: 16,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
                placeholder="Type a message"
                multiline
                value={props.text}
                onChangeText={props.onTextChanged}
                onContentSizeChange={e =>
                  setHeight(e.nativeEvent.contentSize.height)
                }
              />
              <TouchableOpacity
                style={{
                  backgroundColor: '#f2f2f2',
                  borderRadius: 20,
                  paddingHorizontal: 5,
                  paddingVertical: 5,
                }}
                onPress={() => {
                  const messages = JSON.parse(JSON.stringify(props.messages));
                  messages.unshift({
                    // generate a random id
                    _id: Math.random().toString(36).substring(2, 9),
                    text: props.text,
                    image: image === '' ? null : image,
                    file: file === null ? null : file,
                    createdAt: new Date(),
                    user: {
                      _id: user?.uid,
                      name: `${user?.firstname} ${user?.lastname}`,
                    },
                  });
                  onSend(messages); // send the message
                  props.onTextChanged(''); // clear the input
                  setFile(null);
                  setImage('');
                }}>
                <Ionicons name="send" size={24} color="#379770" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        renderAccessory={() =>
          people.length > 0 && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
                top: 20,
                left: 5,
              }}>
              {people.map(person => (
                <TouchableOpacity
                  style={{
                    backgroundColor: '#379770',
                    borderRadius: 10,
                    minWidth: 60,
                    minHeight: 40,
                    margin: 5,
                    paddingHorizontal: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    @{person.username}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )
        }
      />
      <KeyboardAvoidingView behavior="height" />
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        bottomInset={20}
        index={-1}
        handleComponent={null}
        detached={true}
        enablePanDownToClose
        backdropComponent={BottomSheetBackdrop}
        style={styles.sheetContainer}>
        <View style={styles.contentContainer}>
          {bottomsheetlist.map(item => (
            <>
              <TouchableOpacity
                onPress={item.onPress}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <Ionicons name={item.iconname} size={30} color="#379770" />
                <Text
                  style={{
                    fontSize: 15,
                    marginLeft: 10,
                  }}>
                  {item.text}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  height: 1,
                  width: '100%',
                  backgroundColor: '#e0e0e0',
                  marginVertical: 10,
                }}
              />
            </>
          ))}
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
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
  sheetContainer: {
    // add horizontal space
    marginHorizontal: 14,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
});
