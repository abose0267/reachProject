import React, { ComponentProps } from "react";
import { View, StyleSheet } from "react-native";

export const ActionContainer = ({children}: ComponentProps<typeof View>) => (
    <View style={styles.actionContainer}>{children}</View>
  );
  
  const styles = StyleSheet.create({
    actionContainer: {},
  });