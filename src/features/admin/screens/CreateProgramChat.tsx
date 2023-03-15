import { BlockButton, ControlledTextInput, Header,ControlledInputProps} from '@app/components';
import BigButton from '@app/components/BigButton';
import { storage, useAuthenticatedUser } from '@app/lib';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, SafeAreaView, StyleSheet, SectionList, Text, FlatList, TouchableOpacity, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, Alert, Image, KeyboardAvoidingView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { getMessageGroup } from '@app/features/messages/useMessaging';
import QRCode from 'react-native-qrcode-svg';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import * as MediaLibrary from 'expo-media-library';
import { addMember, createProgramChat } from '@app/lib/programchat';
import { captureRef } from 'react-native-view-shot';

const CreateProgramChat = ({ navigation, route }) => {
    const [pfp, setPfp] = useState("");
    const [name, setName] = useState("");
    const [link, setLink] = useState("www.google.com");
    const bottomSheetRef = useRef<BottomSheet>(null);
    const svgRef = useRef(null);
    
    const snapPoints = useMemo(() => [350, 350], []);
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
          const url = await uploadImage(result.assets[0].uri)
          setPfp(url);
        }
      };
      const uploadImage = async(uri: string, directory="images/") => {
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
      const {user} = useAuthenticatedUser();

      const [status, requestPermission] = MediaLibrary.usePermissions();
      const camerashot = async() => {
        try {
            const localUri = await captureRef(svgRef, {
                height: 440,
                quality: 1,
            });
        
            await MediaLibrary.saveToLibraryAsync(localUri);
            if (localUri) {
                Alert.alert("Success", "QR Code saved to gallery")
            }
            return localUri;
        } catch (e) {
            console.log(e);
        }  
      }
      const screenshot = async() => {
        console.log("SCREENSHOT", status)
        if (status.status === "undetermined") {
            requestPermission().then(async (res) => {
                console.log("RES", res)
                if (res.status === "granted") {
                    await camerashot(); 
                }
            })
        } else if (status.status === "denied") {
            alert("Please grant permission to save to gallery")
            requestPermission();
        } else if (status.status === "granted") {
            await camerashot();
        }
      }
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={{
                    marginTop: 20,
                }}
                onPress={pickImage}
            >
                {pfp == "" &&
                    <Ionicons
                        name="images-outline"
                        size={70}
                        color="lightgray"
                        style={{
                            position: "absolute",
                            top: 110,
                            right: 135,
                            zIndex: 1,
                        }}
                    />
                }
                <Image 
                    source={{uri: pfp == "" ? null : pfp}}
                    style={{
                        width: 350,
                        height: 300,
                        borderRadius: 10,
                        backgroundColor: "gray",
                        borderWidth: 1,
                        borderColor: "lightgray",
                    }}
                />
            </TouchableOpacity>
            <TextInput
                    placeholder="Name"
                    style={{marginBottom: 5, marginTop: 20, borderWidth: 1.5, borderColor: "#379770", padding: 10, borderRadius: 10, width: 350, height: 50, backgroundColor: "white"}}
                    onChangeText={text => setName(text)}
                    value={name}

            />
            <TouchableOpacity
                style={{
                    backgroundColor: "#379770",
                    width: 350,
                    height: 50,
                    position: "absolute",
                    bottom: 20,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                }}
                onPress={() => {
                    if (name == "") {
                        Alert.alert("Please enter a name for your chat!")
                    }
                    else if (pfp == "") {
                        Alert.alert("Please upload a profile picture for your chat!")
                    } else {
                        // do something
                        let program_id = Math.random().toString(36).substring(2, 7);
                        var minm = 100000;
                        var maxm = 999999;
                        let joinCode = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
                        let qrCode = `reach://join/${program_id}`
                        let program = {
                            name: name,
                            pfp: pfp,
                            program_id: program_id,
                            joinCode: joinCode,
                            qrCode: qrCode,
                        
                        }
                        setLink(qrCode)
                        createProgramChat(program).then(() => {
                            addMember(user, program)
                        })
                        .then(() => {
                            bottomSheetRef.current?.expand();
                        })
                    }
                }}
            >
                <Text
                    style={{
                        color: "white",
                        fontSize: 15,
                    }}
                >
                    Create chat!
                </Text>
            </TouchableOpacity>
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
                <View
                    style={styles.contentContainer}
                >
                    <View
                        ref={svgRef}
                        collapsable={false}
                    >
                        <QRCode 
                            value={link}
                            size={175}
                            // getRef={(c) => (this.svg = c)}
                        />
                    </View>
                    <TouchableOpacity
                        style={{
                            borderWidth: 1,
                            borderColor: "#379770",
                            borderRadius: 10,
                            padding: 10,
                            marginTop: 20,
                            width: "100%",
                            alignItems: "center",
                        }}
                        onPress={() => {
                            screenshot()
                            bottomSheetRef.current?.close();
                            navigation.navigate("adminpanel");
                        }}
                    >
                        <Text
                            style={{
                                color: "#379770",
                                fontSize: 15,
                            }}
                        >
                            Save to camera roll
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            borderWidth: 1,
                            borderColor: "red",
                            borderRadius: 10,
                            padding: 10,
                            marginTop: 15,
                            width: "100%",
                            alignItems: "center",
                        }}
                        onPress={() => {
                            bottomSheetRef.current?.close();
                            navigation.navigate("adminpanel");
                        }}
                    >
                        <Text
                            style={{
                                color: "red",
                                fontSize: 15,
                            }}
                        >
                            No thanks, I'll save it later
                        </Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet>
            <KeyboardAvoidingView behavior='height' />
        </SafeAreaView>
    )
}

export default CreateProgramChat;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    padding: {
        paddingHorizontal: 20,
    },
    sheetContainer: {
        // add horizontal space
        marginHorizontal: 14,
      },
    contentContainer: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "blue"
    },
})