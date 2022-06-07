import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { RootStackParams } from "../ui/navigation/Stack";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../res/globalStyles";
import { normalizeSize, Typography } from "../res/typography";
import { colors, colorWithOpacity } from "../res/colors";
import { spacing } from "../res/spacing";
import { imageURL } from "../services/config";
import { useCart } from "../contexts/CartContext";
import { Counter } from "../ui/components/Counter";
import { IconButton } from "../ui/components/IconButton";
import { sizes } from "../res/typography";
import { Score } from "../ui/components/Score";
import { has } from "fp-ts/lib/ReadonlyRecord";

interface Props
  extends StackScreenProps<RootStackParams, "ProductDetailScreen"> {}

export const ProductDetailScreen = ({ navigation, route }: Props) => {
  const { product } = route.params;
  const [cart] = useCart();
  const [quantity, setQuantity] = useState(cart.unitsOf(product) + 1);

  const addProductToCart = async () => {
    await cart.add(product, quantity);
  };

  useEffect(() => {
    if (cart.has(product)) {
      addProductToCart();
    }
  }, [quantity]);

  useEffect(() => {
    setQuantity(cart.unitsOf(product) + 1);
  }, [product]);

  useEffect(() => {
    if (!cart.has(product)) {
      setQuantity(0);
    }
  }, [cart]);

  console.log(product);
  return (
    <SafeAreaView
      style={{
        ...globalStyles.generalContainer,
        ...globalStyles.innerContainer,
      }}
    >
      <Image
        source={{
          uri: imageURL(product),
        }}
        style={{
          width: "100%",
          height: 300,
          borderColor: colors.popupBackground,
          marginBottom: (spacing.inputSpacing * 2) / 6,
          marginTop: (spacing.inputSpacing * 2) / 6,
          alignSelf: "center",
          borderRadius: 10,
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
          {product.qualification !== null && (
            <Score score={product.qualification + 5}></Score>
          )}
        </View>
        <View style={styles.productInfoFirstRowContainer}>
          <Typography style={styles.productDescription}>
            {product.description}
          </Typography>
        </View>
        <View>
          <Typography style={styles.productPrice}>$ {product.price}</Typography>
        </View>
      </View>

      <View style={styles.addProductContainer}>
        <View style={{ flex: 5 }}>
          <Counter
            counter={quantity}
            setCounter={setQuantity}
            buttonsStyles={{ maxWidth: "70%", borderRadius: 10 }}
          />
        </View>

        <View style={{ flex: 2 }}>
          <IconButton
            style={[cart.has(product) ? styles.disabled : {}]}
            name="cart-plus"
            size={25}
            onPress={!cart.has(product) ? addProductToCart : () => {}}
          />
        </View>
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
    fontSize: normalizeSize(sizes.productPrice),
    textAlign: "right",
    marginRight: "5%",
    marginTop: "5%",
  },
  productDescription: {
    fontSize: normalizeSize(sizes.productDescription),
    color: colorWithOpacity(colors.grayLight, 1.0),
  },
  addProductContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  disabled: {
    opacity: 0.2,
  },
});
