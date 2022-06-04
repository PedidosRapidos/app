import { useState } from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { width } from "../../res/responsive";
import { IconButton } from "./IconButton";
import { colors, colorWithOpacity } from '../../res/colors';
import { sizes } from '../../res/typography';

interface Props {
  counter: number;
  setCounter: (_: number) => any;
  min?: number;
  max?: number;
  style?: StyleProp<ViewStyle>;
  buttonsStyles?: StyleProp<ViewStyle>;
}

export const Counter = ({ style, buttonsStyles, counter, min, max = 99, setCounter }: Props) => {
  const inc = () => {
    if(counter < max){
      const value = counter + 1;
      setCounter(value);
    }
  };
  const dec = () => {
    if (counter > 1 || min && counter > min) {
      const value = counter - 1;
      setCounter(value);
    }
  };

  return (
    <View style={[styles.counterContainer, style]}>
      <IconButton
        style={[styles.icon, buttonsStyles]}
        name="minus"
        onPress={dec}
        size={sizes.productDescription}
      />
      <Text style={styles.textCount}>{counter}</Text>
      <IconButton
        style={[styles.icon, buttonsStyles]}
        name="plus"
        onPress={inc}
        size={sizes.productDescription}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  counterContainer:{
    flexDirection:"row",
    backgroundColor: colorWithOpacity(colors.darkOrange, 1.0),
  },
  icon: {
    borderRadius: 0,
    backgroundColor: colorWithOpacity(colors.darkOrange, 1.0),
  },
  textCount: {
    color: colorWithOpacity(colors.white, 1.0),
    textAlign: "center",
    textAlignVertical: "center",
  },
});
