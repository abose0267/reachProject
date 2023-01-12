import {useAuthenticatedUser} from '@app/lib';
import {UserProfile} from 'firebase/auth';
import React from 'react';
import {View, Text} from 'react-native';

export interface UserProfileViewProps {
  user: UserProfile;
}
export const UserProfileView = ({user}) => {
  return (
    <View style={{marginHorizontal: 20}}>
      <View
        style={{
          aspectRatio: 1,
          // width: Dimensions.get('screen').width - 40,
          backgroundColor: '#00000020',
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 100, fontWeight: '600'}}>
          {`${user?.firstname[0]}${user?.lastname[0]}`}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 25,
          fontWeight: '500',
          marginTop: 12,
        }}>{`${user?.firstname} ${user?.lastname}`}</Text>
      {user?.title && (
        <Text
          style={{
            textTransform: 'uppercase',
            fontWeight: '600',
            color: '#00000080',
            marginTop: 8,
            marginBottom: 8,
          }}>
          {user?.title}
        </Text>
      )}
      <Text
        style={{
          fontSize: 17,
          fontWeight: '400',
        }}>{`@${user?.username}`}</Text>
    </View>
  );
};
