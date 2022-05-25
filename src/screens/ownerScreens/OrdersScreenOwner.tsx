import React, { useCallback, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
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

interface Props extends StackScreenProps<RootStackParams, "CartScreen"> {}

export const OrdersScreenOwner = ({ navigation }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<any>([]);
  const { id: sellerId } = useUser();

  const total = 100;
  const displayProductDetails = (item: any) => {
    navigation.navigate("OrderDetailScreenOwner", {
      order: item,
    });
  };

  const getOrders = useCallback(
    async (page: number) => {
      setIsLoading(true);
      try {
        const { data: fetchedOrders } = await client.get(
          `/sellers/${sellerId}/orders/`
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
    <SafeAreaView
      style={{
        ...globalStyles.generalContainer,
        padding: 15,
      }}
    >
      <SectionContainer>
        <SectionTitle text="My orders" />
      </SectionContainer>
      <Typography> hola </Typography>
      {/* <FlatList
        style={{ flex: 1 }}
        renderItem={({ item: order }) => <Typography> hola </Typography>}
        data={orders}
        keyExtractor={(order, index) => `${index}-${orders.id}`}
      /> */}
      <Loader visible={isLoading} />
    </SafeAreaView>
  );
};
