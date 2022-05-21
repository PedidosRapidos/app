import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { PropsWithChildren } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { useCart } from "../../contexts/CartContext";
import { useUser } from "../../contexts/UserContext";
import { globalStyles } from "../../res/globalStyles";
import { Typography } from "../../res/typography";
import Icon from "react-native-vector-icons/FontAwesome5";

export const DrawerContent = ({ navigation }: PropsWithChildren<any>) => {
  const user = useUser();
  const [cart] = useCart();
  const cartCount = cart?.products?.length ? `(${cart?.products?.length})` : "";
  return (
    <DrawerContentScrollView style={globalStyles.drawerContainer}>
      <View style={{ flex: 2 }}></View>
      <View style={styles.container}>
        <Typography style={styles.welcome}>
          {" "}
          Welcome {user?.username}!{" "}
        </Typography>
        {user?.isClient && (
          <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
            <View style={styles.divider}>
              <Icon name="shopping-cart" size={20} style={styles.icon} />
              <Typography style={styles.option}>
                {`My Cart ${cartCount}`}
              </Typography>
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={user!.logout}>
          <View style={styles.divider}>
            <Icon name="power-off" size={20} style={styles.icon} />
            <Typography style={styles.option}>Logout</Typography>
          </View>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  welcome: {
    flex: 2,
    marginBottom: 10,
    margin: 5,
    fontSize: 26,
    paddingVertical: 10,
  },
  option: {
    fontSize: 24,
    textAlign: "left",
    paddingHorizontal: 10,
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: "gray",
    flexDirection: "row",
    paddingVertical: 10,
    display: "flex",
    alignItems: "center",
  },
  icon: {
    color: "white",
    textAlign: "center",
    paddingHorizontal: 10,
  },
  container: { flex: 2 },
});
