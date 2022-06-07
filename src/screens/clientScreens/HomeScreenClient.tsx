import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../res/globalStyles";
import { SearchBar } from "../../ui/components/SearchBar";
import React, { useEffect, useState, useCallback } from "react";
import { colors } from "../../res/colors";
import { SectionTitle } from "../../ui/components/SectionTitle";
import { MainButton } from "../../ui/components/MainButton";
import client, { imageURL } from "../../services/config";
import { Loader } from "../../ui/components/Loader";
import { RootStackParams } from "../../ui/navigation/Stack";
import { StackScreenProps } from "@react-navigation/stack";
import { useCart } from "../../contexts/CartContext";
import { View, StyleSheet, FlatList, Image } from "react-native";
import { ShopViewClient } from "../../ui/components/ShopViewClient";
import { Picker } from "@react-native-picker/picker";
import { normalizeSize, Typography } from "../../res/typography";

interface Props extends StackScreenProps<RootStackParams, "HomeScreenClient"> {}

export const HomeScreenClient = ({ navigation }: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [cart] = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [screenShops, setScreenShops] = useState([]);
  const [lastSerchValue, setLastSeachValue] = useState("");

  const getShops = useCallback(async () => {
    setIsLoading(true);
    try {
      const opts = {
        params: {
          q: searchValue.split(" ").join(",") || undefined,
        },
      };
      const { data: fetchedShops } = await client.get(`/shops/`, opts);
      setLastSeachValue((oldValue) => searchValue);
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
  }, [searchValue]);

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
        onSearch={getShops}
        filterBadge={false}
      />
      {screenShops.length !== 0 && (
        <Typography style={{ fontSize: normalizeSize(18), marginBottom: "5%" }}>
          Shops that sell "{lastSerchValue}" :
        </Typography>
      )}
      {screenShops.length === 0 && lastSerchValue !== "" && (
        <>
          <View
            style={{
              marginTop: "5%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../res/img/not_found.png")}
              style={{
                width: "90%",
                height: "50%",
                resizeMode: "contain",
              }}
            />
            <Typography style={{ fontSize: normalizeSize(18), margin: "5%" }}>
              We couldn't find any shop selling "{lastSerchValue}"
            </Typography>
          </View>
        </>
      )}
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
