import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../res/globalStyles";
import { SectionTitle } from "../../ui/components/SectionTitle";
import { SectionContainer } from "../../ui/components/SectionContainer";
import { RootStackParams } from "../../ui/navigation/Stack";
import { StackScreenProps } from "@react-navigation/stack";
import { Product, useCart } from "../../contexts/CartContext";
import { CartProductPreview } from "../../ui/components/CartProductPreview";
import {
  BoldTypography,
  LightTypography,
  normalizeSize,
  Typography,
} from "../../res/typography";
import { MainButton } from "../../ui/components/MainButton";
import { Picker } from "@react-native-picker/picker";
import { colors, colorWithOpacity } from "../../res/colors";
import client from "../../services/config";
import { useUser } from "../../contexts/UserContext";
import { useForm } from "../../ui/hooks/useForm";
import { Input } from "../../ui/components/Input";
import { Portal, Modal } from "react-native-paper";
import { Column, Row } from "../../ui/components/Layout";
import Icon from "react-native-vector-icons/FontAwesome5";

interface Props extends StackScreenProps<RootStackParams, "CheckOutScreen"> {}

export const CheckOutScreen = ({ navigation }: Props) => {
  const [cart] = useCart();
  const user = useUser();
  const products = cart?.products || [];
  const [selectedField, setSelectedField] = useState("cash");
  const [showOrderOk, setShowOrderOk] = useState(false);

  const { address, onChange } = useForm({
    address: "",
  });

  const total = products
    .map(({ price, quantity }: Product) => price * quantity)
    .reduce((acc, v) => acc + v, 0);

  const displayProductDetails = (item: any) => {
    navigation.navigate("ProductDetailScreen", {
      product: item,
    });
  };

  const checkoutDone = async () => {
    try {
      navigation.reset({ index: 0, routes: [{ name: "HomeScreenClient" }] });
      const { data: userResponse } = await client.get(`/users/${user.id}`);
      user.updateCartId(userResponse.cartId);
    } catch (err) {
      console.log(
        "Request failed, response:",
        err.response?.data || err.message || err
      );
    }
  };

  useEffect(() => {
    setShowOrderOk(false);
  }, [cart, user]);

  const order = async () => {
    try {
      await client.post(`/orders/${user.id}`, {
        payment_method: selectedField,
        address: address,
      });
      setShowOrderOk(true);
    } catch (err: any) {
      console.log(
        "Request failed, response:",
        err.response?.data || err.message || err
      );
    }
  };
  return (
    <SafeAreaView
      style={{
        ...globalStyles.generalContainer,
        ...globalStyles.innerContainer,
      }}
    >
      <Portal>
        <Modal
          visible={showOrderOk}
          onDismiss={checkoutDone}
          contentContainerStyle={{ padding: 40 }}
        >
          <Column
            style={{
              paddingHorizontal: "10%",
              paddingVertical: "10%",
              justifyContent: "space-evenly",
              borderRadius: 10,
              backgroundColor: colors.black,
            }}
          >
            <BoldTypography>Thank you for your purchase!</BoldTypography>
            <Row style={{ justifyContent: "space-between" }}>
              <Typography>Your order has been accepted</Typography>
              <Icon name="check" size={15} color={colors.white} />
            </Row>
            <MainButton text="Ok" onPress={checkoutDone} />
          </Column>
        </Modal>
      </Portal>
      <SectionContainer>
        <SectionTitle text="Check out" />
      </SectionContainer>
      <FlatList
        renderItem={({ item: product }) => (
          <CartProductPreview
            product={product}
            onDetails={displayProductDetails}
            onDelete={cart.remove}
          />
        )}
        data={products}
        keyExtractor={(product, index) => `${index}-${product.id}`}
      />
      <View
        style={{
          ...styles.totalPriceContainer,
          ...globalStyles.thinSeparator,
        }}
      >
        <BoldTypography style={{ fontSize: 24 }}>{`Total `}</BoldTypography>
        <BoldTypography
          style={{ fontSize: 24 }}
        >{`$ ${total} `}</BoldTypography>
      </View>
      <SectionContainer>
        <View
          style={{
            ...styles.paymentMethodContainer,
            ...globalStyles.thinSeparator,
          }}
        >
          <LightTypography style={styles.paymentText}>
            Payment method
          </LightTypography>
          <View style={styles.section}>
            <Picker
              selectedValue={selectedField}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedField(itemValue)
              }
            >
              <Picker.Item label="Cash" value="cash" />
            </Picker>
          </View>
        </View>
        <View
          style={{
            ...styles.paymentMethodContainer,
            ...styles.bottomThinSeparator,
            alignItems: "center",
          }}
        >
          <LightTypography>Address</LightTypography>
          <View style={{ flex: 0.6 }}>
            <Input
              onChangeText={(nextAddressName) =>
                onChange("address", nextAddressName)
              }
              value={address}
              placeholder="your address"
            />
          </View>
        </View>
        <MainButton text="Order" onPress={order}></MainButton>
      </SectionContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  paymentText: {
    alignSelf: "center",
  },
  totalPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paymentMethodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  section: {
    flex: 0.5,
    color: colors.black,
    fontSize: normalizeSize(10),
    backgroundColor: colorWithOpacity(colors.white, 0.8),
    marginTop: 5,
    marginBottom: 10,
  },
  bottomThinSeparator: {
    borderBottomColor: colorWithOpacity(colors.grayLight, 0.5),
    borderBottomWidth: 1,
  },
});
