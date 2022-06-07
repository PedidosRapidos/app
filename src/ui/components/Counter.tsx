import { useState } from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { width } from "../../res/responsive";
import { IconButton } from "./IconButton";
import { colors, colorWithOpacity } from "../../res/colors";
import { sizes, Typography } from "../../res/typography";
import React, { useEffect } from "react";
import { useCart } from "../../contexts/CartContext";

interface Props {
  counter: number;
  setCounter: (_: number) => any;
  min?: number;
  max?: number;
  style?: StyleProp<ViewStyle>;
  buttonsStyles?: StyleProp<ViewStyle>;
}

export const Counter = ({
  style,
  buttonsStyles,
  counter,
  min,
  max = 99,
  setCounter,
}: Props) => {
  const inc = () => {
    if (counter < max) {
      const value = counter + 1;
      setCounter(value);
    }
  };
  const dec = () => {
    if (counter > 1 || (min && counter > min)) {
      const value = counter - 1;
      setCounter(value);
    }
  };

  return (
    <View style={[styles.counterContainer, style]}>
      <View style={{ flex: 3 }}>
        <IconButton
          style={[styles.icon, buttonsStyles]}
          name="minus"
          onPress={dec}
          size={sizes.productDescription}
        />
      </View>
      <View style={{ flex: 1, alignSelf: "center", marginRight: "5%" }}>
        <Typography style={styles.textCount}>{counter}</Typography>
      </View>
      <View style={{ flex: 3 }}>
        <IconButton
          style={[styles.icon, buttonsStyles]}
          name="plus"
          onPress={inc}
          size={sizes.productDescription}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  counterContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  icon: {
    backgroundColor: colorWithOpacity(colors.darkOrange, 1.0),
  },
  textCount: {
    color: colorWithOpacity(colors.white, 1.0),
    fontSize: 19,
  },
});
