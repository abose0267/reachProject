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
import { useCollection } from '@app/lib/useFirebase';
import {MessageGroup, updateUser, useAuth, useAuthenticatedUser, UserProfile} from '@app/lib';

const Home = ({ route, navigation }) => {
  const {user} = useAuthenticatedUser();
  const {data: groups} = useCollection<MessageGroup>(
    `users/${user?.uid}/groups`,
  );
  
    return(
      <SafeAreaView
          style={{
              flex: 1,
          }}
      >
          <View>
            
          </View>
      </SafeAreaView>
    )
}

export default Home;