import React, { PropsWithChildren } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

export const Row = ({
  children,
  style,
}: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) => {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export const Column = ({
  children,
  style,
}: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) => {
  return (
    <View
      style={[
        {
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};
