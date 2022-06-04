import React, { useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Modal,
  Text,
  Pressable,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../res/globalStyles";
import { SectionTitle } from "../../ui/components/SectionTitle";
import { SectionContainer } from "../../ui/components/SectionContainer";
import { RootStackParams } from "../../ui/navigation/Stack";
import { StackScreenProps } from "@react-navigation/stack";
import {
  MediumTypography,
  normalizeSize,
  sizes,
  Typography,
} from "../../res/typography";
import { colors, colorWithOpacity } from "../../res/colors";
import { ProductPreview2 } from "../../ui/components/ProductPreview2";
import { Counter } from "../../ui/components/Counter";
import client from "../../services/config";
import { MainButton } from "../../ui/components/MainButton";

interface Props
  extends StackScreenProps<RootStackParams, "OrderProductsScreen"> {}

export const OrderProductsScreen = ({ navigation, route }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [qualification, setQualification] = useState(1);
  const [reviewedProductId, setReviewedProductId] = useState(0);

  const orderId = route.params?.order.id;
  const products = route.params?.order.cart.products;
  const state = route.params?.order.state;

  const onReview = (product: any) => {
    setReviewedProductId(product.id);
    setModalVisible(true);
  };

  const sendReview = async () => {
    let form = { qualification: qualification };

    try {
      const { data: response } = await client.post(
        `/orders/${orderId}/product/${reviewedProductId}/review`,
        form
      );
      Alert.alert("Your review was sent!");

    } catch (err: any) {
      console.error(
        "Request failed, response:",
        err.response?.data || err.message || err
      );
      
    } finally {
      setModalVisible(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        ...globalStyles.generalContainer,
        ...globalStyles.innerContainer,
      }}
    >
      <SectionContainer>
        <SectionTitle text="Order products" />
      </SectionContainer>
      <FlatList
        renderItem={({ item: product }) => (
          <ProductPreview2
            product={product}
            onReview={state === "DELIVERED" ? onReview : undefined}
          />
        )}
        data={products}
        keyExtractor={(product, index) => `${index}-${product.id}`}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Typography style={styles.textStyle}>
              Review product
            </Typography>
            <Counter
              counter={qualification}
              setCounter={setQualification}
              max={5}
              style={styles.counter}
              buttonsStyles={styles.counter}
            ></Counter>
            <View style={styles.optionsRow}>
            <MainButton 
            text="Review" 
            onPress={sendReview}
            style={[styles.buttonSize]} />
            <MainButton
              text="Cancel"
              onPress={() => setModalVisible(!modalVisible)}
              style={[styles.cancelButton, styles.buttonSize]}
              textStyle={styles.cancelButtonText}
            />
            </View>
          </View>
        </View>
      </Modal>
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
    color: colors.blue,
    fontSize: normalizeSize(17),
    backgroundColor: colorWithOpacity(colors.black, 0.8),
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: colorWithOpacity(colors.popupBackgroundGray, 1.0),
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    fontSize: sizes.popUp,
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  counter:{
    backgroundColor: colors.popupBackgroundGray,
    marginVertical: 5,
  },
  optionsRow:{
    flexDirection:"row",
  },
  buttonSize:{
    width: 100,
    marginHorizontal: 5,
  },
  cancelButton:{
    backgroundColor: colorWithOpacity(colors.popupBackgroundGray, 1.0),
    borderColor: colors.orange,
    borderWidth: 1,
  },
  cancelButtonText:{
    color: colorWithOpacity(colors.orange, 1.0),
  }

});
