import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { PropsWithChildren } from "react";
import { View } from "react-native";
import { useCart } from "../../contexts/CartContext";
import { useUser } from "../../contexts/UserContext";
import { globalStyles } from "../../res/globalStyles";
import { Typography } from "../../res/typography";
import { MainButton } from "../components/MainButton";

export const DrawerContent = ({ navigation }: PropsWithChildren<any>) => {
  const user = useUser();
  const [cart] = useCart();
  const cartCount = cart?.products?.length ? `(${cart?.products?.length})` : "";
  return (
    <DrawerContentScrollView style={globalStyles.drawerContainer}>
      <View style={{ flex: 2 }}></View>
      <View style={{ flex: 2 }}>
        <Typography style={{ flex: 2, marginBottom: 10, margin: 5 }}>
          {" "}
          Welcome {user?.username}!{" "}
        </Typography>
        {user?.isClient && (
          <MainButton
            text={`My Cart ${cartCount}`}
            onPress={() => navigation.navigate("CartScreen")}
          />
        )}
        <MainButton text="Logout" onPress={user!.logout} />
      </View>
    </DrawerContentScrollView>
  );
};
