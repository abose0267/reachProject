import { BlockButton, ControlledTextInput, Header,ControlledInputProps} from '@app/components';
import BigButton from '@app/components/BigButton';
import { storage, useAuthenticatedUser } from '@app/lib';
import { StatusBar } from 'expo-status-bar';
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

const Blasts = ({ navigation, route }) => {
    const [pfp, setPfp] = useState("");
    const [name, setName] = useState("");
    const bottomSheetRef = useRef<BottomSheet>(null);
    const svgRef = useRef(null);
    const snapPoints = useMemo(() => [300, 300], []);
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
                        getMessageGroup([{uid: user.uid}, {uid: 'Dd9IteOnjVcuuXdMnIoWtADwSH52'}], name, pfp, true)
                        .then(id => {
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
                    <QRCode 
                        value='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                        size={175}
                        getRef={(c) => (this.svg = c)}
                    />
                    <TouchableOpacity
                        style={{
                            borderWidth: 1,
                            borderColor: "#379770",
                            borderRadius: 10,
                            padding: 10,
                            marginTop: 20,
                            width: "90%",
                            alignItems: "center",
                        }}
                        onPress={() => {
                            console.log(svgRef.current)
                            if (svgRef.current) {
                                svgRef.current.toDataURL(data => {
                                    console.log(data)
                                    // MediaLibrary.saveToLibraryAsync(data, )
                                    // .then(() => {
                                    //     Alert.alert("Saved to camera roll!")
                                    // })
                                    // .catch(err => {
                                    //     Alert.alert("Error saving to camera roll!")
                                    // })
                                })
                            }
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
                </View>
            </BottomSheet>
            <KeyboardAvoidingView behavior='height' />
        </SafeAreaView>
    )
}

export default Blasts;


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