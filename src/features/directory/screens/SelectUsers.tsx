import React, {useEffect, useMemo, useState} from 'react';
import {View, SafeAreaView, StyleSheet, SectionList, Text} from 'react-native';
import {BlockButton, ContactCard, Header, TextInput} from '@app/components';
import {colors} from '@app/constants';
import {useAuth, useAuthenticatedUser, UserProfile} from '@app/lib';
import {useCollection} from '@app/lib/useFirebase';

const SelectUsers = ({onChange, showCurrentUser = true}) => {
  const {signout} = useAuth();
  const {user} = useAuthenticatedUser()
  const {data: users} = useCollection<UserProfile>('users');

  const filteredUsers = useMemo(() => showCurrentUser ? users: users?.filter(u => user?.uid != u.uid), [users, user])
  const sectionedList = useMemo(
    () => [
      {
        title: 'ADMIN',
        data: filteredUsers?.filter(u => u.role.toLowerCase() == 'admin'),
      },
      {
        title: 'MEMBER',
        data: filteredUsers?.filter(u => u.role.toLowerCase() == 'member'),
      },
    ],
    [filteredUsers],
  );

  const [selected, setSelected] = useState({});

  const toggleSelection = uid =>
    setSelected({
      ...selected,
      [uid]: !(selected[uid] ?? false),
    });

  useEffect(() => {
    if (onChange) {
      onChange(
        Object.entries(selected)
          .filter(([k, v]) => v)
          .map(([k]) => k),
      );
    }
  }, [selected]);

  return (
    <SafeAreaView style={[styles.container]}>
      <View>
        <SectionList
          renderSectionHeader={({section: {title}}) => (
            <View style={{backgroundColor: '#dedede', width: '100%'}}>
              <Text
                style={{
                  fontSize: 15,
                  padding: 5,
                  left: 6,
                  fontWeight: '600',
                  color: '#262626',
                }}>
                {title}
              </Text>
            </View>
          )}
          sections={sectionedList}
          renderItem={({item}) => (
            <ContactCard
              onSelect={uid => toggleSelection(uid)}
              data={item}
              selected={selected[item.uid] ?? false}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default SelectUsers;

const Divider = () => (
  <View
    style={{
      flexDirection: 'row',
      height: 1,
      backgroundColor: colors.grey,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 1,
      shadowRadius: 1,
      marginTop: 10,
    }}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // marginHorizontal: 20,
    marginBottom: 75,
  },
  padding: {
    paddingHorizontal: 20,
  },
});
