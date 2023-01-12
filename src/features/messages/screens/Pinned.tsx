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
  Linking,
  FlatList
} from 'react-native';
import {
  BlockButton,
  ActionContainer,
  Header,
  ControlledTextInput,
  ControlledInputProps,
  Divider,
} from '@app/components';
import { PinnedMessageData, unpinMessage, useGroupedPins } from '@app/lib/pinned';
import * as Haptics from 'expo-haptics';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import 'react-native-gesture-handler';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const Pinned = ({ route, navigation }) => {
    const {pins} = useGroupedPins(route.params.id)
    return(
        <SafeAreaView
            style={{
                flex: 1,
            }}
        >
          <View
            style={{
                marginTop: 20,
            }}
          >
            <Header
                label={"Pinned"}
                containerStyle={{ marginBottom: 5, marginLeft: 20 }}
            />
          </View>
          <FlatList 
            data={pins.sort((a,b) => b.createdAt - a.createdAt)}
            keyExtractor={item => item.message_id}
            renderItem={(item) => {
                // console.log(item.item.createdAt.)
                return(
                    <TouchableOpacity
                        style={{
                            width: Dimensions.get("window").width,
                            borderTopWidth: item.index == 0 ? 0.5 : 0,
                            borderBottomWidth: 0.5,
                            borderTopColor: "lightgray",
                            borderBottomColor: "lightgray",
                            // marginHorizontal: 20,
                            paddingHorizontal: 20,
                        }}
                        onLongPress={() => {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                            Alert.alert(
                                "Unpin message",
                                "Are you sure you want to unpin this message?",
                                [
                                    {
                                        text: "Cancel",
                                        onPress: () => console.log("Cancel Pressed"),
                                        style: "cancel"
                                    },
                                    { text: "OK", onPress: () => {
                                        console.log(item.item.message_id)
                                        unpinMessage(item.item.document_id)
                                        // unpinMessage(item.item.message_id)
                                    }, style: 'destructive' }
                                ],
                                { cancelable: false }
                            );
                        }}
                    >
                        <View
                            style={{
                                marginVertical: 10,
                            }}
                        >
                        {item.item.image != null &&
                            <Image 
                                source={{uri: item.item.image}}
                                style={{
                                    height: 250,
                                    width: 250,
                                    borderRadius: 10,
                                    backgroundColor: '#E5E5EA',
                                }}
                            />
                        }
                        {item.item.file != null &&
                            <TouchableOpacity 
                                style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, backgroundColor: '#E5E5EA', borderRadius: 10, width: 200}}
                                onPress={() => Linking.openURL(item.item?.file?.file)}
                            >
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Ionicons 
                                        name="document-text" 
                                        size={24} 
                                        color="#379770"
                                    />
                                    <Text style={{marginLeft: 10}}>{item.item?.file?.name}</Text>
                                </View>
                            </TouchableOpacity>
                        }
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "800"
                            }}
                        >
                            {item.item.text}
                        </Text>
                        <Text
                            style={{
                                fontSize: 12,
                                fontWeight: "200",
                                color: "gray",
                                marginTop: 5,
                            }}
                        >
                            {item.item.createdAt.toDate().toLocaleString()}
                        </Text>
                    </View>
                    </TouchableOpacity>
                )
            }}
            style={{
                marginTop: 10,
            }}
          />
        </SafeAreaView>
    )
}


export default Pinned;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});