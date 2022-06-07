import React, { ComponentProps } from 'react';
import { View } from 'react-native'
import { TextInput as PaperTextInput } from 'react-native-paper';
import { colors } from '@app/constants';

type TextInputProps = ComponentProps<typeof PaperTextInput> & {
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
