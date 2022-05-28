import { StyleSheet } from "react-native";
import { colorWithOpacity, colors } from "./colors";
import { normalizeSize } from "./typography";
import { spacing } from "./spacing";

export const globalStyles = StyleSheet.create({
  inputContainer: {
    backgroundColor: colorWithOpacity(colors.black, 0.5),
    borderRadius: 10,
    borderColor: colors.blue,
    borderWidth: 1,
  },
  inputText: {
    color: colorWithOpacity(colors.white, 0.5),
    fontSize: normalizeSize(19),
  },
  generalContainer: {
    backgroundColor: colors.black,
    flex: 1,
  },
  drawerContainer: {
    backgroundColor: colors.black,
    flex: 1,
    padding: 5,
  },
  innerContainer: {
    paddingHorizontal: spacing.paddingHorizontal,
    paddingVertical: spacing.paddingVertical,
  },
  horizontalPadding: {
    paddingHorizontal: spacing.paddingHorizontal,
  },
  thinSeparator: {
    borderTopColor: colorWithOpacity(colors.grayLight, 0.5),
    borderTopWidth: 1,
  },
  sectionSpacing: {
    marginBottom: spacing.sectionSpacing,
  },
});
