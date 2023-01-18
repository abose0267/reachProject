import React, { ComponentProps } from 'react';
import { TouchableOpacity, StyleSheet, Text, TextStyle } from 'react-native';

interface BlockButtonProps extends ComponentProps<typeof TouchableOpacity> {
  outlined?: boolean;
  textStyle?: TextStyle;
}

export const BlockButton = ({ children, style, outlined = false, textStyle, ...rest }: BlockButtonProps) => {
  return (
    <TouchableOpacity {...rest} style={[styles.button, (outlined && styles.outlined), style]}>
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};

export default BlockButton;
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#379770',
    minHeight: 50,
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 17,
    fontWeight: "500"
  },
  outlined: {
    backgroundColor: 'transparent',
    borderColor: '#000',
  }
});
