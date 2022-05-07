import { PixelRatio, Dimensions } from "react-native";

export const { height, width } = Dimensions.get("window");

const SQUARE_SIZE = width / 45;
export const widthSquares = (n: number) => {
  return n * SQUARE_SIZE;
};

const SQUARE_SIZE_HEIGHT = height / 85;

export const heightSquares = (n: number) => {
  return n * SQUARE_SIZE_HEIGHT;
};

export const widthPercentageToDP = (widthPercent: string) => {
  const elemWidth =
    typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);

  return PixelRatio.roundToNearestPixel((width * elemWidth) / 100);
};

export const heightPercentageToDP = (heightPercent: string) => {
  const elemHeight =
    typeof heightPercent === "number"
      ? heightPercent
      : parseFloat(heightPercent);

  return PixelRatio.roundToNearestPixel((height * elemHeight) / 100);
};
