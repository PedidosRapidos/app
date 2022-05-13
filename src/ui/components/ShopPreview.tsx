import React from "react";
import { Image, View } from "react-native";
import { colors } from "../../res/colors";
import { imageStyles } from "../../res/imageStyles";
import { widthPercentageToDP } from "../../res/responsive";
import {
  Typography,
  SemiBoldTypography,
  normalizeSize,
} from "../../res/typography";
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
        marginBottom: "3%",
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
            width: "30%",
            marginRight: "5%",
          }}
        ></Image>

        <View style={{ flexDirection: "column" }}>
          <SemiBoldTypography
            style={{
              fontSize: normalizeSize(15),
              width: widthPercentageToDP("30"),
            }}
          >
            {shop.name}
          </SemiBoldTypography>
          <Typography style={{ width: widthPercentageToDP("30") }}>
            {shop.address}
          </Typography>
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
