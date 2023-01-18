import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { Avatar } from 'react-native-paper';
import { MessageGroup, useAuthenticatedUser, UserProfile } from '@app/lib';
import { colors } from '@app/constants';
import { getAuth } from 'firebase/auth';

import Ionicons from '@expo/vector-icons/Ionicons';
import { ProgramChat } from '@app/lib/programchat';

export interface ProgramChatProps {
    data: ProgramChat;
    onPress?: () => void;
}

export const ProgramChatCard = ({ data, onPress }: ProgramChatProps) => {
    // const { user } = useAuthenticatedUser();
    return(
        <>
            <TouchableOpacity
              style={{
                // backgroundColor: '/black',
                marginTop: 10,
                width: 150,
                borderRadius: 10,
                marginRight: 10,
                height: 150,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={onPress}
            >
              <ImageBackground
                source={{ uri: data?.pfp }}
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: 'flex-start',
                  justifyContent: 'flex-end',
                  borderWidth: 1,
                  borderColor: 'lightgray',
                  borderRadius: 10,
                }}
                imageStyle={{
                  borderRadius: 10,
                }}
              >
                <View
                  style={{
                    backgroundColor: '#379770',
                    padding: 10,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    justifyContent: 'center',
                    width: '100%',
                    height: 45,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17.5,
                      color: 'white',
                    }}
                  >
                    {data.name}
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
        </>
    )

}


