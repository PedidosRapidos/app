import { StyleSheet } from "react-native";
import { colorWithOpacity, colors } from "./colors";
import { normalizeSize } from "./typography";
import { spacing } from "./spacing";
import { heightPercentageToDP } from "./responsive";

export const imageStyles = StyleSheet.create({
  logo: {
    opacity: 0.98,
    aspectRatio: 1,
    height: heightPercentageToDP("9%"),
    marginBottom: "5%",
    alignSelf: "center",
  },
  categorieIcon: {
    opacity: 0.98,
    aspectRatio: 1,
    height: heightPercentageToDP("9%"),
    marginBottom: "5%",
  },
});
