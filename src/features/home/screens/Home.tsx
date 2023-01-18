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
  TouchableWithoutFeedback
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
import { Gesture, GestureDetector, ScrollView } from 'react-native-gesture-handler';
import { useCollection } from '@app/lib/useFirebase';
import { MessageGroup, updateUser, useAuth, useAuthenticatedUser, UserProfile } from '@app/lib';
import { ProgramChatCard } from '../components/ProgramChatCard';
import { ProgramChat } from '@app/lib/programchat';
import { useAnnouncements } from '@app/lib/announcement';
import { HomeBubble } from '../components/HomeBubble';

const Home = ({ route, navigation }) => {
  const { user } = useAuthenticatedUser();
  const { data: groups } = useCollection<ProgramChat>(
    `users/${user?.uid}/groups`,
  );
  const { announcements } = useAnnouncements();
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        style={{
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            padding: 20,
            // marginLeft: 20,
          }}
        >
          <Text
            style={{
              fontSize: 25,
              // marginLeft: 20,
              color: '#000000',
            }}
          >
            Hi {user?.firstname}!
          </Text>
          <FlatList
            data={groups.filter(group => group.joinCode != null)}
            renderItem={({ item }) => (
              <ProgramChatCard
                data={item}
                onPress={() => navigation.navigate('ProgramChat', { data: item })}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <HomeBubble 
          data={{
            title: "Announcements"
          }}
          first
        >
          <FlatList
            data={announcements.filter((item) => item.programcode == null).sort((a, b) => b.createdAt - a.createdAt).slice(0, 3)}
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
          data={{
            title: "Upcoming Dates"
          }}
        >
          
        </HomeBubble>
        <HomeBubble
          data={{
            title: "Reminders"
          }}
        >

        </HomeBubble>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home;