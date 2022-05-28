import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../res/globalStyles";
import { SectionTitle } from "../../ui/components/SectionTitle";
import { SectionContainer } from "../../ui/components/SectionContainer";
import { RootStackParams } from "../../ui/navigation/Stack";
import { StackScreenProps } from "@react-navigation/stack";
import { useUser } from "../../contexts/UserContext";
import { OrderPreview } from "../../ui/components/OrderPreview";
import client from "../../services/config";
import { useIncrementalSearch } from "../../ui/hooks/useIncrementalSearch";
import { useCart } from "../../contexts/CartContext";
import { SearchBar } from "../../ui/components/SearchBar";
import { Picker } from "@react-native-picker/picker";
import { colors } from "../../res/colors";
import { Typography } from "../../res/typography";

interface Props
  extends StackScreenProps<RootStackParams, "OrderHistoryScreen"> {}

export const OrderHistoryScreen = ({ navigation, route }: Props) => {
  const user = useUser();
  const [cart] = useCart();
  const [query, setQuery] = useState("");
  const [orderState, setOrderState] = useState("DELIVERED");
  const {
    data: orders,
    search,
    nextPage,
    fetching,
  } = useIncrementalSearch(async (page: number) => {
    try {
      const opts = {
        params: {
          client_id: user.id,
          q: query || undefined,
          state: orderState,
          page,
          page_size: 10,
        },
      };
      const { data: orders } = await client.get(`/orders/`, opts);
      return orders;
    } catch (e) {
      console.log("fetch failed", e);
    }
  });

  useEffect(() => {
    if (user) {
      search();
    }
  }, [user, cart, orderState]);

  return (
    <SafeAreaView
      style={{
        ...globalStyles.generalContainer,
        padding: 15,
      }}
    >
      <SectionContainer>
        <SectionTitle text="Order History" />
        <SearchBar
          onChangeText={(nextSearchValue) => setQuery(nextSearchValue)}
          value={query}
          placeholder="Search order by product name"
          onSearch={() => search()}
        />
      </SectionContainer>
      <SectionContainer>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1 }}>
            <Typography>Order State:</Typography>
          </View>
          <View style={{ flex: 2 }}>
            <Picker
              style={{
                backgroundColor: colors.black,
                color: colors.gray,
              }}
              selectedValue={orderState}
              onValueChange={(itemValue) => setOrderState(itemValue)}
            >
              <Picker.Item label="To Comfirm" value="TO_CONFIRM" />
              <Picker.Item label="Comfirmed" value="CONFIRMED" />
              <Picker.Item label="In Preparation" value="IN_PREPARATION" />
              <Picker.Item label="Under Way" value="UNDER_WAY" />
              <Picker.Item label="Delivered" value="DELIVERED" />
            </Picker>
          </View>
        </View>
      </SectionContainer>
      <FlatList
        style={{ flex: 1 }}
        renderItem={({ item: order }) => <OrderPreview order={order} />}
        data={orders}
        onEndReachedThreshold={0.1}
        onEndReached={nextPage}
        onRefresh={() => search()}
        refreshing={fetching}
      />
    </SafeAreaView>
  );
};
