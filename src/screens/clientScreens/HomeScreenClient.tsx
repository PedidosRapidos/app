import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../res/globalStyles";
import { SearchBar } from "../../ui/components/SearchBar";
import React, { useEffect, useState } from "react";
import { colors } from "../../res/colors";
import { SectionTitle } from "../../ui/components/SectionTitle";
import { SectionContainer } from "../../ui/components/SectionContainer";
import { MainButton } from "../../ui/components/MainButton";
import client from "../../services/config";
import { Loader } from "../../ui/components/Loader";
import { RootStackParams } from "../../ui/navigation/Stack";
import { StackScreenProps } from "@react-navigation/stack";
import { useCart } from "../../contexts/CartContext";
import { View, StyleSheet, FlatList } from "react-native";
import { ProductPreview2 } from "../../ui/components/ProductPreview2";
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
  const [selectedField, setSelectedField] = useState("price");
  const [selectedOrder, setSelectedOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(false);

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
            order: orderBy ? selectedOrder : undefined,
            field: orderBy ? selectedField : undefined,
          },
        };
        const { data: products } = await client.get(`/products`, opts);

        return products;
      } catch (e) {
        console.log("fetch failed", e);
      }
    }
  );

  useEffect(() => {
    if (orderBy && data.length !== 0) search();
  }, [orderBy, selectedField, selectedOrder]);

  return (
    <SafeAreaView style={{ ...globalStyles.generalContainer, height: "100%" }}>
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
              search();
            }}
            backgroundColor={colors.orange}
          />
          <SectionContainer>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingTop: 10,
              }}
            >
              <View>
                <SecondaryButton
                  text="ORDER BY"
                  onPress={() => setOrderBy(!orderBy)}
                  left={false}
                  disable={orderBy}
                />
              </View>
              <View>
                <RadioButton
                  value="unchecked"
                  status={orderBy ? "checked" : "unchecked"}
                  onPress={() => setOrderBy(!orderBy)}
                  uncheckedColor="gray"
                  color={colors.orange}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Picker
                  style={[
                    styles.section,
                    { backgroundColor: orderBy ? colors.white : colors.gray },
                  ]}
                  enabled={orderBy}
                  selectedValue={selectedField}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedField(itemValue)
                  }
                >
                  <Picker.Item label="Price" value="price" />
                </Picker>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <RadioButton
                  value="asc"
                  status={selectedOrder === "asc" ? "checked" : "unchecked"}
                  onPress={() => {
                    setSelectedOrder("asc");
                  }}
                  uncheckedColor={colors.gray}
                  color={colors.white}
                  disabled={!orderBy}
                />
                <Ionicons
                  name="arrow-up"
                  size={35}
                  color={
                    orderBy
                      ? selectedOrder === "asc"
                        ? colors.orange
                        : "gray"
                      : "gray"
                  }
                />
                <RadioButton
                  value="desc"
                  status={selectedOrder === "desc" ? "checked" : "unchecked"}
                  onPress={() => {
                    setSelectedOrder("desc");
                  }}
                  uncheckedColor={colors.gray}
                  color={colors.white}
                  disabled={!orderBy}
                />
                <Ionicons
                  name="arrow-down"
                  size={35}
                  color={
                    orderBy
                      ? selectedOrder === "desc"
                        ? colors.orange
                        : "gray"
                      : "gray"
                  }
                />
              </View>
            </View>
          </SectionContainer>
        </SectionContainer>
      </View>
      {data.length === 0 ? (
        <View style={globalStyles.horizontalPadding}>
          <Typography>No search results</Typography>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={globalStyles.horizontalPadding}
          data={data}
          renderItem={({ item }) => (
            <ProductPreview2
              product={item}
              onDetails={displayProductDetails}
              onCart={cart.add}
            />
          )}
          onEndReachedThreshold={0.1}
          onEndReached={nextPage}
          onRefresh={() => null}
          refreshing={false}
        />
      )}
      <Loader visible={fetching} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  section: {
    color: colors.black,
    fontSize: normalizeSize(17),
  },
});
