import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { imageStyles } from "../../res/imageStyles";
import { BoldTypography, Typography } from "../../res/typography";
import { API_URL } from "../../services/config";
import Icon from "react-native-vector-icons/Ionicons";
import { colors, colorWithOpacity } from "../../res/colors";
import { spacing } from "../../res/spacing";

interface Props<T> {
  product: T;
  onDetails: (product: T) => void;
  onCart?: (product: T) => void;
}

export const ProductPreviewOwner = ({ product, onDetails, onCart }: Props<any>) => {
  return (
    <TouchableOpacity key={product.id} onPress={() => onDetails(product)}>
      <View style={styles.rows}>
        <View style={{ ...styles.columns, ...styles.margin }}>
          <Image
            source={{
              uri: `${API_URL}/products/${product.id}/image?q=${new Date()}`,
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
          <View style={styles.productInfo}>
            <Typography style={styles.padding}>{product.name}</Typography>
          </View>
          <View style={styles.productInfo}>
            <Typography style={styles.padding}>{product.description}</Typography>
          </View>
          <BoldTypography style={styles.price}>
            $ {product.price}
          </BoldTypography>
          {onCart ? 
          (<View style={styles.buttonContainer}>
            <Icon
              name="cart"
              size={25}
              style={styles.buttonText}
              onPress={() => onCart(product)}
            ></Icon>
            </View>
            ): (null)
            }
          
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
  buttonContainer: {
    borderWidth: 5,
    borderColor: colorWithOpacity(colors.orange, 0.08),
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 15,
    height: 40,
    width: 100,
    backgroundColor: colors.orange,
    marginVertical: spacing.paddingVertical / 3,
    marginHorizontal: spacing.paddingHorizontal / 2,
  },
  buttonText: {
    color: colors.white,
    textAlign: "center",
  },
  productInfo: {
    flex: 3,
  },
  price:{
      fontSize: 30,
  }
});
