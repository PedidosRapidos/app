import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ColorValue,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle
} from "react-native";
import { colors, colorWithOpacity } from "../../res/colors";
import { normalizeSize } from "../../res/typography";

interface Props {
  text: string;
  onPress: () => void | Promise<any>;
  backgroundColor?: ColorValue;
  disable?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const MainButton = ({
  text,
  onPress,
  disable = false,
  style,
  textStyle

}: Props) => {
  return (
    <View
      style={{
        opacity: disable ? 0.5 : 1,
      }}
    >
      <TouchableOpacity
        style={[
          styles.buttonContainer, style
        ]}
        onPress={disable ? () => {} : onPress}
      >
        <Text style={[styles.buttonText, textStyle]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 4,
    borderWidth: 1,
    borderColor: colorWithOpacity(colors.orange, 0.08),
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 15,
    height: 56,
    backgroundColor: colors.orange
  },
  buttonText: {
    color: colors.white,
    fontSize: normalizeSize(17),
    textAlign: "center",
  },
});
