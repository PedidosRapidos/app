import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { colors } from "../../res/colors";
import { imageStyles } from "../../res/imageStyles";
import { widthPercentageToDP } from "../../res/responsive";
import {
  Typography,
  SemiBoldTypography,
  normalizeSize,
} from "../../res/typography";
import client from "../../services/config";
import { SmallButton } from "./SmallButton";

interface Props<T> {
  order: any;
}

export const OrderPreviewOwner = ({ order }: Props<any>) => {
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const states = [
    "TO_CONFIRM",
    "CONFIRMED",
    "IN_PREPARATION",
    "UNDER_WAY",
    "DELIVERED",
    "CANCELLED",
  ];
  const buttonText = [
    "Confirm",
    "Prepare",
    "Deliver",
    "End",
    "Finished",
    "Cancelled",
  ];
  useEffect(() => {
    console.log("refreshing page");
  }, [index]);

  const confirmOrder = async (order: any) => {
    setIsLoading(true);
    try {
      await client.patch(`/orders/${order.id}/`, {
        new_state: states[index + 1],
      });
      setIndex(index + 1);
    } catch (err: any) {
      console.error(
        "Request failed, response:",
        err.response?.data || err.message || err
      );
    } finally {
      setIsLoading(false);
    }
  };

  const cancelOrder = async (order: any) => {
    setIsLoading(true);
    try {
      await client.patch(`/orders/${order.id}/`, {
        new_state: states[5],
      });
      setIndex(5);
    } catch (err: any) {
      console.error(
        "Request failed, response:",
        err.response?.data || err.message || err
      );
    } finally {
      setIsLoading(false);
    }
  };
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
          source={require("../../res/img/order.png")}
          style={{
            ...imageStyles.categorieIcon,
            width: "25%",
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
            Payment: {order.payment_method}
          </Typography>
        </View>
      </View>

      <View
        style={{
          flexDirection: "column",
          alignContent: "space-between",
        }}
      >
        {index < 4 ? (
          <SmallButton
            text={buttonText[index]}
            onPress={() => {
              confirmOrder(order);
            }}
            backgroundColor={colors.orange}
          />
        ) : null}
        {index < 2 ? (
          <SmallButton
            text="Reject"
            onPress={() => {
              cancelOrder(order);
            }}
            backgroundColor={colors.orange}
          />
        ) : null}
        {index >= 4 ? <Typography>{buttonText[index]}</Typography> : null}
      </View>
    </View>
  );
};
