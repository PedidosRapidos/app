import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { RootStackParams } from "../ui/navigation/Stack";
import { StackScreenProps } from "@react-navigation/stack";

import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../res/globalStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  BoldTypography,
  normalizeSize,
  SemiBoldTypography,
  Typography,
} from "../res/typography";
import { colors, colorWithOpacity } from "../res/colors";
import { spacing } from "../res/spacing";
import { imageStyles } from "../res/imageStyles";
import { API_URL } from "../services/config";
import { useCart } from "../contexts/CartContext";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Counter } from "../ui/components/Counter";
import { IconButton } from "../ui/components/IconButton";

interface Props
  extends StackScreenProps<RootStackParams, "ProductDetailScreen"> {}

const styles = StyleSheet.create({
  section: {
    color: colorWithOpacity(colors.white, 0.6),
    fontSize: normalizeSize(17),
    textDecorationLine: "underline",
  },
  sectionMarginBotton: {
    marginBottom: (spacing.inputSpacing * 2) / 6,
  },
  textSection: {
    fontSize: normalizeSize(17),
  },
  buttonContainer: {
    borderWidth: 5,
    borderColor: colorWithOpacity(colors.orange, 0.08),
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 100,
    height: "90%",
    width: "25%",
    backgroundColor: colors.orange,
    marginVertical: spacing.paddingVertical / 3,
    marginHorizontal: spacing.paddingHorizontal / 2,
  },
  buttonText: {
    color: colors.white,
    textAlign: "center",
  },
});

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

  return (
    <SafeAreaView style={globalStyles.generalContainer}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        style={globalStyles.innerContainer}
      >
        <View style={{ marginTop: "2%" }}>
          <BoldTypography
            style={[
              styles.textSection,
              styles.sectionMarginBotton,
              { fontSize: 40 },
            ]}
          >
            {product.name}
          </BoldTypography>
          <Image
            source={{
              uri: `${API_URL}/products/${product.id}/image`,
            }}
            style={{
              ...imageStyles.categorieIcon,
              width: "100%",
              height: 300,
              borderWidth: 2,
              borderRadius: 10,
              borderColor: colors.popupBackground,
              marginBottom: (spacing.inputSpacing * 2) / 6,
              marginTop: (spacing.inputSpacing * 2) / 6,
              alignSelf: "center",
            }}
          ></Image>
          <SemiBoldTypography
            style={[styles.textSection, styles.sectionMarginBotton]}
          >
            {product.description}
          </SemiBoldTypography>

          <Typography style={[styles.textSection, styles.sectionMarginBotton]}>
            $ {product.price}
          </Typography>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Counter counter={quantity} setCounter={setQuantity} />
            {!cart.has(product) ? (
              <IconButton
                name="cart-plus"
                size={25}
                onPress={addProductToCart}
              />
            ) : (
              <Typography style={{ flexDirection: "row" }}>
                Change Quantity
              </Typography>
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
