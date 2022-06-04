import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../res/globalStyles";
import { SearchBar } from "../../ui/components/SearchBar";
import React, { useEffect, useState, useCallback} from "react";
import { colors } from "../../res/colors";
import { SectionTitle } from "../../ui/components/SectionTitle";
import { MainButton } from "../../ui/components/MainButton";
import client from "../../services/config";
import { Loader } from "../../ui/components/Loader";
import { RootStackParams } from "../../ui/navigation/Stack";
import { StackScreenProps } from "@react-navigation/stack";
import { useCart } from "../../contexts/CartContext";
import { View, StyleSheet, FlatList } from "react-native";
import { ShopViewClient } from "../../ui/components/ShopViewClient";
import { Picker } from "@react-native-picker/picker";
import { normalizeSize, Typography } from "../../res/typography";
import { RadioButton } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SecondaryButton } from "../../ui/components/SecondaryButton";
import { useIncrementalSearch } from "../../ui/hooks/useIncrementalSearch";

interface Props extends StackScreenProps<RootStackParams, "HomeScreenClient"> {}

export const HomeScreenClient = ({ navigation }: Props) => {
      const [searchValue, setSearchValue] = useState("");
      const [cart] = useCart();
      const [isLoading, setIsLoading] = useState(false);
      const [screenShops, setScreenShops] = useState<any>([]);

    let shops: any[] = [];


    const getShops = useCallback(
      async (page: number) => {
        setIsLoading(true);
        try {
        const opts = {
                  params: {
                    q: searchValue.split(" ").join(",") || undefined
                  },
                };
          const { data: fetchedShops } = await client.get(
            `/shops/`, opts);
          console.log("Fetching");
          console.log(fetchedShops)
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
      }
    );

    const navigateToShopProductsScreen = (shop: any) => {
      navigation.navigate("ProductShopsScreen", {
        shopData: shop,
      });
    };

    return (
      <SafeAreaView
        style={{
          ...globalStyles.generalContainer,
          ...globalStyles.innerContainer,
        }}
      >

    <SectionTitle text="Search" />
        <SearchBar
          onChangeText={(nextSearchValue) => setSearchValue(nextSearchValue)}
          value={searchValue}
          placeholder="Search product name"
        />

        <MainButton
          text="Search"
          onPress={() => {
            getShops();
          }}
        />

        <FlatList
          style={globalStyles.sectionSpacing}
          renderItem={({ item: shop }) => (
            <ShopViewClient
              shop={shop}
              onPressMyProducts={navigateToShopProductsScreen}
            />
          )}
          data={screenShops}
        />
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  section: {
    color: colors.black,
    fontSize: normalizeSize(17),
  },
});
