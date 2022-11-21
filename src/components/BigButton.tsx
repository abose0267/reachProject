import React, { ComponentProps } from 'react';
import { TouchableOpacity, StyleSheet, Text, TextStyle, Dimensions } from 'react-native';

interface BigButtonProps extends ComponentProps<typeof TouchableOpacity> {
  outlined?: boolean;
  textStyle?: TextStyle;
}

export const BigButton = ({ children, style, outlined = false, textStyle, ...rest }: BigButtonProps) => {
  return (
    <TouchableOpacity {...rest} style={[styles.button, (outlined && styles.outlined), style]}>
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};

export default BigButton;
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#379770',
    minHeight: 50,
    borderWidth: 1.2,
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
        marginBottom: 10,
        height: Dimensions.get('window').height / 2,
        
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
