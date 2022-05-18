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
import { useSession } from "../../contexts/SessionContext";
import ScrollList from "../../ui/components/ScrollList";
import { SecondaryButton } from "../../ui/components/SecondaryButton";

interface Props extends StackScreenProps<RootStackParams, "HomeScreenOwner"> {}

export const HomeScreenOwner = ({ navigation, route }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [screenShops, setScreenShops] = useState<any>([]);

  let shops: any[] = []
  if(route.params){
    console.log("routeparams")
    shops = route.params.shops
  }

  const {
    user: { id: sellerId },
  } = useSession();

  const getShops = useCallback(
    async (page: number) => {
      setIsLoading(true);
      try {
        const { data: fetchedShops } = await client.get(
          `/sellers/${sellerId}/shops/`
        );
        console.log("Fetching")
        setScreenShops(fetchedShops)
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
      shop: shop,
      products: [],
      //Array vacio pq si no rompe el ShopProductsScreen. ¿Como pongo un array vacio por defecto?
    });
  };

  const navigateToAddShopScreen = () => {
    navigation.navigate("AddShopScreen", {
      sellerId: sellerId,
      shops: screenShops
    });
  }

  useEffect(() => {
    console.log("UseEffect")
    getShops(0);
  }, []);

  useEffect(() => {
    if(shops.length > screenShops.length){
      console.log("UpdateOnChange")
      setScreenShops(shops);
    }
  }, [route.params?.shops]);


    return (
      <SafeAreaView style={globalStyles.generalContainer}>
              <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        style={globalStyles.innerContainer}
      >
          <SectionContainer>
            <SectionTitle text="My shops" />
            {screenShops.length != 0 ? (
              null
              ) 
              : (
              <Typography>You do not have any shops yet</Typography>
              )
            }
            </SectionContainer>
            <SectionContainer>
            {screenShops.map((item: any, index: any) => (
              <View key={item.id}>
              <ShopPreview 
                  shop={item} 
                  onPressMyProducts={navigateToShopProductsScreen} 
                  />
              </View>
            ))
            }
            </SectionContainer>
          <SectionContainer>
            <MainButton
              text="Add shop"
              onPress={navigateToAddShopScreen}
              backgroundColor={colors.orange}/>
          </SectionContainer>
        </KeyboardAwareScrollView>
        <Loader visible={isLoading} />
      </SafeAreaView>
    );


};
