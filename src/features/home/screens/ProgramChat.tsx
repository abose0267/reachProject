import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
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
    FlatList,
    ImageBackground,
    TouchableWithoutFeedback,
    ScrollView
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
import { MessageCard } from '@app/components/MessageCard';
import { HomeBubble } from '../components/HomeBubble';
import { useAnnouncements } from '@app/lib/announcement';


const ProgramChat = ({ route, navigation }) => {
    const { data } = route.params;
    const {announcements} = useAnnouncements();
    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}
        >
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        paddingHorizontal: 20,
                        marginTop: 10,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 40,
                        }}
                    >
                        {data?.name}
                    </Text>
                </View>
                <View
                    style={{
                        paddingHorizontal: 20,
                        marginTop: 20,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 15,
                            color: "gray",
                            fontWeight: "bold",
                        }}
                    >
                        CHAT
                    </Text>
                    <MessageCard
                        data={data}
                        onPress={() => {
                            navigation.navigate('messages', { id: data.program_id, isProgramChat: true })
                        }}
                    />
                </View>
                <HomeBubble
                    data={{ title: "Upcoming Events" }}
                    first
                >

                </HomeBubble>
                <HomeBubble
                    data={{ title: "Announcements" }}
                >
                    <FlatList
                        data={announcements.filter((item) => item.programcode == data.joinCode).sort((a, b) => b.createdAt - a.createdAt).slice(0, 3)}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                style={{
                                    height: 50,
                                    width: "100%",
                                    marginTop: index == 0 ? 5 : 0,
                                    // alignSelf: "center",
                                }}
                                onPress={() => navigation.navigate('Announcements', { data: item })}
                            >
                                <>
                                    {index > 0 && <View style={{
                                        height: 1,
                                        width: "100%",
                                        backgroundColor: "gray",
                                    }}
                                    />}
                                    <Text
                                        style={{
                                            fontSize: 15,
                                            marginTop: 7.5,
                                            color: '#000000',
                                        }}
                                    >
                                        {item.title}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: 'gray',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {/* @ts-ignore */}
                                        {item.createdAt.toDate().toDateString().toUpperCase()}
                                    </Text>
                                </>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </HomeBubble>
                <HomeBubble
                    data={{ title: "Attachments" }}
                    last
                >

                </HomeBubble>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProgramChat;