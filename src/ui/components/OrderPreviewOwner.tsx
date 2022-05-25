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

interface Props<T> {
  order: any;
  onPressConfirm?: (shop: T) => void;
  onPressCancel?: (shop: T) => void;
}

export const OrderPreviewOwner = ({
  order,
  onPressConfirm,
  onPressCancel,
}: Props<any>) => {
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
            {order.id}
          </SemiBoldTypography>
          <Typography style={{ width: widthPercentageToDP("30") }}>
            Productos: 10
          </Typography>
          <Typography style={{ width: widthPercentageToDP("30") }}>
            Total: $150
          </Typography>
        </View>
      </View>

      <View
        style={{
          flexDirection: "column",
          alignContent: "space-between",
        }}
      >
        {onPressConfirm ? (
          <SmallButton
            text="Confirm"
            onPress={() => {
              onPressConfirm(order);
            }}
            backgroundColor={colors.orange}
          />
        ) : null}
        {onPressCancel ? (
          <SmallButton
            text="Reject"
            onPress={() => {
              onPressCancel(order);
            }}
            backgroundColor={colors.orange}
          />
        ) : null}
      </View>
    </View>
  );
};
