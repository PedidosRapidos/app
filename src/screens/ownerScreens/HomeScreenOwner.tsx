import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../res/globalStyles";
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
import { useUser } from "../../contexts/UserContext";

interface Props extends StackScreenProps<RootStackParams, "HomeScreenOwner"> {}

export const HomeScreenOwner = ({ navigation, route }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [screenShops, setScreenShops] = useState<any>([]);

  let shops: any[] = [];
  if (route.params) {
    console.log("routeparams");
    shops = route.params.shops;
  }

  const { id: sellerId } = useUser();

  const getShops = useCallback(
    async (page: number) => {
      setIsLoading(true);
      try {
        const { data: fetchedShops } = await client.get(
          `/sellers/${sellerId}/shops/`
        );
        console.log("Fetching");
        setScreenShops(fetchedShops);
        return fetchedShops;
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
      shopId: shop.id,
    });
  };

  const navigateToAddShopScreen = () => {
    navigation.navigate("AddShopScreen", {
      sellerId: sellerId,
      shops: screenShops,
    });
  };

  useEffect(() => {
    console.log("UseEffect");
    getShops(0);
  }, []);

  useEffect(() => {
    if (shops.length > screenShops.length) {
      console.log("UpdateOnChange");
      setScreenShops(shops);
    }
  }, [route.params?.shops]);

  return (
    <SafeAreaView
      style={{
        ...globalStyles.generalContainer,
        ...globalStyles.innerContainer,
      }}
    >
      <View style={globalStyles.sectionSpacing}>
        <SectionTitle text="My shops" />
        {screenShops.length != 0 ? null : (
          <Typography>You do not have any shops yet</Typography>
        )}
      </View>
      <FlatList
      style={globalStyles.sectionSpacing}
        renderItem={({ item: shop }) => (
          <ShopPreview
            shop={shop}
            onPressMyProducts={navigateToShopProductsScreen}
          />
        )}
        data={screenShops}
      />
      <MainButton
        text="Add shop"
        onPress={navigateToAddShopScreen}
        backgroundColor={colors.orange}
      />
      <Loader visible={isLoading} />
    </SafeAreaView>
  );
};
