import {
  Dimensions,
  PixelRatio,
  TextProps,
  Animated,
  StyleSheet,
} from "react-native";
import {
  FiraSans_100Thin,
  FiraSans_100Thin_Italic,
  FiraSans_200ExtraLight,
  FiraSans_200ExtraLight_Italic,
  FiraSans_300Light,
  FiraSans_300Light_Italic,
  FiraSans_400Regular,
  FiraSans_400Regular_Italic,
  FiraSans_500Medium,
  FiraSans_500Medium_Italic,
  FiraSans_600SemiBold,
  FiraSans_600SemiBold_Italic,
  FiraSans_700Bold,
  FiraSans_700Bold_Italic,
  FiraSans_800ExtraBold,
  FiraSans_800ExtraBold_Italic,
  FiraSans_900Black,
  FiraSans_900Black_Italic,
} from "@expo-google-fonts/fira-sans";
import WithAnimatedObject = Animated.WithAnimatedObject;
import { colors } from "./colors";

export const fonts = {
  FiraSansThin: FiraSans_100Thin,
  FiraSansThinItalic: FiraSans_100Thin_Italic,
  FiraSansELight: FiraSans_200ExtraLight,
  FiraSansELightItalic: FiraSans_200ExtraLight_Italic,
  FiraSansLight: FiraSans_300Light,
  FiraSans_300Light_Italic,
  FireSansRegular: FiraSans_400Regular,
  FireSansRegularItalic: FiraSans_400Regular_Italic,
  FiraSans_500Medium,
  FiraSans_500Medium_Italic,
  FiraSans_600SemiBold,
  FiraSans_600SemiBold_Italic,
  FiraSans_700Bold,
  FiraSans_700Bold_Italic,
  FiraSans_800ExtraBold,
  FiraSans_800ExtraBold_Italic,
  FiraSans_900Black,
  FiraSans_900Black_Italic,
};
const { width, height } = Dimensions.get("window");
const scale = width / 411;
const scaleHeight = height / 822;

export const ThinTypography = (props: WithAnimatedObject<TextProps>) => {
  return (
    <Animated.Text
      {...props}
      style={[styles.text, props.style, { fontFamily: "FiraSansThin" }]}
    />
  );
};

export const Typography = (props: WithAnimatedObject<TextProps>) => {
  return (
    <Animated.Text
      {...props}
      style={[styles.text, props.style, { fontFamily: "FireSansRegular" }]}
    />
  );
};

export const MediumTypography = (props: WithAnimatedObject<TextProps>) => {
  return (
    <Animated.Text
      {...props}
      style={[styles.text, props.style, { fontFamily: "FiraSans_500Medium" }]}
    />
  );
};

export const BoldTypography = (props: WithAnimatedObject<TextProps>) => {
  return (
    <Animated.Text
      {...props}
      style={[styles.text, props.style, { fontFamily: "FiraSans_700Bold" }]}
    />
  );
};

export const SemiBoldTypography = (props: WithAnimatedObject<TextProps>) => {
  return (
    <Animated.Text
      {...props}
      style={[styles.text, props.style, { fontFamily: "FiraSans_600SemiBold" }]}
    />
  );
};

export const normalizeSize = (size: number) => {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const HeightNormalizeSize = (size: number) => {
  const newSize = size * scaleHeight;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const styles = StyleSheet.create({
  text: {
    color: colors.white,
  },
});
