import React from "react";
import { Image, View } from "react-native";
import { colors } from "../../res/colors";
import { imageStyles } from "../../res/imageStyles";
import {
  Typography,
  SemiBoldTypography,
  normalizeSize,
} from "../../res/typography";
import { API_URL } from "../../services/config";
import { SmallButton } from "./SmallButton";

interface Props {
  shop: any;
}

export const ShopPreview = ({ shop }: Props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../res/img/store.png")}
          style={{
            ...imageStyles.categorieIcon,
            width: "35%",
            marginRight: "5%",
          }}
        ></Image>

        <View style={{ flexDirection: "column" }}>
          <SemiBoldTypography style={{ fontSize: normalizeSize(15) }}>
            {shop.name}
          </SemiBoldTypography>
          <Typography>{shop.address}</Typography>
        </View>
      </View>

      <View
        style={{
          flexDirection: "column",
          alignContent: "space-between",
        }}
      >
        <SmallButton
          text="Edit"
          onPress={() => {
            /*navigation.navigate("EditShopScreen", {
                sellerId: params.sellerId,
              });*/
          }}
          backgroundColor={colors.orange}
        />
        <SmallButton
          text="My products"
          onPress={() => {
            /*ACA VOY A LA PANTALLA DE PRODUCTOS*/
          }}
          backgroundColor={colors.orange}
        />
      </View>
    </View>
  );
};
