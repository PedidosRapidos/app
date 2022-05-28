import React from "react";
import { FlatList, View, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../res/globalStyles";
import { SectionTitle } from "../../ui/components/SectionTitle";
import { SectionContainer } from "../../ui/components/SectionContainer";
import { RootStackParams } from "../../ui/navigation/Stack";
import { StackScreenProps } from "@react-navigation/stack";
import { Product, useCart } from "../../contexts/CartContext";
import { CartProductPreview } from "../../ui/components/CartProductPreview";
import { BoldTypography } from "../../res/typography";
import { MainButton } from "../../ui/components/MainButton";

interface Props extends StackScreenProps<RootStackParams, "CartScreen"> {}

export const CartScreen = ({ navigation }: Props) => {
  const [cart] = useCart();
  const products = cart?.products || [];

  const total = products
    .map(({ price, quantity }: Product) => price * quantity)
    .reduce((acc, v) => acc + v, 0);
  
  const displayProductDetails = (item: any) => {
    navigation.navigate("ProductDetailScreen", {
      product: item,
    });
  };

  const navigateToPaymentMethodsScreen = () => {
    navigation.navigate("CheckOutScreen")
  }

  return (
    <SafeAreaView
      style={{
        ...globalStyles.generalContainer,
        padding: 15,
      }}
    >
      <SectionContainer>
        <SectionTitle text="My Shopping Cart" />
      </SectionContainer>
      <FlatList
        style={{ flex: 1 }}
        renderItem={({ item: product }) => (
          <CartProductPreview
            product={product}
            onDetails={displayProductDetails}
            onDelete={cart.remove}
          />
        )}
        data={products}
        keyExtractor={(product, index) => `${index}-${product.id}`}
      />
      <SectionContainer>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            borderTopColor: "white",
            borderTopWidth: 2,
          }}
        >
          <BoldTypography style={{ fontSize: 30 }}>{`Total `}</BoldTypography>
          <BoldTypography
            style={{ fontSize: 30 }}
          >{`$ ${total} `}</BoldTypography>
        </View>
      </SectionContainer>
      <SectionContainer>
          <MainButton text="Check out" onPress={navigateToPaymentMethodsScreen}></MainButton>
      </SectionContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({


})