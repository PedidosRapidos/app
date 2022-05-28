import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { imageStyles } from "../../res/imageStyles";
import { Typography, sizes } from '../../res/typography';
import { API_URL } from "../../services/config";
import { colors, colorWithOpacity } from "../../res/colors";
import { spacing } from "../../res/spacing";
import { IconButton } from "./IconButton";
import { size } from "fp-ts/lib/ReadonlyRecord";

interface Props<T> {
  product: T;
  onDetails?: (product: T) => void;
  onCart?: (product: T) => void;
  onDelete?: (product: T) => void;
}

export const ProductPreview2 = ({
  product,
  onDetails,
  onCart,
  onDelete,
}: Props<any>) => {
  return (
    <View style={styles.productPreviewContainer}>
      <TouchableOpacity
        key={product.id}
        onPress={() => (onDetails ? onDetails(product) : null)}
        style={styles.productContainer}
      >
        <View style={styles.productImageContainer}>
          <Image
            source={{
              uri: `${API_URL}/products/${product.id}/image?q=${new Date()}`,
            }}
            style={imageStyles.preview}
          ></Image>
        </View>
        <View style={styles.productInfoContainer}>
          <View style={styles.productInfoRowContainer}>
            <Typography style={styles.productName}>{product.name}</Typography>
          </View>
          <View style={styles.productInfoRowContainer}>
            <Typography style={styles.productDescription} numberOfLines={2}>
              {product.description}
            </Typography>
          </View>
          <View style={styles.productInfoRowContainer}>
            <Typography style={styles.price}>$ {product.price}</Typography>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.shopCartContainer}>
        {onCart && (
          <IconButton
            name="cart-plus"
            size={25}
            onPress={() => onCart(product)}
          />
        )}
        {onDelete && (
          <IconButton
            name="backspace"
            size={25}
            onPress={() => onDelete(product)}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productPreviewContainer: {
    flexDirection: "row",
    paddingVertical: spacing.paddingVertical,
    alignItems: "center",
  },
  productContainer: {
    flexDirection: "row",
    flex: 2,
  },
  shopCartContainer: {
    width: 100,
  },
  productImageContainer: {
    flex: 1,
  },
  productInfoContainer: {
    marginHorizontal: spacing.paddingHorizontal,
    flex: 1,
  },
  productInfoRowContainer: {
    paddingVertical: spacing.textSpacing,
  },
  productName: {
    fontSize: sizes.productPreviewName,
  },
  productDescription: {
    color: colorWithOpacity(colors.grayLight, 1.0),
    fontSize: sizes.productDescription,
  },
  price: {
    fontSize: sizes.productDescription,
  },
});
