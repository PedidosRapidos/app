import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { colors, colorWithOpacity } from "../../res/colors";
import { imageStyles } from "../../res/imageStyles";
import { spacing } from "../../res/spacing";
import { BoldTypography, Typography } from "../../res/typography";
import { API_URL } from "../../services/config";

interface Props<T> {
  order: T;
}
const noImage = require("../../../assets/noimage.png");

const orderImage = (order: any) => {
  const products = order.cart?.products;
  const productId = products && products.length > 0 ? products[0].id : null;
  return productId
    ? { uri: `${API_URL}/products/${productId}/image` }
    : noImage;
};

const orderDescription = (order: any): string => {
  const products = order.cart?.products || [];
  const description = products
    .map(({ name }: any) => name as string)
    .reduce((acc: string, name: string) => `${acc}, ${name}`);
  return description || "...";
};

export const OrderPreview = ({ order }: Props<any>) => {
  const image = orderImage(order);
  const description = orderDescription(order);
  return (
    <View style={styles.orderPreviewContainer}>
      <TouchableOpacity key={order.id} style={styles.orderContainer}>
        <View style={styles.orderImageContainer}>
          <Image source={image} style={imageStyles.preview}></Image>
        </View>
        <View style={styles.orderInfoContainer}>
          <View style={styles.orderInfoRowContainer}>
            <BoldTypography># {order.id}</BoldTypography>
          </View>
          <View style={styles.orderInfoRowContainer}>
            <Typography style={styles.orderDescription} numberOfLines={2}>
              {description}
            </Typography>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.actionsContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  orderPreviewContainer: {
    flexDirection: "row",
    paddingVertical: spacing.paddingVertical,
    alignItems: "center",
  },
  orderContainer: {
    flexDirection: "row",
    flex: 2,
  },
  actionsContainer: {
    width: 100,
    justifyContent: "space-between",
    alignContent: "space-between",
  },
  orderImageContainer: {
    flex: 1,
  },
  orderInfoContainer: {
    marginHorizontal: spacing.paddingHorizontal,
    flex: 1,
  },
  orderInfoRowContainer: {
    paddingVertical: spacing.textSpacing,
  },
  orderName: {
    fontSize: 20,
  },
  orderDescription: {
    color: colorWithOpacity(colors.grayLight, 1.0),
    fontSize: 16,
    fontWeight: "100",
  },
});
