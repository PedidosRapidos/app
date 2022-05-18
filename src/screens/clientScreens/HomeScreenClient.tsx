import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../res/globalStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SearchBar } from "../../ui/components/SearchBar";
import React, { useCallback, useEffect, useState } from "react";
import { Typography } from "../../res/typography";
import { colors } from "../../res/colors";
import { SectionTitle } from "../../ui/components/SectionTitle";
import { SectionContainer } from "../../ui/components/SectionContainer";
import { imageStyles } from "../../res/imageStyles";
import { MainButton } from "../../ui/components/MainButton";
import client from "../../services/config";
import { Loader } from "../../ui/components/Loader";
import { ProductPreview } from "../../ui/components/ProductPreview";
import { RootStackParams } from "../../ui/navigation/Stack";
import { StackScreenProps } from "@react-navigation/stack";
import ScrollList from "../../ui/components/ScrollList";
import { useSession } from "../../contexts/SessionContext";
import { ProductPreview2 } from "../../ui/components/ProductPreview2";


interface Props extends StackScreenProps<RootStackParams, "HomeScreenClient"> {}

export const HomeScreenClient = ({ navigation, route }: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fetchMore, setFetchMore] = useState<any>({});
  const [screenProducts, setScreenProducts] = useState<any>([]);

  const {
    user: { cartId, id: clientId },
  } = useSession();
  const displayProductDetails = (item: any) => {
    navigation.navigate("ProductDetailScreen", {
      product: item,
    });
  };

  const addToCart = useCallback(
    async (item: any) => {
      try {
        console.log("add item", cartId, item);
        await client.post(`/shopping_cart/${cartId}/products/`, {
          product_id: item.id,
        });
      } catch (e:any) {
        console.log(e.response?.data || e.message || e);
      }
    },
    [cartId]
  );
  
  const fetchPage = async (page: number) => {
    const opts = {
      params: {
        q: searchValue.split(" ").join(",") || undefined,
        page,
        page_size: 10,
      },
    };
    const { data: products } = await client.get(`/products`, opts);
    console.log("setscreenproducts")
    setScreenProducts(products);
    return products;
  };
 
  return (
    <SafeAreaView
      style={{ ...globalStyles.generalContainer, paddingBottom: 150 }}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        style={globalStyles.innerContainer}
      >
      <SectionContainer>
        <SectionTitle text="Search" />
        <SearchBar
          onChangeText={(nextSearchValue) => setSearchValue(nextSearchValue)}
          value={searchValue}
          placeholder="Search product name"
        />
        <MainButton
          text="Search"
          // TODO: tiene hardcodeado un page:0
          onPress={() => {
            fetchPage(0);
          }}
          backgroundColor={colors.orange}
        />
      </SectionContainer>
      <SectionContainer>
        {screenProducts.map((item: any, index: any) => (
          <View key={item.id}>
          <ProductPreview2 
              product={item} 
              onDetails={displayProductDetails}
              onCart={addToCart}
              />
          </View>
        ))
        }
      </SectionContainer>
      </KeyboardAwareScrollView>
      <Loader visible={isLoading} />
    </SafeAreaView>
  );
};
