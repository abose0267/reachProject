import { colors } from "@app/constants";
import React from "react";
import { View } from "react-native";

export const Divider = () => (
    <View
      style={{
        flexDirection: 'row',
        height: 1,
        backgroundColor: colors.grey,
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowOpacity: 1,
        shadowRadius: 1,
        marginTop: 10,
      }}
    />
  );
  