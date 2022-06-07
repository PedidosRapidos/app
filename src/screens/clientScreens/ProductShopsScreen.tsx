import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../res/globalStyles";
import { SearchBar } from "../../ui/components/SearchBar";
import React, { useEffect, useState } from "react";
import { colors, colorWithOpacity } from "../../res/colors";
import { SectionTitle } from "../../ui/components/SectionTitle";
import { MainButton } from "../../ui/components/MainButton";
import client from "../../services/config";
import { Loader } from "../../ui/components/Loader";
import { RootStackParams } from "../../ui/navigation/Stack";
import { StackScreenProps } from "@react-navigation/stack";
import { useCart } from "../../contexts/CartContext";
import { View, StyleSheet, FlatList, Image } from "react-native";
import { ShopViewClient } from "../../ui/components/ShopViewClient";
import { Picker } from "@react-native-picker/picker";
import { normalizeSize, Typography } from "../../res/typography";
import { RadioButton } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SecondaryButton } from "../../ui/components/SecondaryButton";
import { useIncrementalSearch } from "../../ui/hooks/useIncrementalSearch";
import { ProductPreview2 } from "../../ui/components/ProductPreview2";
import { ProductPreview } from "../../ui/components/ProductPreview";

interface Props
  extends StackScreenProps<RootStackParams, "ProductShopsScreen"> {}

export const ProductShopsScreen = ({ navigation, route }: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [cart] = useCart();
  const [selectedField, setSelectedField] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");
  const [lastSerchValue, setLastSeachValue] = useState("");
  const { shopData } = route.params;

  const displayProductDetails = (item: any) => {
    navigation.navigate("ProductDetailScreen", {
      product: item,
    });
  };

  const { data, search, nextPage, fetching } = useIncrementalSearch(
    async (page: number) => {
      try {
        const opts = {
          params: {
            q: searchValue.split(" ").join(",") || undefined,
            page,
            page_size: 10,
            order: selectedOrder !== "" ? selectedOrder : undefined,
            field: selectedOrder !== "" ? selectedField : undefined,
          },
        };
        const { data: shop } = await client.get(
          `shops/${shopData.id}/products`,
          opts
        );
        setLastSeachValue(searchValue);
        return shop.products;
      } catch (e) {
        console.log("fetch failed", e);
      }
    }
  );

  useEffect(() => {
    setSelectedOrder("");
    console.log("UseEffectShopProductsScreen");
    console.log(shopData);
    search();
  }, [shopData.id]);

  useEffect(() => {
    if (selectedOrder !== "" && data.length !== 0) search();
  }, [selectedOrder]);

  console.log("reloading" + selectedField);
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
        onSearch={search}
        filterBadge={false}
      />
      <View style={globalStyles.sectionSpacing}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            paddingTop: 10,
          }}
        >
          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 1 }}>
            <Picker
              style={[
                styles.section,
                {
                  backgroundColor: colorWithOpacity(colors.gray, 0.1),
                },
              ]}
              enabled
              mode="dropdown"
              selectedValue={selectedOrder}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedField("price");
                setSelectedOrder(itemValue);
              }}
              dropdownIconColor="white"
              dropdownIconRippleColor={colorWithOpacity(colors.orange, 0.1)}
            >
              <Picker.Item
                label="  Order by..."
                value=""
                enabled={false}
                style={{ fontSize: 17 }}
              />
              <Picker.Item label="  Lowest price" value="asc" />
              <Picker.Item label="  Highest price" value="desc" />
            </Picker>
          </View>
        </View>
      </View>

      {data.length === 0 && (
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
              We couldn't find any "{lastSerchValue}" in this shop
            </Typography>
          </View>
        </>
      )}
      <FlatList
        style={globalStyles.sectionSpacing}
        data={data}
        renderItem={({ item }) => (
          <ProductPreview2
            product={item}
            onDetails={displayProductDetails}
            removePreview={cart.remove}
            onCart={cart.add}
          />
        )}
        onEndReachedThreshold={0.1}
        onEndReached={nextPage}
        onRefresh={() => null}
        refreshing={false}
      />
      <Loader visible={fetching} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  section: {
    color: colors.white,
    fontSize: normalizeSize(15),
    padding: 5,
  },
});
