import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../res/globalStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SearchBar } from "../../ui/components/SearchBar";
import React, { useState } from "react";
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

interface Props extends StackScreenProps<RootStackParams, "HomeScreenClient"> {}

export const HomeScreenClient = ({ navigation, route }: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fetchMore, setFetchMore] = useState<any>({});

  const displayProductDetails = (item: any) => {
    navigation.navigate("ProductDetailScreen", {
      product: item,
    });
  };

  const addToCart = (item: any) => {
    console.log("add item", item);
  };

  const searchProducts = () => {
    const fetchPage = async (page: number) => {
      const opts = {
        params: {
          q: searchValue.split(" ") || undefined,
          page,
          page_size: 10,
        },
      };
      const { data: products } = await client.get(`/products`, opts);
      return products;
    };
    setFetchMore({ fetch: fetchPage });
  };

  return (
    <SafeAreaView style={globalStyles.generalContainer}>
      <SectionContainer>
        <SectionTitle text="Search" />
        <SearchBar
          onChangeText={(nextSearchValue) => setSearchValue(nextSearchValue)}
          value={searchValue}
          placeholder="Search product name"
        />
        <MainButton
          text="Search"
          onPress={() => {
            searchProducts();
          }}
          backgroundColor={colors.orange}
        />
      </SectionContainer>
      <SectionContainer>
        <ScrollList
          renderItem={(item: any) => (
            <ProductPreview
              product={item}
              onDetails={displayProductDetails}
              onCart={addToCart}
            />
          )}
          fetchMore={fetchMore.fetch}
        ></ScrollList>
      </SectionContainer>
      <Loader visible={isLoading} />
    </SafeAreaView>
  );
};
