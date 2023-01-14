import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import { MessageGroup, useAuthenticatedUser, UserProfile } from '@app/lib';
import { colors } from '@app/constants';
import { getAuth } from 'firebase/auth';

import Ionicons from '@expo/vector-icons/Ionicons';

export interface MessageCardProps {
    data: MessageGroup;
    onPress?: () => void;
}

export const MessageCard = ({ data, onPress }: MessageCardProps) => {
    const { user } = useAuthenticatedUser();

    // const initials = data?.members[1]?.firstname[0] + data?.members[1]?.lastname[0];
    const otherUsers = data?.members?.filter(p => p.uid != user?.uid);
    {/* @ts-ignore */}
    const chatName = otherUsers?.length <= 1 && !data?.isProgramChat ? 
        `${otherUsers[0]?.firstname} ${otherUsers[0]?.lastname}` 
        : 
        data?.name;

    return (
        <>
            <TouchableOpacity style={styles.container} onPress={onPress}>
                {/* @ts-ignore */}
                { data?.members?.length < 3 && data?.program_id == null &&
                    <Avatar.Text
                        label={data?.members[1]?.firstname[0] + data?.members[1]?.lastname[0]}
                        size={40}
                        theme={{
                            colors: {
                                primary: colors.green,
                            },
                        }}
                    />
                }
                {data?.members?.length >= 3 && data?.program_id == null &&
                    <Avatar.Icon
                        icon={"account-group"}
                            size={40}
                        theme={{
                            colors: {
                                primary: colors.green,
                            },
                        }}
                    />
                }
                {/* @ts-ignore */}
                {data?.program_id != null &&
                    <Avatar.Image 
                        source={{uri: data?.pfp}}
                        size={40}
                    />
                }

                
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{chatName}</Text>
                    {data?.program_id != null &&
                        <Text style={{fontSize: 12, color: "gray", fontWeight: "500"}}>PROGRAM CHAT</Text>
                    }
                </View>
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.grey,
        marginTop: 15,
        paddingBottom: 15,
    },
    name: {
        fontSize: 18,
        fontWeight: '400',
    },
    textContainer: {
        paddingHorizontal: 20
    }
});
