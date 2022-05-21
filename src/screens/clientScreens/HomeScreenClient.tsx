import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../res/globalStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SearchBar } from "../../ui/components/SearchBar";
import React, { useCallback, useState } from "react";
import { colors, colorWithOpacity } from "../../res/colors";
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
import { View, StyleSheet } from "react-native";
import { ProductPreview2 } from "../../ui/components/ProductPreview2";
import { Picker } from "@react-native-picker/picker";
import { normalizeSize } from "../../res/typography";
import { RadioButton } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SecondaryButton } from "../../ui/components/SecondaryButton";

interface Props extends StackScreenProps<RootStackParams, "HomeScreenClient"> {}

export const HomeScreenClient = ({ navigation, route }: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fetchMore, setFetchMore] = useState<any>({});
  const [cart] = useCart();
  const [selectedField, setSelectedField] = useState("price");
  const [selectedOrder, setSelectedOrder] = useState("asc");
  const [orderBy, setOrderBy] = React.useState();

  const styles = StyleSheet.create({
    section: {
      color: colors.black,
      fontSize: normalizeSize(17),
      backgroundColor: orderBy == "checked" ? colors.white : colors.gray,
    },
  });

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

  const orderByProducts = () => {
    console.log(selectedField, selectedOrder);
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
            order: selectedOrder,
            field: selectedField,
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
  };

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
                  onPress={() => {
                    orderByProducts();
                  }}
                  left={false}
                  disable={orderBy == "checked" ? false : true}
                />
              </View>
              <View>
                <RadioButton
                  value="unchecked"
                  status={orderBy === "checked" ? "checked" : "unchecked"}
                  onPress={() =>
                    setOrderBy(orderBy == "checked" ? "unchecked" : "checked")
                  }
                  uncheckedColor="gray"
                  color={colors.orange}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Picker
                  style={[styles.section]}
                  enabled={orderBy == "checked" ? true : false}
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
                  disabled={orderBy != "checked" ? true : false}
                />
                <Ionicons
                  name="arrow-up"
                  size={35}
                  color={
                    orderBy === "checked"
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
                  disabled={orderBy != "checked" ? true : false}
                />
                <Ionicons
                  name="arrow-down"
                  size={35}
                  color={
                    orderBy === "checked"
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
