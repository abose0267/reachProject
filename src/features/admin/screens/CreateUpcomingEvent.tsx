import { useAuthenticatedUser } from "@app/lib";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { createAnnouncement } from "@app/lib/announcement";
import { ProgramChat, useProgramChats } from "@app/lib/programchat";
import { Controller, useForm } from "react-hook-form";
import DropDownPicker from "react-native-dropdown-picker";
import { colors } from "@app/constants";
import {
  BlockButton,
  ControlledInputProps,
  ControlledTextInput,
} from "@app/components";
import RNDateTimePicker from "@react-native-community/datetimepicker";

interface CreateEventInput {
  name: string;
  description: string;
  program_id?: string;
  program_name?: string;
  date: Date;
}

const Input = (props: ControlledInputProps<CreateEventInput>) => (
  <ControlledTextInput {...props} />
);

const CreateUpcomingEvent = ({ navigation, route }) => {
  const { user } = useAuthenticatedUser();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateEventInput>({
    defaultValues: {
      program_id: "0",
      date: new Date(),
      description: " ",
    },
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const onSubmit = (data) => {
    const program_name =
      data.program_id == 0
        ? "All"
        : programs.find((p) => p.program_id == data.program_id).name;
    createAnnouncement({
      ...data,
      program_name,
    });
  };
  const { programs } = useProgramChats();

  return (
    <SafeAreaView style={[styles.container]}>
      <View
        style={{
          marginTop: 10,
        }}
      >
        <Input name="name" label="Event Name" control={control} />
        <Input
          name="description"
          control={control}
          label="Description"
          // accessibilityElementsHidden
          multiline
          style={{ height: 100, marginBottom: 5 }}
        />
        <Controller
          name="program_id"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <DropDownPicker
              schema={{ label: "name", value: "program_id" }}
              open={dropdownOpen}
              value={value}
              items={[{ name: "All Members", program_id: "0" }, ...programs]}
              setOpen={setDropdownOpen}
              setValue={(v) => onChange(v(value))}
              dropDownContainerStyle={{ backgroundColor: "#f6f6f6" }}
              style={{ borderColor: "#777", backgroundColor: "#f6f6f6" }}
            />
          )}
        />
        <Controller
          name="date"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            // <DropDownPicker
            //   schema={{ label: 'name', value: 'program_id' }}
            //   open={dropdownOpen}
            //   value={value}
            //   items={[{ name: 'All Members', program_id: '0' }, ...programs]}
            //   setOpen={setDropdownOpen}
            //   setValue={v => onChange(v(value))}
            //   dropDownContainerStyle={{ backgroundColor: '#f6f6f6' }}
            //   style={{ borderColor: '#777', backgroundColor: '#f6f6f6' }}
            // />
            <TimePicker value={new Date(value)} onChange={(e) => e} />
          )}
        />

        <View style={{ marginTop: 30 }}>
          <BlockButton onPress={handleSubmit(onSubmit)}>Send</BlockButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
});

export default CreateUpcomingEvent;

interface TimePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

const TimePicker = ({ value, onChange }: TimePickerProps) => {
  
  return (
    <View style={{ flexDirection: "row", height: 40, marginTop: 10 }}>
      <RNDateTimePicker
        mode="date"
        maximumDate={new Date(2030, 10, 20)}
        value={new Date()}
        onChange={(e) => e}
        accentColor={colors.green}
        style={{marginRight: 10}}
      />
      <RNDateTimePicker
        mode="time"
        maximumDate={new Date(2030, 10, 20)}
        value={new Date()}
        onChange={(e) => console.log(new Date(e.nativeEvent.timestamp))}
        accentColor={colors.green}
        // textColor="red"
      />
    </View>
  );
};

// onPress={() => {
//           const randomId = Math.random().toString(36).substring(2, 15);
//           if (name === "" || message === "") {
//             Alert.alert("Please fill out all fields");
//             return;
//           } else {
//             createEvent({
//               name: name,
//               description: message,
//               date: date,
//               event_id: randomId,
//             })
//               .then(() => {
//                 Alert.alert("Event created!");
//               })
//               .then(() => {
//                 navigation.navigate("adminpanel");
//               });
//           }
//         }}
