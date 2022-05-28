import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../res/globalStyles";
import { SectionTitle } from "../../ui/components/SectionTitle";
import { SectionContainer } from "../../ui/components/SectionContainer";
import { RootStackParams } from "../../ui/navigation/Stack";
import { StackScreenProps } from "@react-navigation/stack";
import { useUser } from "../../contexts/UserContext";
import { OrderPreview } from "../../ui/components/OrderPreview";
import { useIncrementalSearch } from "../../ui/hooks/useIncrementalSearch";
import client from "../../services/config";
import { useCart } from "../../contexts/CartContext";

interface Props
  extends StackScreenProps<RootStackParams, "PendingOrdersScreen"> {}

export const PendingOrdersScreen = ({ navigation, route }: Props) => {
  const user = useUser();
  const [cart] = useCart();
  const {
    data: orders,
    search,
    nextPage,
    fetching,
  } = useIncrementalSearch(async (page: number) => {
    try {
      console.log("fetching orders");
      const opts = {
        params: {
          client_id: user.id,
          state: "TO_CONFIRM",
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
  }, [user, cart]);

  return (
    <SafeAreaView
      style={{
        ...globalStyles.generalContainer,
        padding: 15,
      }}
    >
      <SectionContainer>
        <SectionTitle text="Pending Orders" />
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
