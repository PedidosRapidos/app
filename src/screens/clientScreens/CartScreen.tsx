import React from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../res/globalStyles";
import { SectionTitle } from "../../ui/components/SectionTitle";
import { SectionContainer } from "../../ui/components/SectionContainer";
import { ProductPreview } from "../../ui/components/ProductPreview";
import { RootStackParams } from "../../ui/navigation/Stack";
import { StackScreenProps } from "@react-navigation/stack";
import { useCart } from "../../contexts/SessionContext";
import { ProductPreview2 } from "../../ui/components/ProductPreview2";

interface Props extends StackScreenProps<RootStackParams, "CartScreen"> {}

export const CartScreen = ({ navigation }: Props) => {
  const [cart] = useCart();

  const products = cart?.products || [];

  const displayProductDetails = (item: any) => {
    navigation.navigate("ProductDetailScreen", {
      product: item,
    });
  };

  const renderItem = ({ item: product }: any) => {
    return (
      <ProductPreview2 product={product} onDetails={displayProductDetails} />
    );
  };

  return (
    <SafeAreaView
      style={{
        ...globalStyles.generalContainer,
        paddingBottom: 150,
        padding: 15,
      }}
    >
      <SectionContainer>
        <SectionTitle text="My Shopping Cart" />
      </SectionContainer>
      <FlatList
        style={{ flex: 1 }}
        renderItem={renderItem}
        data={products}
        keyExtractor={(product, index) => `${index}-${product.id}`}
      />
    </SafeAreaView>
  );
};
