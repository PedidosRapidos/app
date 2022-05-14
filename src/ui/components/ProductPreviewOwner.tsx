import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { imageStyles } from "../../res/imageStyles";
import { BoldTypography, MediumTypography, SemiBoldTypography, ThinTypography, Typography } from "../../res/typography";
import { API_URL } from "../../services/config";
import Icon from "react-native-vector-icons/Ionicons";
import { colors, colorWithOpacity } from "../../res/colors";
import { spacing } from "../../res/spacing";
import { height, heightPercentageToDP } from "../../res/responsive";

interface Props<T> {
  product: T;
  onDetails: (product: T) => void;
  onCart?: (product: T) => void;
}

export const ProductPreviewOwner = ({ product, onDetails, onCart }: Props<any>) => {
  return (
    <TouchableOpacity key={product.id} onPress={() => onDetails(product)}>
      <View style={styles.productPreviewContainer}>
        <View style={styles.productImageContainer}>
          <Image
            source={{
              uri: `${API_URL}/products/${product.id}/image?q=${new Date()}`,
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
          {onCart ? (
          <View style={styles.buttonContainer}>
            <Icon
              name="cart"
              size={25}
              style={styles.buttonText}
              onPress={() => onCart(product)}
            ></Icon>
          </View>
            ):(null)
          }
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productPreviewContainer: {  
    flexDirection: "row",
    marginVertical: spacing.paddingVertical,
    //borderWidth: 1,
    //borderColor: "white", 
  },
  productImageContainer:{
    flex:1,
  },
  productInfoContainer: { 
    marginHorizontal: spacing.paddingHorizontal,
    flex: 2, 
  },
  margin: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  padding: {
    paddingVertical: 10,
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
    marginVertical: spacing.paddingVertical / 3,
    marginHorizontal: spacing.paddingHorizontal / 2,
  },
  buttonText: {
    color: colors.white,
    textAlign: "center",
  },
});
