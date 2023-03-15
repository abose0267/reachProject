import React from 'react';
import {View} from 'react-native';
import {Bubble} from 'react-native-gifted-chat';

export const renderBubble = props => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      // justifyContent: 'space-between',
    }}>
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor:
            props.currentMessage?.image || props.currentMessage?.file
              ? 'transparent'
              : '#2B68E6',
        },
        left: {
          backgroundColor:
            props.currentMessage?.image || props.currentMessage?.file
              ? 'transparent'
              : '#E5E5EA',
        },
      }}
    />
  </View>
);
