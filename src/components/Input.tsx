import React, { ComponentProps } from 'react';
import { Text, View } from 'react-native'
import { TextInput as PaperTextInput } from 'react-native-paper';
import { colors } from '@app/constants';
import { UserAccountCreateInput } from '@app/lib';
import { UseControllerProps, useController } from 'react-hook-form';

export type TextInputProps = ComponentProps<typeof PaperTextInput> & {
  outlined?: boolean;
};

export const TextInput = ({ style, ...rest }: TextInputProps) => {
  return (
    <View style={{marginBottom: 5}}>
      {/* @ts-ignore */} 
      <PaperTextInput
        mode="outlined"
        outlineColor={colors.black}
        activeOutlineColor={colors.green}
        theme={{ roundness: 10 }}
        style={[{ height: 45}, style]}
        {...rest}
      />
    </View>
  );
};

export type ControlledInputProps<T> = UseControllerProps<T> & TextInputProps;

export const ControlledTextInput = (props: ControlledInputProps<any>) => {
  const { field, fieldState } = useController(props);
  const { name, onBlur, onChange, value } = field;
  return (
    <>
    <TextInput
      onBlur={onBlur}
      onChangeText={onChange}
      value={value}
      {...props}
    />
    {fieldState.error && <Text>{fieldState.error.message}</Text>}
    </>
  );
}
