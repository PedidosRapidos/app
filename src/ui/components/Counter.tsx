import { useState } from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { IconButton } from "./IconButton";

interface Props {
  counter: number;
  setCounter: (_: number) => any;
  style?: StyleProp<ViewStyle>;
}

export const Counter = ({ style, counter, setCounter }: Props) => {
  const inc = () => {
    const value = counter + 1;
    setCounter(value);
  };
  const dec = () => {
    if (counter > 1) {
      const value = counter - 1;
      setCounter(value);
    }
  };

  return (
    <View style={[{ flex: 3, flexDirection: "row" }, style]}>
      <IconButton
        style={styles.leftRounded}
        name="minus"
        onPress={dec}
        size={20}
      />
      <Text style={styles.textCount}>{counter}</Text>
      <IconButton
        style={styles.rightRounded}
        name="plus"
        onPress={inc}
        size={20}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  leftRounded: {
    borderRadius: 1,
    borderWidth: 0,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    paddingRigth: 0,
    marginRight: 0,
  },
  rightRounded: {
    flex: 1,
    borderRadius: 1,
    borderWidth: 0,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    paddingLeft: 0,
    marginLeft: 0,
  },
  textCount: {
    flex: 1,
    width: "20%",
    backgroundColor: "white",
    color: "black",
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold",
    fontSize: 20,
    borderWidth: 0,
    marginHorizontal: 0,
    paddingHorizontal: 0,
  },
});
