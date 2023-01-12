import React, { useEffect, useState, useCallback, useRef, useMemo} from 'react';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
  Alert,
  KeyboardAvoidingView,
  Dimensions,
  TextInput,
  Keyboard,
  TouchableOpacity,
  ImagePropTypes,
  Linking
} from 'react-native';
import {
  BlockButton,
  ActionContainer,
  Header,
  ControlledTextInput,
  ControlledInputProps,
  Divider,
} from '@app/components';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';
import { Camera, CameraType } from 'expo-camera';
import { Message, storage, useAuth, useAuthenticatedUser, UserLoginInput } from '@app/lib';
import { useForm } from 'react-hook-form';
import { GiftedChat, Bubble, Send, IMessage, MessageImageProps } from 'react-native-gifted-chat';
import { useMessageGroup } from '../useMessaging';
import { addDoc } from 'firebase/firestore';
import { Ionicons, FontAwesome5, AntDesign} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import Fuse from 'fuse.js'
import { getDownloadURL, ref, uploadBytes, uploadString } from '@firebase/storage';
import { Video, AVPlaybackStatus } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import { pinMessage, useGroupedPins } from '@app/lib/pinned';


const Messages = ({ route, navigation }) => {
  const { group, messages, sendMessage } = useMessageGroup(route.params.id);
  const {pins} = useGroupedPins(route.params.id);
  const pinids = pins.map(pin => pin.message_id);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState('');
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const { user, loading } = useAuthenticatedUser();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const cameraRef = useRef(null);
  const snapPoints = useMemo(() => [200, 200], []);
  const onSend = useCallback((messages: Message[] = []) => {
    sendMessage(messages[0]);
  }, []);

  const [height, setHeight] = useState(50);
  const [text, setText] = useState('');
  const [people, setPeople] = useState([]);
  const { goBack } = useNavigation();
  const bottomsheetlist = [
    {
      iconname: 'camera-outline',
      text: "Take a photo or video",
      onPress: () => {
        launchCamera();
      }
    },
    {
      iconname: 'image-outline',
      text: "Upload a photo or video",
      onPress: () => {
        pickImage();
      }
    },
    {
      iconname: 'folder-outline',
      text: "Upload a file",
      onPress: () => {
        browseFiles();
      }
    }
  ]
  const options = {
    keys: [
      "username",
      "firstname"
    ]
  }
  const browseFiles = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    bottomSheetRef.current?.close();
    const url = await uploadImage(result.uri, "files/")
    setFile({
      name: result.name,
      file: url
    });
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("RESULT", result);

    if (!result.canceled) {
      bottomSheetRef.current?.close();
      const url = await uploadImage(result.assets[0].uri)
      setImage(url);
    }
  };

  const launchCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      bottomSheetRef.current?.close();
      const url = await uploadImage(result.assets[0].uri)
      setImage(url);
    }
  }
  const uploadImage = async(uri, directory="images/") => {
    console.log(uri[0].uri)
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    const filename = Math.random().toString(36).substring(2, 7)
    const storageRef = ref(storage, directory+filename)
    await uploadBytes(storageRef, blob)
    .then((snapshot) => {
      console.log('Uploaded a blob or file!');
    })
    .catch((error) => {
      console.log(error)
    })

    const url = await getDownloadURL(storageRef)
    // blob.close()
    return url
  }
  const fuse = new Fuse(group?.members, options)


  useEffect(() => {
    const textmatch = text.match(/@(\w+)/)
    if(text.length == 0) {
      setPeople([])
    }
    if (textmatch != null) {
      // console.log(textmatch)
      // console.log(JSON.stringify(group.members, null, 2))
      const result = fuse.search(textmatch[1])
      console.log(result)
      setPeople(result.map(r => r.item))
    }
  }, [text])

  function renderBubble(props) {
    return(
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          // justifyContent: 'space-between',
        }}
      >
      <Bubble 
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: props.currentMessage?.image || props.currentMessage?.file ? 'transparent' : '#2B68E6'
          },
          left: {
            backgroundColor: props.currentMessage?.image || props.currentMessage?.file ? 'transparent' : '#E5E5EA',
          },
          
        }}
      />
      {props.currentMessage?._id && pinids.includes(props.currentMessage._id) && (
        <AntDesign 
          name="pushpin"
          size={20}
          color="#379770"
          style={{
            marginHorizontal: 2,
          }}
        />
      )}
      </View>
    )
  }
  function renderMessageImage(props) {
    return(
      <TouchableOpacity
        onPress={() => {
          // props.imageProps.openImageViewer(props.currentMessage.image)
          // props.imageProps.onPress(props.currentMessage.image)
        }}
        onLongPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
          Alert.alert(
            'Pin this message?',
            "This will show up on everyone's pin in this group chat",
            [
              {
                text: "Yes",
                onPress: () => {
                  pinMessage({
                    chat_id: route.params.id,
                    //@ts-ignore
                    message_id: props.currentMessage._id,
                    text: props.currentMessage?.text,
                    image: props.currentMessage?.image ? props.currentMessage?.image : null,
                    file: props.currentMessage?.file ? props.currentMessage?.file : null,
                    createdAt: props.currentMessage?.createdAt
                  })
                }
              },
              {
                text: "No",
                onPress: () => {

                },
              }
            ]
        )
        }}
      >
        <Image 
          source={{uri: props.currentMessage.image}}
          style={{width: 200, height: 200, borderRadius: 10, margin: 5}}
        />
      </TouchableOpacity>
    )
  }
  function renderCustomView(props) {
    // render files
    return (
      <>
      {props.currentMessage.file &&
        <TouchableOpacity 
          style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, backgroundColor: '#E5E5EA', borderRadius: 10, margin: 5}}
          onPress={() => Linking.openURL(props.currentMessage?.file?.file)}
          onLongPress = {() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
            Alert.alert(
              'Pin this message?',
              "This will show up on everyone's pin in this group chat",
              [
                {
                  text: "Yes",
                  onPress: () => {
                    pinMessage({
                      chat_id: route.params.id,
                      //@ts-ignore
                      message_id: props.currentMessage._id,
                      text: props.currentMessage?.text,
                      image: props.currentMessage?.image ? props.currentMessage?.image : null,
                      file: props.currentMessage?.file ? props.currentMessage?.file : null,
                      createdAt: props.currentMessage?.createdAt
                    })
                  }
                },
                {
                  text: "No",
                  onPress: () => {
  
                  },
                }
              ]
          )
          }}
        >
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons 
              name="document-text" 
              size={24} 
              color="#379770"
            />
            <Text style={{marginLeft: 10}}>{props.currentMessage?.file?.name}</Text>
          </View>
        </TouchableOpacity>
      }
      </>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ marginBottom: 5 }}>
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
            style={{ position: 'relative', top: 3 }}
            onPress={() => goBack()}
          />
          <Header
            label={group?.members?.length > 2 ? group?.name : 'Messages'}
            containerStyle={{ marginBottom: 5, marginLeft: 20 }}
          />
          <Ionicons
              name="file-tray-full"
              size={28}
              color="black"
              style={{ marginLeft: 'auto' }}
              onPress={() =>
                navigation.navigate('Pinned', { id: route?.params?.id })
              }
          />
          {user?.role == 'Admin' && (
            <Ionicons
              name="information-circle-outline"
              size={28}
              color="black"
              style={{ marginLeft: 'auto' }}
              onPress={() =>
                navigation.navigate('GroupInfo', { id: route?.params?.id })
              }
            />
          )}

        </View>
        <Divider />
      </View>
      <GiftedChat
        bottomOffset={80}
        onLongPress={(context, message) => {
          // send id of message to pin conversation along with text and id of chat
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
          Alert.alert(
            'Pin this message?',
            "This will show up on everyone's pin in this group chat",
            [
              {
                text: "Yes",
                onPress: () => {
                  pinMessage({
                    chat_id: route.params.id,
                    //@ts-ignore
                    message_id: message._id,
                    text: message.text,
                    image: message.image ? message.image : null,
                    file: message.file ? message.file : null,
                    createdAt: message.createdAt
                  })
                }
              },
              {
                text: "No",
                onPress: () => {

                },
              }
            ]
        )}}
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
              fontWeight: "800",
              color: 'white',
            },
            onPress: (user) => {
              if(group.members.map(mem => mem.username).includes(user.slice(1))) {
                navigation.navigate('Profile', { username: user.slice(1) })
              }
            },
          }
        ]}
        renderMessageImage={props => renderMessageImage(props)}
        // imageStyle={{
        //   width: 250,
        //   height: 250,
        //   borderRadius: 10,
        // }}
        renderCustomView={props => renderCustomView(props)}
        renderComposer={props => (
          <View
            style={{
              flexDirection: "column",
              width: "100%",
            }}
          >
            {image != '' && (
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 20,
                  marginTop: 20
                }}
              >
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
                  backgroundColor: "#f2f2f2",
                  alignItems: 'center',
                  height: 50,
                  width: 120,
                  borderRadius: 10,
                }}
              >
                <Ionicons 
                  name="document-attach"
                  size={25}
                  color="#379770"
                  style={{
                    marginHorizontal: 5,
                  }}
                />
                <Text>
                  {file?.name}
                </Text>
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
                  }}
                >
                  <Ionicons 
                    name='add-outline'
                    size={30}
                    color='#379770'
                  />
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
                    const messages = JSON.parse(JSON.stringify(props.messages))
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
                    })
                    onSend(messages) // send the message
                    props.onTextChanged('') // clear the input
                    setFile(null)
                    setImage('')
                  
                  }}
                  >
                  <Ionicons name="send" size={24} color="#379770" />
                </TouchableOpacity>
            </View>
          </View>
        )}
        renderAccessory={() => (
          (people.length > 0) && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
                top: 20,
                left: 5,
              }}
            >
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
                  }}
                  
                >
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    @{person.username}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )
        )}
      />
      <KeyboardAvoidingView behavior='height'/>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        bottomInset={20}
        index={-1}
        handleComponent={null}
        detached={true}
        enablePanDownToClose
        backdropComponent={BottomSheetBackdrop}
        style={styles.sheetContainer}
      >
        <View style={styles.contentContainer}>
          {bottomsheetlist.map((item) => (
            <>
            {/* Make a divider */}
              <TouchableOpacity
                onPress={item.onPress}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Ionicons 
                  name={item.iconname}
                  size={30}
                  color='#379770'
                />
                <Text 
                  style={{ 
                    fontSize: 15, 
                    marginLeft: 10 
                  }}
                >
                  {item.text}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  height: 1,
                  width: "100%",
                  backgroundColor: "#e0e0e0",
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

export default Messages;

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
    // alignItems: "center",
    // backgroundColor: "blue"
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