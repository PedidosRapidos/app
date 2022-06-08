import React, { PropsWithChildren } from "react";
import { Appbar, Badge } from "react-native-paper";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../res/colors";
import { useCart } from "../../contexts/CartContext";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export const AppBar = () => {
  const [cart] = useCart();
  const products = cart?.products || [];
  const navigation = useNavigation();

  return (
      <TouchableOpacity
        onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}
        style={styles.appBar}
      >
        <Icon name="cart" size={25} color={colors.white} />
        <Badge style={styles.badge} size={15}>{products.length}</Badge>
      </TouchableOpacity>
    
  );
};

const styles = StyleSheet.create({
  appBar: {
    flexDirection: "row",
    marginRight: 10,
  },
  icon: {},
  badge: {
    alignSelf: "flex-start",
  },
});
