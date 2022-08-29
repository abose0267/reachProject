import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Pressable, TouchableHighlight } from 'react-native';
import { Avatar } from 'react-native-paper';
import { colors } from '@app/constants';
import { getAuth } from 'firebase/auth';

export interface MessageCardProps {
    title: string;
    latestMessage: string;
    onPress?: () => void;
}
export const AnnouncementCard = ({ title, latestMessage, onPress }: MessageCardProps) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View >
                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: '500',
                        color: colors.green,

                    }}
                >
                    {title}
                </Text>
                <Text
                    style={{
                        fontSize: 15,
                        fontWeight: '400',
                        color: "gray",
                    }}
                >
                    {latestMessage == null ? "No recent announcements" : latestMessage}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("screen").width - 40,
        // borderWidth: 1,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey,
        minHeight: 70,
        padding: 10,
        paddingVertical: 20,
    },
    // textContainer: {
    //     marginLeft: 
    // }
})