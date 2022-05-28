import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { RootStackParams } from "../ui/navigation/Stack";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../res/globalStyles";
import {
  normalizeSize,
  Typography,
} from "../res/typography";
import { colors, colorWithOpacity } from "../res/colors";
import { spacing } from "../res/spacing";
import { API_URL } from "../services/config";
import { useCart } from "../contexts/CartContext";
import { Counter } from "../ui/components/Counter";
import { IconButton } from "../ui/components/IconButton";
import { sizes } from "../res/typography";

interface Props
  extends StackScreenProps<RootStackParams, "ProductDetailScreen"> {}

export const ProductDetailScreen = ({ navigation, route }: Props) => {
  const { product } = route.params;
  const [cart] = useCart();
  const [quantity, setQuantity] = useState(1);
  const addProductToCart = () => {
    cart.add(product, quantity);
  };

  useEffect(() => {
    if (cart.has(product)) {
      cart.add(product, quantity);
    }
  }, [quantity]);

  useEffect(() => {
    setQuantity(product.quantity || 1);
  }, [product]);

  return (
    <SafeAreaView
      style={{
        ...globalStyles.generalContainer,
        ...globalStyles.innerContainer,
      }}
    >
      <Image
        source={{
          uri: `${API_URL}/products/${product.id}/image`,
        }}
        style={{
          width: "100%",
          height: 300,
          borderColor: colors.popupBackground,
          marginBottom: (spacing.inputSpacing * 2) / 6,
          marginTop: (spacing.inputSpacing * 2) / 6,
          alignSelf: "center",
        }}
      ></Image>

      <View
        style={{
          ...styles.productInfoContainer,
          ...globalStyles.bottomThinSeparator,
        }}
      >
        <View style={styles.productInfoFirstRowContainer}>
          <Typography style={styles.productName}>{product.name}</Typography>
          <Typography style={styles.productPrice}>$ {product.price}</Typography>
        </View>
        <Typography style={styles.productDescription}>
          {product.description}
        </Typography>
      </View>

      <View style={styles.addProductContainer}>
        <Counter style={styles.counterContainer} counter={quantity} setCounter={setQuantity} />
        <IconButton style={[styles.cartContainer , cart.has(product) ? styles.disabled : {}  ]}name="cart-plus" size={25} onPress={!cart.has(product) ? addProductToCart : () => {}} />
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  productInfoContainer: {
    marginBottom: spacing.sectionSpacing,
  },
  productInfoFirstRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productName: {
    fontSize: normalizeSize(sizes.productName),
    marginBottom: spacing.textSpacing,
  },
  productPrice: {
    fontSize: normalizeSize(sizes.productDescription),
  },
  productDescription: {
    fontSize: normalizeSize(sizes.productDescription),
    color: colorWithOpacity(colors.grayLight, 1.0),
  },
  addProductContainer: {
    flexDirection: "row",
    backgroundColor: colors.orange
  },
  counterContainer:{
    flex:1,
  },
  cartContainer:{
    flex:1,
  },
  disabled:{
    opacity: 0.2,
  },

});
