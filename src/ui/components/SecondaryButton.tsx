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
}

export const SecondaryButton = ({
  text,
  onPress,
  disable = false,
}: Props) => {
  return (
    <View
      style={{
        opacity: disable ? 0.5 : 1,
      }}
    >
      <TouchableOpacity
        style={{...styles.leftJustified, ...styles.buttonContainer}}
        onPress={disable ? () => {} : onPress}
        >
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  leftJustified:{
    alignContent: "flex-start",
    justifyContent: "flex-start",
  },
  centered:{
    alignContent: "flex-start",
    justifyContent: "flex-start",
  },
    buttonContainer: {
    height: 60,
  },
  buttonText: {
    color: colorWithOpacity(colors.blue, 0.8) ,
    fontSize: normalizeSize(17),
    //textAlign: "center",
  },
});
