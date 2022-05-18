import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { imageStyles } from "../../res/imageStyles";
import { BoldTypography, MediumTypography, SemiBoldTypography, ThinTypography, Typography } from "../../res/typography";
import { API_URL } from "../../services/config";
import Icon from "react-native-vector-icons/Ionicons";
import { colors, colorWithOpacity } from "../../res/colors";
import { spacing } from "../../res/spacing";

interface Props<T> {
  product: T;
  onDetails?: (product: T) => void;
  onCart?: (product: T) => void;
}

export const ProductPreview2 = ({ product, onDetails, onCart }: Props<any>) => {
  return (
    <View style={styles.productPreviewContainer}>
      <TouchableOpacity key={product.id} onPress={() => onDetails ? onDetails(product) : null} style={styles.productContainer}>
        <View style={styles.productImageContainer}>
          <Image
            source={{
              uri: `${API_URL}/products/${product.id}/image`,
            }}
            style={
              imageStyles.preview
            }
          ></Image>
        </View>
        <View style={styles.productInfoContainer}>
          <View style={styles.productInfoRowContainer}>
            <Typography style={styles.productName}>{product.name}</Typography>
          </View>
          <View style={styles.productInfoRowContainer}>
            <ThinTypography style={styles.productDescription}>{product.description}</ThinTypography>
          </View>
          <View style={styles.productInfoRowContainer}>
            <Typography style={styles.price}>
              $ {product.price}
            </Typography>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.shopCartContainer}>
      {onCart && (
        <TouchableOpacity style={styles.buttonContainer}>
          <Icon
            name="cart"
            size={25}
            style={styles.buttonText}
            onPress={() => onCart(product)}
          ></Icon>
        </TouchableOpacity>
      )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productPreviewContainer: {
    flexDirection: "row",
    paddingVertical: spacing.paddingVertical,
    alignItems:"center"
  },
  productContainer: {  
    flexDirection: "row",
    flex:2,
  },
  shopCartContainer:{
    width: 100,
  
  },
  productImageContainer:{
    flex:1,
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
  },
  price:{
      fontSize: 16,
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
  },
  buttonText: {
    color: colors.white,
    textAlign: "center",
  },
});
