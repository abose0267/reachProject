import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import { UserProfile } from '@app/lib';
import { colors } from '@app/constants';
import { Ionicons } from '@expo/vector-icons';


export interface ContactCardProps {
  data: Pick<UserProfile, 'firstname' | 'lastname' | 'role' | 'uid' | 'email' | 'username'>;
  onPress?: () => void;
  onSelect?: (uid) => void;
  selected?: boolean
}

export const ContactCard = ({ data, onPress, onSelect, selected = false }: ContactCardProps) => {
  const initials = data.firstname[0] + data.lastname[0];
  return (
    <>
      <TouchableOpacity style={styles.container} onPress={onPress} disabled={onPress == null}>
        {/* @ts-ignore */}
        <View style={{flex: 1, flexDirection: 'row'}}>
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
          <Text style={styles.role}>{data.role == "Admin" || data.role =="admin" ? "REACH Staff":"Member"}</Text>
          </View>
        </View>
        {onSelect &&
          <TouchableOpacity onPress={() => onSelect(data.uid)}>
            <Ionicons name={selected ? 'checkmark-circle' : 'checkmark-circle-outline'} size={30} color="black" />
          </TouchableOpacity>
        }

      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.grey,
    marginTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 15,
    flex: 1,
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
    paddingHorizontal: 15,
    flex: 1,
  }
});
