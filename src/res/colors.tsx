import { ColorValue } from "react-native";

export const colors = {
  gray: "#B2B3BB",
  yellow: "#FFBE66",
  orange: "#F55349",
  red: "#FF5150",
  blue: "#0076FF",
  darkBlue: "#4743FF",
  strongPink: "#FF255C",
  black: "#151515",
  strongBlack: "#181727",
  softBlack: "#221727",
  white: "#FFFFFF",
  lightBlue: "#E6F2FF",
  grayLight: "#ADADAD",
};

export const colorWithOpacity = (
  color: string,
  opacity: number
): ColorValue => {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  return "rgba(" + r + ", " + g + ", " + b + ", " + opacity.toString() + ")";
};
