import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ColorValue,
  Text,
} from "react-native";
import { colors, colorWithOpacity } from "../../res/colors";
import { normalizeSize } from "../../res/typography";
import { spacing } from "../../res/spacing";

interface Props {
  text: string;
  onPress: () => void;
  disable?: boolean;
  left: boolean;
}

export const SecondaryButton = ({
  text,
  onPress,
  disable = false,
  left = true

}: Props) => {
  return (
    <View
      style={{
        opacity: disable ? 0.5 : 1,
      }}
    >
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={disable ? () => {} : onPress}
        >
        <Text style={[styles.buttonText, left ? styles.leftJustified : styles.centered]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  leftJustified:{
    textAlign: "left",
  },
  centered:{
    textAlign: "center",
  },
  buttonContainer: {
    height: 60,
    alignContent: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: colorWithOpacity(colors.blue, 0.9),
    fontSize: normalizeSize(17),
  },
});
