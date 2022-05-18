import { StyleSheet, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../res/globalStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useCallback, useEffect, useState } from "react";
import { Typography } from "../../res/typography";
import { colors } from "../../res/colors";
import { SectionTitle } from "../../ui/components/SectionTitle";
import { SectionContainer } from "../../ui/components/SectionContainer";
import { MainButton } from "../../ui/components/MainButton";
import client from "../../services/config";
import { Loader } from "../../ui/components/Loader";
import { RootStackParams } from "../../ui/navigation/Stack";
import { StackScreenProps } from "@react-navigation/stack";
import { ShopPreview } from "../../ui/components/ShopPreview";
import { useUser } from "../../contexts/SessionContext";
import ScrollList from "../../ui/components/ScrollList";
import { SecondaryButton } from "../../ui/components/SecondaryButton";

interface Props extends StackScreenProps<RootStackParams, "HomeScreenOwner"> {}

export const HomeScreenOwner = ({ navigation, route }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<any>([]);
  const { id: sellerId } = useUser();

  const getShops = useCallback(
    async (page: number) => {
      setIsLoading(true);
      try {
        const { data: products } = await client.get(
          `/sellers/${sellerId}/shops/`,
          { params: { page, page_size: 10 } }
        );
        return products;
      } catch (err: any) {
        console.error(
          "Request failed, response:",
          err.response?.data || err.message || err
        );
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    [sellerId]
  );

  const navigateToShopProductsScreen = (shop: any) => {
    navigation.navigate("ShopProductsScreen", {
      sellerId: sellerId,
      shop: shop,
      products: [],
    });
  };

  useEffect(() => {
    // TODO: al agregar un nuevo shop y volver a este screen no me recarga la pagina (actualmente solo se monta una vez)
    getShops(1);
  }, [sellerId]);

  return (
    <SafeAreaView style={globalStyles.generalContainer}>
      <View style={globalStyles.innerContainer}>
        <SectionContainer>
          <SectionTitle text="My shops" />
          <ScrollList
            renderItem={(item) => (
              <ShopPreview
                shop={item}
                onPressMyProducts={navigateToShopProductsScreen}
              />
            )}
            fetchMore={getShops}
          ></ScrollList>
        </SectionContainer>
        <SectionContainer>
          <MainButton
            text="Add shop"
            onPress={() => {
              navigation.navigate("AddShopScreen", {
                sellerId: sellerId,
              });
            }}
            backgroundColor={colors.orange}
          />
        </SectionContainer>
      </View>
      <Loader visible={isLoading} />
    </SafeAreaView>
  );
};
