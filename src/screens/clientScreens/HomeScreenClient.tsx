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

interface Props extends StackScreenProps<RootStackParams, "HomeScreenClient"> {}

export const HomeScreenClient = ({ navigation, route }: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<any>([]);

  const displayProductDetails = (item) => {
    navigation.navigate("ProductDetailScreen", {
      product: item
    });
  };  

  const searchProducts = async () => {
    setIsLoading(true);
    try {
      const { data: products } = await client.get(`/products`, {
        params: { q: searchValue.split(" ") },
      });
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

  return (
    <SafeAreaView style={globalStyles.generalContainer}>
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
            onPress={() => {
              searchProducts();
            }}
            backgroundColor={colors.orange}
          />
        </SectionContainer>
        <SectionContainer>
          {products.length != 0 ? (
            <SectionTitle text="Results" />
          ) : (
            <Typography>No search results</Typography>
          )}
          {products.map((item: any, index: any) => (
            <TouchableOpacity key={item.id} onPress={() => {displayProductDetails(item)}}>
              <View>
                <ProductPreview product={item} />
              </View>
            </TouchableOpacity>
          ))}
        </SectionContainer>
      </KeyboardAwareScrollView>
      <Loader visible={isLoading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});
