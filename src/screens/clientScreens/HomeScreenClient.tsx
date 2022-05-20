import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../res/globalStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SearchBar } from "../../ui/components/SearchBar";
import React, { useCallback, useState } from "react";
import { colors } from "../../res/colors";
import { SectionTitle } from "../../ui/components/SectionTitle";
import { SectionContainer } from "../../ui/components/SectionContainer";
import { MainButton } from "../../ui/components/MainButton";
import client from "../../services/config";
import { Loader } from "../../ui/components/Loader";
import { ProductPreview } from "../../ui/components/ProductPreview";
import { RootStackParams } from "../../ui/navigation/Stack";
import { StackScreenProps } from "@react-navigation/stack";
import ScrollList from "../../ui/components/ScrollList";
import { useCart } from "../../contexts/CartContext";
import { View } from "react-native";
import { ProductPreview2 } from "../../ui/components/ProductPreview2";

interface Props extends StackScreenProps<RootStackParams, "HomeScreenClient"> {}

export const HomeScreenClient = ({ navigation, route }: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fetchMore, setFetchMore] = useState<any>({});
  const [cart] = useCart();

  const displayProductDetails = (item: any) => {
    navigation.navigate("ProductDetailScreen", {
      product: item,
    });
  };

  const searchProducts = useCallback(() => {
    const fetchPage = async (page: number) => {
      if (page == 0) {
        setIsLoading(true);
      }
      try {
        const opts = {
          params: {
            q: searchValue.split(" ").join(",") || undefined,
            page,
            page_size: 10,
          },
        };
        const { data: products } = await client.get(`/products`, opts);

        return products;
      } catch (e) {
        console.log("fetch failed", e);
      } finally {
        if (page == 0) {
          setIsLoading(false);
        }
      }
    };
    setFetchMore({ fetch: fetchPage });
  }, [searchValue]);

  return (
    <SafeAreaView
      style={{ ...globalStyles.generalContainer, paddingBottom: 150 }}
    >
      <View style={globalStyles.innerContainer}>
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
              <ProductPreview2
                product={item}
                onDetails={displayProductDetails}
                onCart={cart.add}
              />
            )}
            fetchMore={fetchMore.fetch}
          />
        </SectionContainer>
      </View>
      <Loader visible={isLoading} />
    </SafeAreaView>
  );
};
