import React from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { RootStackParams } from "../../ui/navigation/Stack";
import { StackScreenProps } from "@react-navigation/stack";

import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../res/globalStyles";
import {
  BoldTypography,
  normalizeSize,
  SemiBoldTypography,
  Typography,
} from "../../res/typography";
import { colors, colorWithOpacity } from "../../res/colors";
import { spacing } from "../../res/spacing";
import { imageStyles } from "../../res/imageStyles";
import { orderDescription, orderImage, stateStr } from "../../services/order";
import { SectionContainer } from "../../ui/components/SectionContainer";
import { SectionTitle } from "../../ui/components/SectionTitle";
import { MainButton } from "../../ui/components/MainButton";
import { Product, useCart } from "../../contexts/CartContext";
import client from "../../services/config";

interface Props
  extends StackScreenProps<RootStackParams, "OrderDetailScreen"> { }

export const OrderDetailScreen = ({ navigation, route }: Props) => {
  const { order } = route.params;
  const description = orderDescription(order);
  const image = orderImage(order);
  const [cart] = useCart();

  const navigateToOrderProductsScreen = () => {
    navigation.navigate({ name: "OrderProductsScreen", params: { order: order } })
  }

  const orderAgain = async () => {

    /* for (var i = cart.products.length - 1; i >= 0; i--) {
      let product = cart.products[i]
      await cart.remove(product, product.quantity)
    }

    for (const prod of order.cart.products) {
      await cart.add(prod, prod.quantity)
    } */

    await cart.replace(order.cart.id)
    navigation.navigate("CheckOutScreen", { order: order })
  }

  return (
    <View style={globalStyles.generalContainer}>
      <ScrollView style={globalStyles.innerContainer}>
        <SectionContainer>
          <View style={styles.row}>
            <Image source={image} style={styles.image} />
            <BoldTypography style={[styles.textSection, { fontSize: 20 }]}>
              # {order.id} {"  "}
            </BoldTypography>
            <SemiBoldTypography style={[{ fontSize: 18 }]}>
              {description}
            </SemiBoldTypography>
          </View>
        </SectionContainer>
        <SectionContainer>
          <Typography style={[styles.textSection, { fontSize: 20 }]}>
            Status: {stateStr[order.state]}
          </Typography>
          <Typography style={[styles.textSection, { fontSize: 20 }]}>
            Payment Method: {order.payment_method}
          </Typography>
          <Typography style={[styles.textSection, { fontSize: 20 }]}>
            Send to: {order.address}
          </Typography>
        </SectionContainer>
        <SectionContainer>
          <MainButton
            text="View order products"
            onPress={navigateToOrderProductsScreen}
          />
          {order.state == "DELIVERED" ? (
            <MainButton
              text="Order again"
              onPress={orderAgain}
            />
          ) : null}
        </SectionContainer>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    color: colorWithOpacity(colors.white, 0.6),
    fontSize: normalizeSize(17),
    textDecorationLine: "underline",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
    ...imageStyles.categorieIcon,
    height: 100,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: colors.popupBackground,
    paddingVertical: 2,
    paddingHorizontal: 2,
  },
  sectionMarginBotton: {
    marginBottom: (spacing.inputSpacing * 2) / 6,
  },
  textSection: {
    fontSize: normalizeSize(17),
  },
});
