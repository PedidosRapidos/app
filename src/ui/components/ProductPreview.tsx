import React from "react";
import { Image, View } from "react-native";
import { imageStyles } from "../../res/imageStyles";
import { Typography } from "../../res/typography";
import { API_URL } from "../../services/config";
import { SmallButton } from "./SmallButton";

interface Props {
  product: any;
  onPress: (e: any) => void;
}

export const ProductPreview = ({ product, onPress }: Props) => {
  return (
    <View>
      <Image
        source={{
          uri: `${API_URL}/products/${product.id}/image?q=${new Date()}`,
        }}
        style={{ ...imageStyles.categorieIcon, width: 305, height: 159 }}
      ></Image>
      <Typography>{product.name}</Typography>
      <Typography>{product.price}</Typography>
      <SmallButton onPress={onPress} text="+" />
    </View>
  );
};
