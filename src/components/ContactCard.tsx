import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import { UserProfile } from '@app/lib';
import { colors } from '@app/constants';

export interface ContactCardProps {
  data: Pick<UserProfile, 'firstname' | 'lastname' | 'role' | 'uid' | 'email' | 'username'>;
  onPress?: () => void;
}

export const ContactCard = ({ data, onPress }: ContactCardProps) => {
  const initials = data.firstname[0] + data.lastname[0];
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
          <Text style={styles.name}>{data.firstname} {data.lastname}</Text>
          <Text style={styles.role}>{data.role}</Text>
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
    paddingHorizontal:15
  },
  name: {
    fontSize: 18,
    fontWeight: '400',
  },
    role: {
    fontSize: 15,
      fontWeight: '300',
      color: 'gray'
  },
  textContainer: {
    paddingHorizontal: 20
  }
});
