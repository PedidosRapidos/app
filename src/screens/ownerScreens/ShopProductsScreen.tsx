import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../res/globalStyles";
import React, { useEffect, useState } from "react";
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
import { ProductPreview2 } from "../../ui/components/ProductPreview2";
import { useShopDetail } from "../../contexts/ShopContext";

interface Props
  extends StackScreenProps<RootStackParams, "ShopProductsScreen"> {}

export const ShopProductsScreen = ({ navigation, route }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [shop, setShop] = useShopDetail();
  const products = shop.products || [];
  const { sellerId, shopId } = route.params;

  const getShopProducts = async () => {
    setIsLoading(true);
    try {
      const { data } = await client.get(`/shops/${shopId}/products`);
      setShop(data);
    } catch (err: any) {
      console.error(
        "Request failed, response:",
        err.response?.data || err.message || err
      );
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToProductsDetailScreen = (product: any) => {
    console.log(product);
    navigation.navigate("ProductDetailScreenOwner", {
      product: product,
    });
  };

  const navigateToUploadProductScreen = () => {
    navigation.navigate("UploadProductScreen", {
      sellerId: sellerId,
      shopId: shopId,
    });
  };

  useEffect(() => {
    getShopProducts();
  }, [shopId]);

  return (
    <SafeAreaView style={globalStyles.generalContainer}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        style={globalStyles.innerContainer}
      >
        <SectionContainer>
          <MainButton
            text="Add product"
            onPress={navigateToUploadProductScreen}
            backgroundColor={colors.orange}
          />
        </SectionContainer>
        <SectionContainer>
          <SectionTitle text="Shop" />
          <View>
            <ShopPreview shop={shop} />
          </View>
        </SectionContainer>
        <SectionContainer>
          <SectionTitle text="My products" />
          {products.length != 0 ? null : (
            <Typography>You do not have any product in this shop</Typography>
          )}
          {products.map((item: any) => (
            <View key={item.id}>
              <ProductPreview2
                product={item}
                onDetails={navigateToProductsDetailScreen}
              />
            </View>
          ))}
        </SectionContainer>
      </ScrollView>
      <Loader visible={isLoading} />
    </SafeAreaView>
  );
};
