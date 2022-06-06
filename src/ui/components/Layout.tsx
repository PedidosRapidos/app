import React, { PropsWithChildren } from "react";
import { StyleProp, View, ViewStyle, StyleSheet } from "react-native";

export const Row = React.memo(
  ({
    children,
    style,
  }: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) => {
    return <View style={[styles.row, style]}>{children}</View>;
  }
);

export const Column = React.memo(
  ({
    children,
    style,
  }: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) => {
    return <View style={[styles.column, style]}>{children}</View>;
  }
);

const styles = StyleSheet.create({
  column: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
});
