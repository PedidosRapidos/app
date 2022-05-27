import React from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../res/globalStyles";
import { SectionTitle } from "../../ui/components/SectionTitle";
import { SectionContainer } from "../../ui/components/SectionContainer";
import { RootStackParams } from "../../ui/navigation/Stack";
import { StackScreenProps } from "@react-navigation/stack";
import { useUser } from "../../contexts/UserContext";
import { OrderPreview } from "../../ui/components/OrderPreview";

interface Props
  extends StackScreenProps<RootStackParams, "OrderHistoryScreen"> {}

export const OrderHistoryScreen = ({ navigation, route }: Props) => {
  const user = useUser();
  const orders = [
    { id: 1, cart: { products: [{ id: 1, name: "product_name" }] } },
  ];
  return (
    <SafeAreaView
      style={{
        ...globalStyles.generalContainer,
        padding: 15,
      }}
    >
      <SectionContainer>
        <SectionTitle text="Order History" />
      </SectionContainer>

      <FlatList
        style={{ flex: 1 }}
        renderItem={({ item: order }) => <OrderPreview order={order} />}
        data={orders}
      />
    </SafeAreaView>
  );
};
