import React from "react";
import { Image, View, StyleSheet } from "react-native";
import { colors, colorWithOpacity } from "../../res/colors";
import { imageStyles } from "../../res/imageStyles";
import { widthPercentageToDP } from "../../res/responsive";
import {
  Typography,
  SemiBoldTypography,
  normalizeSize,
} from "../../res/typography";
import { SmallButton } from "./SmallButton";
import { sizes } from "../../res/typography";
import { spacing } from "../../res/spacing";

interface Props<T> {
  shop: any;
  onPressMyProducts?: (shop: T) => void;
  onPressEdit?: (shop: T) => void;
  onPressSeeOrders?: (shop: T) => void;
}

const styles = StyleSheet.create({
  shopPreview: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "3%",
  },
  shopImage: {
    width: "30%",
    marginRight: "5%",
    backgroundColor: colorWithOpacity(colors.orange, 0.2),
  },
  shopInfo: {
    width: "30%",
  },
  shopName: {
    fontSize: sizes.productPreviewName,
    paddingVertical: spacing.textSpacing,
  },
  productDescription: {
    fontSize: sizes.productDescription,
    color: colorWithOpacity(colors.grayLight, 1.0),
    paddingVertical: spacing.textSpacing,
  },
});

export const ShopPreview = ({
  shop,
  onPressMyProducts,
  onPressEdit,
  onPressSeeOrders,
}: Props<any>) => {
  return (
    <View style={styles.shopPreview}>
      <Image
        source={require("../../res/img/store.png")}
        style={{
          ...imageStyles.preview,
          ...styles.shopImage,
        }}
      ></Image>

      <View style={styles.shopInfo}>
        <Typography style={styles.shopName}>{shop.name}</Typography>
        <Typography style={styles.productDescription}>
          {shop.address}
        </Typography>
      </View>
      <View>
        {onPressSeeOrders ? (
          <SmallButton
            text="See orders"
            onPress={() => {
              onPressSeeOrders(shop);
            }}
            backgroundColor={colors.orange}
          />
        ) : null}

        {onPressMyProducts ? (
          <SmallButton
            text="My products"
            onPress={() => {
              onPressMyProducts(shop);
            }}
            backgroundColor={colors.orange}
          />
        ) : null}
      </View>
    </View>
  );
};
