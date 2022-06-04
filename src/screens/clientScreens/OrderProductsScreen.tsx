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
import { normalizeSize } from "../../res/typography";
import { colors, colorWithOpacity } from "../../res/colors";
import { ProductPreview2 } from "../../ui/components/ProductPreview2";
import { Counter } from "../../ui/components/Counter";
import client from "../../services/config";

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

  const onSendReview = async () => {
    let form = { qualification: qualification };

    try {
      const { data: response } = await client.post(
        `/orders/${orderId}/product/${reviewedProductId}/review`,
        form
      );
      Alert.alert("El producto ha sido puntuado");
    } catch (err: any) {
      console.error(
        "Request failed, response:",
        err.response?.data || err.message || err
      );
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
            onReview={state === "DELIVERED" ? onReview : onReview}
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
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Leave a review of this product!
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => onSendReview()}
            >
              <Text style={styles.textStyle}>Send review</Text>
            </Pressable>
            <Counter
              counter={qualification}
              setCounter={setQualification}
            ></Counter>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
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
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
