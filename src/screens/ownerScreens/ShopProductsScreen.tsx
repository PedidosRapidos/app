import { StyleSheet, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../res/globalStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useEffect, useState } from "react";
import { Typography } from "../../res/typography";
import { colors } from "../../res/colors";
import { SectionTitle } from "../../ui/components/SectionTitle";
import { SectionContainer } from "../../ui/components/SectionContainer";
import { MainButton } from "../../ui/components/MainButton";
import client from "../../services/config";
import { Loader } from "../../ui/components/Loader";
import { RootStackParams } from "../../ui/navigation/Stack";
import { StackScreenProps } from "@react-navigation/stack";
import { ShopPreview } from "../../ui/components/ShopPreview";
import { ProductPreview } from '../../ui/components/ProductPreview';

interface Props extends StackScreenProps<RootStackParams, "ShopProductsScreen"> {}

export const ShopProductsScreen = ({ navigation, route }: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<any>([]);
  
  const params = route.params;
  

  const getShopProducts = async () => {
    setIsLoading(true);
    try {
      const { data: products } = await client.get(
        `/shops/${params.shopId}/products`
      );
      // TODO: backend devuelve un json con un atributo products que es una lista en vez de una lista directamente
      setProducts(products.products);
    } catch (err: any) {
      console.error(
        "Request failed, response:",
        err.response?.data || err.message || err
      );
    } finally {
      setIsLoading(false);
    }
  };

  const doNothing = () => {

  }

  const navigateToUploadProductScreen = () => {
    navigation.navigate("UploadProductScreen", {
        sellerId: params.sellerId,
        shopId: params.shopId,
      })
  }

  useEffect(() => {
    getShopProducts();
  }, []);

  return (
    <SafeAreaView style={globalStyles.generalContainer}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        style={globalStyles.innerContainer}
      >
        <SectionContainer>
            <SectionTitle text="Shop" />
            <Typography> TODO: Show some shop info </Typography>
        </SectionContainer>
        <SectionContainer>
            <SectionTitle text="My products" />
            {products.length != 0 ? (
                null
            ) : (
                <Typography>You do not have any product in this shop</Typography>
            )}
            {products.map((item: any, index: any) => (
                <View key={item.id}>
                <ProductPreview 
                    // TODO: ProductPreview con render condicional dependiendo de si le paso o no un OnCart? de manera de reutilizar el componente
                    product={item} 
                    onDetails={doNothing} 
                    onCart={doNothing}/>
                </View>
            ))}
        </SectionContainer>
        <SectionContainer>
          <MainButton
            // TODO: como hago para que el agregar producto me navegue de vuelta al shop desde donde viene y no vaya de nuevo al HomeSCreen?
            // es decir, si el shop 1 sube un producto, vuelvo al screen del shop 1 (parametrizar la navegacion)
            text="Add product"
            onPress={navigateToUploadProductScreen}
            backgroundColor={colors.orange}
          />
        </SectionContainer>
      </KeyboardAwareScrollView>
      <Loader visible={isLoading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});
