import React from "react";
import { Image, View, StyleSheet,TouchableOpacity } from "react-native";
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


export const ShopViewClient = ({
  shop,
  onPressMyProducts,
}: Props<any>) => {
  return (
   <TouchableOpacity key={shop.id} onPress={() => onPressMyProducts(shop)}>
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
    </View>
   </TouchableOpacity>
  );
};
