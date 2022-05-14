import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ColorValue,
  Text,
  StyleProp,
} from "react-native";
import { colors, colorWithOpacity } from "../../res/colors";
import { normalizeSize } from "../../res/typography";
import { spacing } from "../../res/spacing";

interface Props {
  text: string;
  onPress: () => void;
  backgroundColor?: ColorValue;
  disable?: boolean;
  style?: StyleProp<any>;
}

export const SmallButton = ({
  text,
  onPress,
  backgroundColor = colors.orange,
  disable = false,
  style = undefined,
}: Props) => {
  return (
    <View
      style={{
        opacity: disable ? 0.5 : 1,
        ...style,
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
    height: 40,
    width: 100,
    marginVertical: spacing.paddingVertical / 3,
    marginHorizontal: spacing.paddingHorizontal / 2,
  },
  buttonText: {
    color: colors.white,
    fontSize: normalizeSize(15),
    textAlign: "center",
  },
});
