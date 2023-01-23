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

export interface ProgramChatProps {
    data: {
        title: string,
    };
    children?: React.ReactNode;
    onPress?: () => void;
    first?: boolean;
    last?: boolean
}

export const HomeBubble = ({ data, onPress, children, first, last}: ProgramChatProps) => {
    return(
        <View
          style={{
            marginTop: first ? 0: 10,
            marginBottom: last ? 10 : 0,
            height: 200,
            width: "95%",
            backgroundColor: "#0000000d",
            borderRadius: 10,
            padding: 15,
            alignSelf: "center",
          }}
        >
            <Text
            style={{
              fontSize: 17,
              color: '#000000',

            }}
          >
            {data?.title}
          </Text>
          <View>
            {children}
          </View>
        </View>
    )
}