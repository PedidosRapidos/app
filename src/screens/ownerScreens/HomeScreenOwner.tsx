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
import { SecondaryButton } from "../../ui/components/SecondaryButton";

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
        console.log(
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
      shopData: shop,
    });
  };

  const navigateToOrdersProductsScreen = (shop: any) => {
    navigation.navigate("OrdersScreenOwner", {
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
    <View
      style={{
        ...globalStyles.generalContainer,
        ...globalStyles.innerContainer,
      }}
    >
      <View style={globalStyles.sectionSpacing}>
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
            onPressSeeOrders={navigateToOrdersProductsScreen}
          />
        )}
        data={screenShops}
      />
      {screenShops.length == 0 ? (
        <MainButton text="Add shop" onPress={navigateToAddShopScreen} />
      ) : (
        <SecondaryButton
          symbol="+"
          text="  Add other shop"
          onPress={navigateToAddShopScreen}
          left={true}
        />
      )}
      <Loader visible={isLoading} />
    </View>
  );
};
