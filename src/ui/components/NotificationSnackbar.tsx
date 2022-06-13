import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Snackbar } from "react-native-paper";
import { useNotification } from "../../contexts/NotificationContext";
import { useUser } from "../../contexts/UserContext";
import { colors } from "../../res/colors";
import client from "../../services/config";

export const NotificationSnackbar = () => {
  const navigation = useNavigation<any>();
  const user = useUser();
  const { notification, clearNotification } = useNotification();
  const { title, data } = notification || {};
  const dismiss = () => clearNotification();
  const moreInfo = async () => {
    if (user.isClient && data?.order_id) {
      try {
        const { data: order } = await client.get(`/orders/${data?.order_id}`);
        navigation.navigate("OrderDetailScreen", { order });
      } catch (e) {
        console.log(e);
      }
    }
    if (user.isOwner && data?.shop_id) {
      switch (data.action) {
        case "product_review":
          navigation.navigate("ShopProductsScreen", {
            shopData: { id: data.shop_id },
            sellerId: data.seller_id,
          });
          break;
        case "new_order":
          navigation.navigate("OrdersScreenOwner", { shopId: data.shop_id });
          break;
        default:
          break;
      }
    }
  };
  return (
    <Snackbar
      duration={3000}
      style={{ backgroundColor: colors.orange }}
      visible={notification !== undefined}
      onDismiss={dismiss}
      action={{
        color: colors.white,
        label: "More",
        onPress: moreInfo,
      }}
    >
      {title}
    </Snackbar>
  );
};
