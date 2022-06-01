import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { colors, colorWithOpacity } from "../../res/colors";
import { imageStyles } from "../../res/imageStyles";
import { spacing } from "../../res/spacing";
import { BoldTypography, Typography } from "../../res/typography";
import { orderDescription, orderImage, stateStr } from "../../services/order";

interface Props<T> {
  order: T;
  onDetails?: (_: T) => any;
}

export const OrderPreview = ({ order, onDetails }: Props<any>) => {
  const image = orderImage(order);
  const description = orderDescription(order);
  return (
    <View style={styles.orderPreviewContainer}>
      <TouchableOpacity
        key={order.id}
        style={styles.orderContainer}
        onPress={() => onDetails?.(order)}
      >
        <View style={styles.orderImageContainer}>
          <Image source={image} style={imageStyles.preview}></Image>
        </View>
        <View style={styles.orderInfoContainer}>
          <View style={styles.orderInfoRowContainer}>
            <BoldTypography># {order.id}</BoldTypography>
            <BoldTypography style={{ color: colors.orange }}>
              {stateStr[order.state]}
            </BoldTypography>
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
    flexDirection: "row",
    justifyContent: "space-evenly",
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
