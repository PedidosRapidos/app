import React, { useState } from "react";
import { FlatList, View, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from '../../res/globalStyles';
import { SectionTitle } from "../../ui/components/SectionTitle";
import { SectionContainer } from "../../ui/components/SectionContainer";
import { RootStackParams } from "../../ui/navigation/Stack";
import { StackScreenProps } from "@react-navigation/stack";
import { Product, useCart } from "../../contexts/CartContext";
import { CartProductPreview } from "../../ui/components/CartProductPreview";
import { BoldTypography, LightTypography, normalizeSize } from '../../res/typography';
import { MainButton } from "../../ui/components/MainButton";
import { Picker } from "@react-native-picker/picker";
import { colors, colorWithOpacity } from '../../res/colors';
import client from "../../services/config";
import { useUser } from '../../contexts/UserContext';

interface Props extends StackScreenProps<RootStackParams, "CheckOutScreen"> {}

export const CheckOutScreen = ({ navigation }: Props) => {
  const [cart] = useCart();
  const user = useUser();
  
  const products = cart?.products || [];
  const [selectedField, setSelectedField] = useState("cash");

  const total = products
    .map(({ price, quantity }: Product) => price * quantity)
    .reduce((acc, v) => acc + v, 0);
  
  const displayProductDetails = (item: any) => {
    navigation.navigate("ProductDetailScreen", {
      product: item,
    });
  };

  const order = async () => {

    let form = {"payment_method": selectedField};
    
    try {

      const { data: response } = await client.post(
        `/orders/${user.id}`,
        form
      );
      //fetcheo la nueva data del user que tiene un nuevo cartid
      const { data: userResponse } = await client.get(
        `/users/${user.id}`
      )
      user.updateCartId(userResponse.cartId)
      navigation.navigate("HomeScreenClient"); 

    } catch (err: any) {

      console.error(
        "Request failed, response:",
        err.response?.data || err.message || err
      );

    }
  };

  return (
    <SafeAreaView style={{...globalStyles.generalContainer, ...globalStyles.innerContainer}}>
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
      

        <View style={{...styles.totalPriceContainer, ...globalStyles.thinSeparator}}>
            <BoldTypography style={{ fontSize: 24 }}>{`Total `}</BoldTypography>
            <BoldTypography style={{ fontSize: 24 }}>{`$ ${total} `}</BoldTypography>
        </View>

      <SectionContainer>
        <View style={{...styles.paymentMethodContainer, ...globalStyles.thinSeparator}}>
          <LightTypography style={styles.paymentText}>Payment method</LightTypography>
          <Picker
            style={styles.section}
            selectedValue={selectedField}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedField(itemValue)
            }
          >
            <Picker.Item label="Cash" value="cash" />
          </Picker>
        </View>
          <MainButton text="Order" onPress={order}></MainButton>
      </SectionContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  paymentText:{
    alignSelf: "center",
  },
  totalPriceContainer:{
    flexDirection: "row",
    justifyContent: "space-between"
  },
  paymentMethodContainer:{
    flexDirection: "row",
    justifyContent: "space-between",
  },
  section: {
    flex:0.5,
    color: colors.blue,
    fontSize: normalizeSize(17),
    backgroundColor: colorWithOpacity(colors.black, 0.8)
  },

})