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
import { useUser } from "../contexts/UserContext";
import Icon from "react-native-vector-icons/AntDesign";
import { useShopDetail } from "../contexts/ShopContext";

interface Props
  extends StackScreenProps<RootStackParams, "ProductDetailScreen"> {}

export const ProductDetailScreen = ({ navigation, route }: Props) => {
  const [shop] = useShopDetail();

  const { product } = route.params;
  const user = useUser();
  const [cart] = useCart();
  const [quantity, setQuantity] = useState(cart.unitsOf(product) + 1);
  const addProductToCart = async () => {
    await cart.add(product, quantity);
  };

  const editProduct = () => {
    navigation.navigate("EditProductScreen", { product });
  };

  useEffect(() => {
    if (user.isClient && cart.has(product)) {
      addProductToCart();
    }
  }, [quantity]);

  useEffect(() => {
    if (user.isClient) {
      setQuantity(cart.unitsOf(product) + 1);
    }
  }, [product]);

  useEffect(() => {
    if (user.isClient && !cart.has(product)) {
      setQuantity(0);
    }
  }, [cart]);

  useEffect(() => {
    if (product && product?.id && shop.products && user.isOwner) {
      const updatedProduct = shop.products.find((p) => p.id === product.id);
      if (product != updatedProduct) {
        console.log(updatedProduct);
        navigation.setParams({ product: updatedProduct });
      }
    }
  }, [shop]);

  return (
    <View
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
          borderWidth: 1,
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
          <Typography style={styles.productPrice}>$ {product.price}</Typography>
        </View>
        <View style={styles.productInfoFirstRowContainer}>
          <Typography style={styles.productDescription}>
            {product.description}
          </Typography>
          {product.qualification !== null && (
            <Score score={product.qualification}></Score>
          )}
        </View>

        {user.isOwner && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={editProduct}>
              <Icon name="edit" size={25} style={styles.buttonText}></Icon>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {user.isClient && (
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderColor: colorWithOpacity(colors.orange, 0.08),
    borderRadius: 10,
    width: "20%",
    backgroundColor: colors.orange,
    marginVertical: spacing.paddingVertical / 3,
  },
  buttonText: {
    color: colors.white,
    textAlign: "center",
  },
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
