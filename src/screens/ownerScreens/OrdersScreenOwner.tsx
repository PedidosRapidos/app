import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../res/globalStyles";
import { SectionTitle } from "../../ui/components/SectionTitle";
import { Typography } from "../../res/typography";
import { useUser } from "../../contexts/UserContext";
import client from "../../services/config";
import { Loader } from "../../ui/components/Loader";
import { OrderPreviewOwner } from "../../ui/components/OrderPreviewOwner";
import { SectionContainer } from "../../ui/components/SectionContainer";
import { RootStackParams } from "../../ui/navigation/Stack";
import { StackScreenProps } from "@react-navigation/stack";

interface Props
  extends StackScreenProps<RootStackParams, "OrdersScreenOwner"> {}

export const OrdersScreenOwner = ({ navigation, route }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<any>([]);
  const { id: sellerId } = useUser();
  const states = [
    "TO_CONFIRM",
    "CONFIRMED",
    "IN_PREPARATION",
    "UNDER_WAY",
    "DELIVERED",
    "CANCELLED",
  ];
  const buttonText = [
    "Confirm",
    "Prepare",
    "Deliver",
    "End",
    "Finished",
    "Cancelled",
  ];
  const [index, setIndex] = useState(0);
  const shopId = route.params.shopId;

  const displayOrderDetails = (item: any) => {
    navigation.navigate("OrderDetailScreenOwner", {
      order: item,
    });
  };

  const confirmOrder = async (order: any) => {
    setIsLoading(true);
    try {
      await client.patch(`/sellers/${sellerId}/shops/${shopId}/${order.id}`, {
        new_state: states[index + 1],
      });
      setIndex(index + 1);
    } catch (err: any) {
      console.error(
        "Request failed, response:",
        err.response?.data || err.message || err
      );
    } finally {
      setIsLoading(false);
    }
  };

  const cancelOrder = async (order: any) => {
    setIsLoading(true);
    try {
      await client.patch(`/sellers/${sellerId}/shops/${shopId}/${order.id}`, {
        new_state: states[5],
      });
      setIndex(6);
    } catch (err: any) {
      console.error(
        "Request failed, response:",
        err.response?.data || err.message || err
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getOrders = useCallback(
    async (page: number) => {
      setIsLoading(true);
      try {
        const { data: fetchedOrders } = await client.get(
          `/sellers/${sellerId}/shops/${shopId}/orders/`
        );
        console.log("Fetching");
        setOrders(fetchedOrders);
        return fetchedOrders;
      } catch (err: any) {
        console.error(
          "Request failed, response:",
          err.response?.data || err.message || err
        );
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    [sellerId]
  );
  useEffect(() => {
    console.log("refreshing page");
    getOrders(0);
  }, [index]);

  return (
    <SafeAreaView style={globalStyles.generalContainer}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        style={globalStyles.innerContainer}
      >
        <SectionContainer>
          <SectionTitle text="My orders" />
          {orders.length != 0 ? null : (
            <Typography>You do not have any orders for this shop</Typography>
          )}
          {orders.map((item: any) => (
            <View key={item.id}>
              <OrderPreviewOwner
                order={item}
                buttonText={buttonText[index]}
                onPressCancel={index < 4 ? cancelOrder : undefined}
                onPressConfirm={index < 4 ? confirmOrder : undefined}
              />
            </View>
          ))}
        </SectionContainer>
      </ScrollView>
      <Loader visible={isLoading} />
    </SafeAreaView>
  );
};
