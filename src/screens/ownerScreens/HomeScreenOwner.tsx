import { StyleSheet, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../res/globalStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
import { useSession } from "../../contexts/SessionContext";

interface Props extends StackScreenProps<RootStackParams, "HomeScreenOwner"> {}

export const HomeScreenOwner = ({ navigation, route }: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<any>([]);
  const {
    user: { id: sellerId },
  } = useSession();
  const [page, setPage] = useState(1);

  const getShops = async () => {
    setIsLoading(true);
    try {
      const { data: products } = await client.get(
        `/sellers/${sellerId}/shops/?page=${page}`,
        {
          params: { q: searchValue.split(" ") },
        }
      );
      setProducts(products);
    } catch (err: any) {
      console.error(
        "Request failed, response:",
        err.response?.data || err.message || err
      );
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToShopProductsScreen = (shop: any) => {
    navigation.navigate("ShopProductsScreen", {
      sellerId: sellerId,
      shop: shop,
    });
  };

  useEffect(() => {
    // TODO: al agregar un nuevo shop y volver a este screen no me recarga la pagina (actualmente solo se monta una vez)
    getShops();
  }, []);

  return (
    <SafeAreaView style={globalStyles.generalContainer}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        style={globalStyles.innerContainer}
      >
        <SectionContainer>
          {products.length != 0 ? (
            <SectionTitle text="My shops:" />
          ) : (
            <Typography>No shops results</Typography>
          )}
          {products.map((item: any, index: any) => (
            <View key={item.id}>
              <ShopPreview
                shop={item}
                onPressMyProducts={navigateToShopProductsScreen}
              />
            </View>
          ))}
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
      </KeyboardAwareScrollView>
      <Loader visible={isLoading} />
    </SafeAreaView>
  );
};
