import { Picker } from '@react-native-picker/picker';
import React, { useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, SectionList, Text, FlatList, TouchableOpacity, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { ProgramChat } from '../lib/programchat';


export interface ProgramDataProps {
    data: ProgramChat[];
    selectedValue: string;
    setSelectedProgram?: () => void;
    ref?: any;
}

export const Dropdown = ({ data, selectedValue, setSelectedProgram, ref}) => {

    return (
        <Picker
            ref={ref}
            selectedValue={selectedValue}
            onValueChange={(itemvalue, itemindex) => {
                setSelectedProgram(itemvalue);
            }}
        >
            {data?.map((item) => (
                <Picker.Item value={item.name} />
            ))}
        </Picker>
    )
}