import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../res/globalStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SearchBar } from "../../ui/components/SearchBar";
import React, { useEffect, useState } from "react";
import { SectionTitle } from "../../ui/components/SectionTitle";
import { SectionContainer } from "../../ui/components/SectionContainer";
import client from "../../services/config";
import { ProductPreview } from "../../ui/components/ProductPreview";
import { RootStackParams } from "../../ui/navigation/Stack";
import { StackScreenProps } from "@react-navigation/stack";
import { useSession } from "../../contexts/SessionContext";

interface Props extends StackScreenProps<RootStackParams, "CartScreen"> {}

export const CartScreen = ({ navigation }: Props) => {
  const [cart, setCart] = useState<any>({ products: [] });
  const {
    user: { cartId, id: clientId },
  } = useSession();

  const displayProductDetails = (item: any) => {
    navigation.navigate("ProductDetailScreen", {
      product: item,
    });
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data: cartData } = await client.get(`/shopping_cart/${cartId}`);
        setCart(cartData);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCart();
  }, []);
  const renderItem = ({ item: product }: any) => {
    console.log(product);
    return (
      <ProductPreview product={product} onDetails={displayProductDetails} />
    );
  };
  return (
    <SafeAreaView
      style={{ ...globalStyles.generalContainer, paddingBottom: 150 }}
    >
      <SectionContainer>
        <SectionTitle text="My Shopping Cart" />
      </SectionContainer>
      <FlatList
        style={{ flex: 1 }}
        renderItem={renderItem}
        data={cart.products}
        keyExtractor={(product) => product.id}
      ></FlatList>
    </SafeAreaView>
  );
};
