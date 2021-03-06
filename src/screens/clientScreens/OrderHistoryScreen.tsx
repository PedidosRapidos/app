import React, { useEffect, useState } from "react";
import { FlatList, View, Image } from "react-native";
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
import { normalizeSize, Typography } from "../../res/typography";
import { stateStr } from "../../services/order";
import { useNotification } from "../../contexts/NotificationContext";

interface Props
  extends StackScreenProps<RootStackParams, "OrderHistoryScreen"> {}

export const OrderHistoryScreen = ({ navigation, route }: Props) => {
  const pending = ['TO_CONFIRM', 'CONFIRMED', 'IN_PREPARATION', 'UNDER_WAY'];
  const user = useUser();
  const [cart] = useCart();
  const [showOptions, setShowOptions] = useState(false);
  const [query, setQuery] = useState("");
  const [orderState, setOrderState] = useState("PENDING");
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
          states: (orderState == "PENDING" ? pending : [orderState]),
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
    <View
      style={{
        ...globalStyles.generalContainer,
        ...globalStyles.innerContainer,
      }}
    >
      <SectionContainer>
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
                <Picker.Item label={"Pending"} value="PENDING" />
                <Picker.Item label={stateStr["DELIVERED"]} value="DELIVERED" />
                <Picker.Item label={stateStr["CANCELLED"]} value="CANCELLED" />
              </Picker>
            </View>
          </View>
        </SectionContainer>
      )}
      {orders.length === 0 && (
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
              We couldn't find any order with "{query}".
            </Typography>
          </View>
        </>
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
    </View>
  );
};
