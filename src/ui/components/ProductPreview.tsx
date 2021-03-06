import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { imageStyles } from "../../res/imageStyles";
import { BoldTypography, Typography } from "../../res/typography";
import { imageURL } from "../../services/config";
import { IconButton } from "./IconButton";

interface Props<T> {
  product: T;
  onDetails: (product: T) => void;
  onCart?: (product: T) => void;
}

export const ProductPreview = ({ product, onDetails, onCart }: Props<any>) => {
  return (
    <TouchableOpacity key={product.id} onPress={() => onDetails(product)}>
      <View style={styles.rows}>
        <View style={{ ...styles.columns, ...styles.margin }}>
          <Image
            source={{
              uri: imageURL(product),
            }}
            style={{
              ...imageStyles.categorieIcon,
              ...styles.round,
              width: 200,
              height: 200,
            }}
          ></Image>
        </View>
        <View style={styles.columns}>
          <View style={{ flex: 3 }}>
            <Typography style={styles.padding}>{product.name}</Typography>
          </View>
          <BoldTypography style={{ fontSize: 30 }}>
            $ {product.price}
          </BoldTypography>
          {onCart && (
            <IconButton name="cart" size={25} onPress={() => onCart(product)} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rows: { display: "flex", flex: 1, flexDirection: "row" },
  columns: { display: "flex", flexDirection: "column" },
  margin: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  padding: {
    paddingVertical: 10,
  },
  round: {
    borderRadius: 10,
  },
});
