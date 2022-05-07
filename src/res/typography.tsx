import { Dimensions, PixelRatio } from "react-native";

const { width, height } = Dimensions.get("window");
const scale = width / 411;
const scaleHeight = height / 822;

export const normalizeSize = (size: number) => {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const HeightNormalizeSize = (size: number) => {
  const newSize = size * scaleHeight;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
