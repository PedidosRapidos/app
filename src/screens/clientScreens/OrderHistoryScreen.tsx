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
import { colors, colorWithOpacity } from "../../res/colors";
import { Typography } from "../../res/typography";
import { stateStr } from "../../services/order";
import { useNotification } from "../../contexts/NotificationContext";

interface Props
  extends StackScreenProps<RootStackParams, "OrderHistoryScreen"> {}

export const OrderHistoryScreen = ({ navigation, route }: Props) => {
  const user = useUser();
  const [cart] = useCart();
  const [showOptions, setShowOptions] = useState(false);
  const [query, setQuery] = useState("");
  const [orderState, setOrderState] = useState();
  const { notification } = useNotification();
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
          state: orderState || undefined,
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

  useEffect(() => {
    if (notification?.data?.action === "order_updated") {
      search();
    }
  }, [notification]);

  const openOrdeDetail = (order: any) => {
    navigation.navigate("OrderDetailScreen", { order });
  };

  return (
    <SafeAreaView
      style={{
        ...globalStyles.generalContainer,
        ...globalStyles.innerContainer
      }}
    >
      <SectionContainer>
        <SectionTitle text="Orders" />
        <SearchBar
          onChangeText={(nextSearchValue) => setQuery(nextSearchValue)}
          value={query}
          placeholder="Search orders by product"
          onSearch={() => search()}
          onFilter={() => setShowOptions(!showOptions)}
          filterBadge={orderState ? true : false}
        />
      </SectionContainer>
      {showOptions && (
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
                style={globalStyles.picker}
                selectedValue={orderState}
                onValueChange={(itemValue) => setOrderState(itemValue)}
                dropdownIconColor="white"
                dropdownIconRippleColor={colorWithOpacity(colors.orange, 0.1)}
              >
                <Picker.Item label="" value="" />
                <Picker.Item
                  label={stateStr["TO_CONFIRM"]}
                  value="TO_CONFIRM"
                />
                <Picker.Item label={stateStr["CONFIRMED"]} value="CONFIRMED" />
                <Picker.Item
                  label={stateStr["IN_PREPARATION"]}
                  value="IN_PREPARATION"
                />
                <Picker.Item label={stateStr["UNDER_WAY"]} value="UNDER_WAY" />
                <Picker.Item label={stateStr["DELIVERED"]} value="DELIVERED" />
                <Picker.Item label={stateStr["CANCELLED"]} value="CANCELLED" />
              </Picker>
            </View>
          </View>
        </SectionContainer>
      )}
      <FlatList
        style={{ flex: 1 }}
        renderItem={({ item: order }) => (
          <OrderPreview order={order} onDetails={openOrdeDetail} />
        )}
        data={orders}
        onEndReachedThreshold={0.1}
        onEndReached={nextPage}
        onRefresh={() => search()}
        refreshing={fetching}
      />
    </SafeAreaView>
  );
};
