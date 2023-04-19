import { useAuthenticatedUser } from '@app/lib';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { createAnnouncement } from '@app/lib/announcement';
import { ProgramChat, useProgramChats } from '@app/lib/programchat';
import { Controller, useForm } from 'react-hook-form';
import DropDownPicker from 'react-native-dropdown-picker';
import { colors } from '@app/constants';
import {
  BlockButton,
  ControlledInputProps,
  ControlledTextInput,
} from '@app/components';

interface CreateAnnouncementInput {
  title: string;
  message: string;
  program_id?: string;
  program_name?: string;
}

const Input = (props: ControlledInputProps<CreateAnnouncementInput>) => (
  <ControlledTextInput required {...props} />
);

const SendAnnouncement = ({ navigation, route }) => {
  const { user } = useAuthenticatedUser();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAnnouncementInput>({
    defaultValues: {
      program_id: '0',
    },
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const onSubmit = data => {
    const program_name =
      data.program_id == 0
        ? 'All'
        : programs.find(p => p.program_id == data.program_id).name;
    createAnnouncement({
      ...data,
      program_name,
    }).then(() =>  navigation.goBack()).catch(() => {});
  };
  const { programs } = useProgramChats();

  return (
    <SafeAreaView style={[styles.container]}>
      <View
        style={{
          marginTop: 10,
        }}>
        <Input name="title" label="Title" control={control} />
        <Input
          name="message"
          control={control}
          multiline
          style={{ height: 200, marginBottom: 5 }}
        />
        <Controller
          name="program_id"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <DropDownPicker
              schema={{ label: 'name', value: 'program_id' }}
              open={dropdownOpen}
              value={value}
              items={[{ name: 'All Members', program_id: '0' }, ...programs]}
              setOpen={setDropdownOpen}
              setValue={v => onChange(v(value))}
              dropDownContainerStyle={{ backgroundColor: '#f6f6f6' }}
              style={{ borderColor: '#777', backgroundColor: '#f6f6f6' }}
            />
          )}
        />

        <View style={{ marginTop: 30 }}>
          <BlockButton onPress={handleSubmit(onSubmit)}>Send</BlockButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SendAnnouncement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
});
