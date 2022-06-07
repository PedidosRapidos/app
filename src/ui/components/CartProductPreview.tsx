import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { imageStyles } from "../../res/imageStyles";
import { Typography } from "../../res/typography";
import { imageURL } from "../../services/config";
import { colors, colorWithOpacity } from "../../res/colors";
import { spacing } from "../../res/spacing";
import { IconButton } from "./IconButton";
import { Counter } from "./Counter";

interface Props<T> {
  product: T;
  onDetails?: (product: T) => void;
  onCart?: (product: T) => void;
  onDelete?: (product: T) => void;
  onAdd?: () => void;
}

export const CartProductPreview = ({
  product,
  onDetails,
  onDelete,
  onAdd,
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
              uri: imageURL(product),
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
            <Typography style={styles.price}>
              $ {product.price} x {product.quantity || 1} ={" "}
              {product.price * product.quantity}
            </Typography>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.shopCartContainer}>
        {onDelete && (
          <View>
            <View style={{ marginBottom: "10%", marginLeft: "5%" }}>
              <Counter
                counter={product.quantity}
                setCounter={onAdd}
                buttonsStyles={{
                  maxWidth: "70%",
                  borderRadius: 10,
                  height: 35,
                }}
              />
            </View>

            <IconButton
              name="cart-remove"
              mat
              size={25}
              onPress={() => onDelete(product)}
            />
          </View>
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
    fontSize: 20,
  },
  productDescription: {
    color: colorWithOpacity(colors.grayLight, 1.0),
    fontSize: 16,
    fontWeight: "100",
  },
  price: {
    fontSize: 16,
  },
});
