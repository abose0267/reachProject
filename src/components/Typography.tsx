import React, {ComponentProps} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {colors} from '@app/constants';
import {getHeaderTitle} from '@react-navigation/elements';
import {IconButton} from 'react-native-paper';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

type HeaderProps = ComponentProps<typeof Text> & {
  label: string;
  containerStyle?: any;
};

export const Header = ({
  label,
  style,
  containerStyle,
  ...rest
}: HeaderProps) => (
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
    // marginTop: 10,
    // marginBottom: 20,
  },
});

export const AppHeader = ({navigation, route, options, back}: NativeStackHeaderProps) => {
  const title = getHeaderTitle(options, route.name);

  const Right = options.headerRight
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 40,
        height: 60,
        alignItems: 'center',
        justifyContent: 'flex-start'
      }}>
      {back && (
        <IconButton
          icon="arrow-left"
          size={30}
          onPress={() => navigation.goBack()}
          style={{position: 'relative', right: 20, marginRight: -15}}
        />
      )}
      <Header
        label={title}
        // containerStyle={{backgroundColor: 'red'}}
      />
     {options?.headerRight && options?.headerRight()} 
    </View>
  );
};
