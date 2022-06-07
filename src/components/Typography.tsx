import React, { ComponentProps } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { colors } from '@app/constants';

type HeaderProps = ComponentProps<typeof Text> & {
  label: string;
  containerStyle?: any;
};

export const Header = ({ label, style, containerStyle, ...rest }: HeaderProps) => (
  <View style={[styles.headerContainer, containerStyle]}>
    <Text style={[styles.header, style]} {...rest}>
      {label}
    </Text>
  </View>

);

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: '600',
    color: colors.black,
  },
  headerContainer: {
    marginTop: 10,
    marginBottom: 20,
  }
});
