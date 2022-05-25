import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { RootStackParams } from "../../ui/navigation/Stack";
import { StackScreenProps } from "@react-navigation/stack";

import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../res/globalStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { normalizeSize, Typography } from "../../res/typography";
import { colors, colorWithOpacity } from "../../res/colors";
import { spacing } from "../../res/spacing";
import { imageStyles } from "../../res/imageStyles";
import { API_URL } from "../../services/config";
import Icon from "react-native-vector-icons/AntDesign";
import { useShopDetail } from "../../contexts/ShopContext";

interface Props
  extends StackScreenProps<RootStackParams, "OrderDetailScreenOwner"> {}

export const OrderDetailScreenOwner = ({ navigation, route }: Props) => {
  const { id: orderId } = route.params.order;

  return (
    <SafeAreaView style={globalStyles.generalContainer}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        style={globalStyles.innerContainer}
      >
        <Typography>TODO</Typography>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
