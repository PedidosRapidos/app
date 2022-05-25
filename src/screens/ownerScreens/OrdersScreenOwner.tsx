import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../res/globalStyles";
import { SectionTitle } from "../../ui/components/SectionTitle";
import { SectionContainer } from "../../ui/components/SectionContainer";
import { RootStackParams } from "../../ui/navigation/Stack";
import { StackScreenProps } from "@react-navigation/stack";
import { CartProductPreview } from "../../ui/components/CartProductPreview";
import { BoldTypography, Typography } from "../../res/typography";
import { useUser } from "../../contexts/UserContext";
import client from "../../services/config";
import { Loader } from "../../ui/components/Loader";
import { colors } from "../../res/colors";
import { MainButton } from "../../ui/components/MainButton";
import { ProductPreview2 } from "../../ui/components/ProductPreview2";
import { ShopPreview } from "../../ui/components/ShopPreview";
import { OrderPreviewOwner } from "../../ui/components/OrderPreviewOwner";

interface Props
  extends StackScreenProps<RootStackParams, "OrdersScreenOwner"> {}

export const OrdersScreenOwner = ({ navigation, route }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<any>([]);
  const { id: sellerId } = useUser();
  const shopId = route.params.shopId;

  const displayOrderDetails = (item: any) => {
    navigation.navigate("OrderDetailScreenOwner", {
      order: item,
    });
  };

  const confirmOrder = async (order: any) => {
    setIsLoading(true);
    try {
      await client.put(`/sellers/${sellerId}/${shopId}/${order.id}/confirm`);
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
      await client.put(`/sellers/${sellerId}/${shopId}/${order.id}/cancel`);
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
          `/sellers/${sellerId}/${shopId}/orders/`
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
    console.log("UseEffect");
    //getOrders(0);
  }, []);

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
                onPressCancel={cancelOrder}
                onPressConfirm={confirmOrder}
              />
            </View>
          ))}
        </SectionContainer>
      </ScrollView>
      <Loader visible={isLoading} />
    </SafeAreaView>
  );
};
