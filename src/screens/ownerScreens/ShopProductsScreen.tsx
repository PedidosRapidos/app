import { View, ScrollView, FlatList } from "react-native";
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
import { SecondaryButton } from "../../ui/components/SecondaryButton";

interface Props
  extends StackScreenProps<RootStackParams, "ShopProductsScreen"> {}

export const ShopProductsScreen = ({ navigation, route }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [shop, setShop] = useShopDetail();
  const products = shop.products || [];
  const { sellerId, shopData } = route.params;

  const getShopProducts = async () => {
    setIsLoading(true);
    try {
      const { data } = await client.get(`/shops/${shopData.id}/products`);
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
      shopId: shopData.id,
    });
  };

  useEffect(() => {
    console.log("UseEffectShopProductsScreen");
    console.log(shop);
    getShopProducts();
  }, [shopData.id]);

  return (
    <SafeAreaView
      style={{
        ...globalStyles.generalContainer,
        ...globalStyles.innerContainer,
      }}
    >
      <View style={globalStyles.sectionSpacing}>
        <SectionTitle text="Shop" />
        <ShopPreview shop={shopData} />
      </View>
      <View>
        <SectionTitle text="My products" />
        {products.length != 0 ? null : (
          <Typography>You do not have any product in this shop</Typography>
        )}
      </View>
      <FlatList
        style={globalStyles.sectionSpacing}
        renderItem={({ item: product }) => (
          <ProductPreview2
            product={product}
            onDetails={navigateToProductsDetailScreen}
          />
        )}
        data={products}
      />
      {products.length == 0 ? (
        <MainButton
          text="Add product"
          onPress={navigateToUploadProductScreen}
          backgroundColor={colors.orange}
        />
      ) : (
        <SecondaryButton
          symbol="+"
          text="  Add other product"
          onPress={navigateToUploadProductScreen}
          left={true}
        />
      )}

      <Loader visible={isLoading} />
    </SafeAreaView>
  );
};
