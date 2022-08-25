import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import { MessageGroup, MessageProfile, UserProfile } from '@app/lib';
import { colors } from '@app/constants';
import { getAuth } from 'firebase/auth';

export interface MessageCardProps {
    data: MessageGroup;
    onPress?: () => void;
}

export const MessageCard = ({ data, onPress }: MessageCardProps) => {

    const initials = data.members[0].firstname[0] + data.members[0].lastname[0];
    // const [otherUserFname, setOtherUserF] = useState<String>("")
    // const [otherUserLname, setOtherUserL] = useState<String>("")
    // const [initials, setInitials] = useState<string>("")



    // useEffect(() => {
    //     for (var i = 0; i < data?.members.length; i++) {
    //         if (data?.members[i].uid != getAuth().currentUser.uid) {
    //             setOtherUserF(data?.members[i].firstname)
    //             setOtherUserL(data?.members[i].lastname)
    //         }
    //     }
    //     setInitials(otherUserFname[0] + otherUserLname[0])

    // }, [data])

    return (
        <>
            <TouchableOpacity style={styles.container} onPress={onPress}>
                {/* @ts-ignore */}
                <Avatar.Text
                    label={initials}
                    size={40}
                    theme={{
                        colors: {
                            primary: colors.green,
                        },
                    }}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{data.name}</Text>
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
