import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { colors, colorWithOpacity } from "../../res/colors";

export const BackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={() => navigation.goBack()}
    >
      <Icon
        name="arrow-back-outline"
        size={25}
        color={colors.orange}
        style={{ left: 3 }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colorWithOpacity(colors.orange, 0.08),
    padding: 10,
    borderRadius: 22,
    aspectRatio: 1,
    width: 50,
    alignContent: "center",
    justifyContent: "center",
  },
});
