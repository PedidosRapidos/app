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

interface Props {
  text: string;
  onPress: () => void | Promise<any>;
  backgroundColor?: ColorValue;
  disable?: boolean;
}

export const MainButton = ({
  text,
  onPress,
  backgroundColor = colors.orange,
  disable = false,
}: Props) => {
  return (
    <View
      style={{
        opacity: disable ? 0.5 : 1,
      }}
    >
      <TouchableOpacity
        style={{
          ...styles.buttonContainer,
          backgroundColor,
        }}
        onPress={disable ? () => {} : onPress}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderWidth: 5,
    borderColor: colorWithOpacity(colors.orange, 0.08),
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 15,
    height: 60,
    //marginHorizontal: spacing.paddingHorizontal / 2,
  },
  buttonText: {
    color: colors.white,
    fontSize: normalizeSize(17),
    textAlign: "center",
  },
});
