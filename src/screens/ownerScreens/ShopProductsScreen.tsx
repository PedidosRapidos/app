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
import { useNotification } from "../../contexts/NotificationContext";

interface Props
  extends StackScreenProps<RootStackParams, "ShopProductsScreen"> {}

export const ShopProductsScreen = ({ navigation, route }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [shopDetail, setShopDetail] = useShopDetail();
  const [shop, setShop] = useState(null);
  const notification = useNotification();
  const products = shopDetail.products || [];
  const { sellerId, shopData } = route.params;

  const getShopProducts = async () => {
    setIsLoading(true);
    try {
      const { data: shop } = await client.get(`/shops/${shopData.id}`);
      const { data } = await client.get(`/shops/${shopData.id}/products`);
      console.log(data);
      setShop(shop);
      setShopDetail(data);
    } catch (err: any) {
      console.log(
        "Request failed, response:",
        err.response?.data || err.message || err
      );
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToProductsDetailScreen = (product: any) => {
    console.log(product);
    navigation.navigate("ProductDetailScreen", {
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
    console.log(shopDetail);
    getShopProducts();
  }, [shopData, notification]);

  return (
    <View
      style={{
        ...globalStyles.generalContainer,
        ...globalStyles.innerContainer,
      }}
    >
      <View style={globalStyles.sectionSpacing}>
        {shop && <ShopPreview shop={shop} />}
      </View>
      <View>
        <SectionTitle text="My products" />
        {products.length != 0 ? null : (
          <Typography>
            You do not have any products in this shopDetail
          </Typography>
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
    </View>
  );
};
