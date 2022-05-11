import React from "react";
import { Image, View } from "react-native";
import { imageStyles } from "../../res/imageStyles";
import { Typography } from "../../res/typography";
import { API_URL } from "../../services/config";

interface Props {
  product: any;
}

export const ProductPreview = ({ product }: Props) => {
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
    </View>
  );
};
