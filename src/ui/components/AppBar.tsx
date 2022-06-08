import React, { PropsWithChildren } from "react";
import { Appbar, Badge } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../res/colors";
import { useCart } from "../../contexts/CartContext";
import { useNavigation } from "@react-navigation/native";

interface Props<T> {
  onPress: () => void;
  onPressOptions: () => void;
}

export const AppBar = ({ onPress, onPressOptions }:Props<any>) => {
  const [cart] = useCart();
  const products = cart?.products || [];
  return (
    <View>

      <Appbar style={styles.appBar}>
      <Appbar.Action
          icon="menu"
          onPress={onPressOptions}
          style={styles.icon}
        />
        <Appbar.Action
          icon="cart"
          onPress={onPress}
          style={styles.icon}
        />
        <Badge style={styles.badge}>{products.length}</Badge>
      </Appbar>
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: colors.black,
    //justifyContent: "flex-end"
  },
  icon: {},
  badge: {
    alignSelf: "flex-start",
  },
});
