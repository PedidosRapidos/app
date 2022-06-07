import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { imageStyles } from "../../res/imageStyles";
import { Typography, sizes } from "../../res/typography";
import { imageURL } from "../../services/config";
import { colors, colorWithOpacity } from "../../res/colors";
import { spacing } from "../../res/spacing";
import { IconButton } from "./IconButton";
import { size } from "fp-ts/lib/ReadonlyRecord";
import { Score } from "./Score";
import { Counter } from "./Counter";
import { useCart } from "../../contexts/CartContext";

interface Props<T> {
  product: T;
  removePreview?: (product: T) => void;
  onDetails?: (product: T) => void;
  onCart?: (product: T) => void;
  onDelete?: (product: T) => void;
  onReview?: (product: T) => void;
}

export const ProductPreview2 = ({
  product,
  removePreview,
  onDetails,
  onCart,
  onDelete,
  onReview,
}: Props<any>) => {
  const [cart] = useCart();
  const [isAdded, setIsAdded] = useState(cart.has(product));
  const [quantity, setQuantity] = useState(1);

  const addProductToCart = async () => {
    cart.setUnits(product, quantity);
    await cart.add(product, quantity);
  };

  useEffect(() => {
    if (cart.has(product)) {
      addProductToCart();
    }
  }, [quantity]);

  useEffect(() => {
    const isInCart = cart.has(product);
    setIsAdded(isInCart);
    if (isInCart) {
      setQuantity(cart.unitsOf(product) + 1);
    }
  }, [cart.has(product)]);

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
            <Typography style={styles.price}>$ {product.price}</Typography>

            {product.qualification !== null && (
              <Score score={product.qualification}></Score>
            )}
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.shopCartContainer}>
        {onCart && (
          <>
            {!isAdded && (
              <IconButton
                name="cart-plus"
                mat
                size={25}
                onPress={() => {
                  onCart(product);
                  setIsAdded(true);
                }}
              />
            )}
            {isAdded && (
              <View>
                <View style={{ marginBottom: "10%", marginLeft: "5%" }}>
                  <Counter
                    counter={quantity}
                    setCounter={setQuantity}
                    buttonsStyles={{
                      maxWidth: "70%",
                      borderRadius: 10,
                      height: 35,
                    }}
                  />
                </View>

                {removePreview && (
                  <IconButton
                    name="cart-remove"
                    mat
                    size={25}
                    onPress={() => {
                      removePreview(product);
                      setIsAdded(false);
                    }}
                  />
                )}
              </View>
            )}
          </>
        )}
        {onDelete && (
          <View>
            <View style={{ marginBottom: "10%", marginLeft: "5%" }}>
              <Counter
                counter={quantity}
                setCounter={setQuantity}
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
        {onReview && (
          <IconButton name="star" size={25} onPress={() => onReview(product)} />
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
    flexDirection: "row",
    justifyContent: "space-between",
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
