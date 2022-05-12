import React from "react";
import { Image, View } from "react-native";
import { imageStyles } from "../../res/imageStyles";
import { Typography } from "../../res/typography";
import { API_URL } from "../../services/config";

interface Props {
  shop: any;
}

export const ShopPreview = ({ shop }: Props) => {
  return (
    <View>
      <Image
        source={require("../res/img/logo.png")}
        style={{ ...imageStyles.categorieIcon, width: "5%" }}
      ></Image>
      <Typography>{shop.name}</Typography>
      <Typography>{shop.adress}</Typography>
    </View>
  );
};
