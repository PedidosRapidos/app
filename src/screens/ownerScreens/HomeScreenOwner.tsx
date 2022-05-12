import { StyleSheet, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../res/globalStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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

interface Props extends StackScreenProps<RootStackParams, "HomeScreenOwner"> {}

export const HomeScreenOwner = ({ navigation, route }: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<any>([]);
  const params = route.params;

  const getShops = async () => {
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
          <MainButton
            text="Add shop"
            onPress={() => {
              navigation.navigate("AddShopScreen", {
                sellerId: params.sellerId,
              });
            }}
            backgroundColor={colors.orange}
          />
        </SectionContainer>
        <SectionContainer>
          {products.length != 0 ? (
            <SectionTitle text="Results" />
          ) : (
            <Typography>No shops results</Typography>
          )}
          {products.map((item: any, index: any) => (
            <View key={item.id}>
              <ProductPreview product={item} />
            </View>
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
