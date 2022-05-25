import React, { useState } from "react";
import { FlatList, View, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../res/globalStyles";
import { SectionTitle } from "../../ui/components/SectionTitle";
import { SectionContainer } from "../../ui/components/SectionContainer";
import { RootStackParams } from "../../ui/navigation/Stack";
import { StackScreenProps } from "@react-navigation/stack";
import { Product, useCart } from "../../contexts/CartContext";
import { CartProductPreview } from "../../ui/components/CartProductPreview";
import { BoldTypography, Typography, ThinTypography, LightTypography, normalizeSize } from '../../res/typography';
import { MainButton } from "../../ui/components/MainButton";
import { SecondaryButton } from "../../ui/components/SecondaryButton";
import { Picker } from "@react-native-picker/picker";
import { colors, colorWithOpacity } from '../../res/colors';

interface Props extends StackScreenProps<RootStackParams, "CheckOutScreen"> {}

export const CheckOutScreen = ({ navigation }: Props) => {
  const [cart] = useCart();
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

  const DoNothing = () => {

  }

  return (
    <SafeAreaView style={globalStyles.generalContainer}>
        <View style={globalStyles.innerContainer}>
            <SectionContainer>
                <SectionTitle text="Check out" />
            </SectionContainer>
            <FlatList
                style={{ flex: 1 }}
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
            <SectionContainer>
                <View style={{...styles.totalPriceContainer, ...globalStyles.thinSeparator}}>
                    <BoldTypography style={{ fontSize: 30 }}>{`Total `}</BoldTypography>
                    <BoldTypography style={{ fontSize: 30 }}>{`$ ${total} `}</BoldTypography>
                </View>
            </SectionContainer>
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

                <MainButton text="Order" onPress={DoNothing}></MainButton>
            </SectionContainer>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  paymentText:{
    alignSelf: "center",
  },
  totalPriceContainer:{
    flexDirection: "row",
    justifyContent: "space-between",
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