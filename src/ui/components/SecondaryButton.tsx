import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ColorValue,
  Text,
} from "react-native";
import { colors, colorWithOpacity } from "../../res/colors";
import { normalizeSize, ThinTypography, Typography, LightTypography } from '../../res/typography';
import { spacing } from "../../res/spacing";

interface Props {
  symbol?: string
  text: string;
  onPress: () => void;
  disable?: boolean;
  left: boolean;
}

export const SecondaryButton = ({
  symbol = "",
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
        <LightTypography style={[styles.symbolText, left ? styles.leftJustified : styles.centered]}>{symbol}</LightTypography>
        <Typography style={[styles.buttonText, left ? styles.leftJustified : styles.centered]}>{text}</Typography>
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
    alignItems:"center",
    flexDirection:"row",
  },
  buttonText: {
    color: colorWithOpacity(colors.blue, 1.0),
    fontSize: normalizeSize(17),
  },
  symbolText:{
    color: colorWithOpacity(colors.blue, 1.0),
    fontSize: normalizeSize(40),
  }
});
