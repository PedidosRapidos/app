import { RootStackParams } from "../../ui/navigation/Stack";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../res/globalStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, colorWithOpacity } from "../../res/colors";
import { Typography, normalizeSize } from "../../res/typography";
import { spacing } from "../../res/spacing";
import { Input } from "../../ui/components/Input";
import { useForm } from "../../ui/hooks/useForm";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { MainButton } from "../../ui/components/MainButton";
import client from "../../services/config";
import { SecondaryButton } from "../../ui/components/SecondaryButton";
import { SectionContainer } from "../../ui/components/SectionContainer";
import { SectionTitle } from "../../ui/components/SectionTitle";

interface Props
  extends StackScreenProps<RootStackParams, "UploadProductScreen"> { }

const styles = StyleSheet.create({
  section: {
    color: colorWithOpacity(colors.white, 0.6),
    fontSize: normalizeSize(17),
  },
  sectionMarginBotton: {
    marginBottom: (spacing.inputSpacing * 2) / 3,
  },
  button: {
    backgroundColor: colors.red,
    padding: 20,
    borderRadius: 5,
    width: "50%",
  },
  buttonText: {
    color: colorWithOpacity(colors.white, 0.6),
    fontSize: normalizeSize(17),
    textAlign: "center",
  },
  thumbnail: {
    width: 150,
    height: 150,
  },
});

export const UploadProductScreen = ({ navigation, route }: Props) => {
  const { productName, description, price, onChange } = useForm({
    productName: "",
    description: "",
    price: "",
  });

  const [selectedImage, setSelectedImage] = useState<any>(null);

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    console.log(pickerResult);

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage(pickerResult);
  };

  const sendForm = async () => {
    let formData = new FormData();

    formData.append("name", productName);
    formData.append("description", description);
    formData.append("price", price);

    // Infer the type of the image

    let filename = selectedImage.uri.split("/").pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    formData.append("image", {
      uri: selectedImage.uri,
      name: filename,
      type: type,
      //data: selectedImage.data
    });

    const { sellerId, shopId } = route.params;

    try {
      const respUploadProduct = await client.post(
        `/sellers/${sellerId}/shops/${shopId}/products`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(respUploadProduct);
      navigation.navigate("HomeScreenOwner", {sellerId: sellerId, sellerName: "UploadProductScreenNoTieneRouteParamsSellerName"}); // Ver que se le pasa
    } catch (err: any) {
      console.error(
        "Request failed, response:",
        err.response?.data || err.message || err
      );
    }
  };

  return (
    <SafeAreaView style={globalStyles.generalContainer}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        style={globalStyles.innerContainer}
      >
        <SectionContainer>
          <SectionTitle text="Enter product data"></SectionTitle>
          <Input
            onChangeText={(nextProductName) =>
              onChange("productName", nextProductName)
            }
            value={productName}
            placeholder="Product Name"
          />
          <Input
            onChangeText={(nextDescription) =>
              onChange("description", nextDescription)
            }
            value={description}
            placeholder="Description"
          />
          <Input
            onChangeText={(nextPrice) => onChange("price", nextPrice)}
            value={price}
            placeholder="Price"
          />
        </SectionContainer>
        <SectionContainer>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            }}>
            <View style={{flex: 1}}>
              <SecondaryButton
                text="Pick an image"
                onPress={openImagePickerAsync}
                left={false}
              />
            </View>
            <View style={{flex: 1}}>
              {selectedImage && (
                <Image
                  source={{ uri: selectedImage.uri }}
                  style={styles.thumbnail}
                />
              )}
            </View>
          </View>
        </SectionContainer>
          <MainButton
            text="Confirm"
            onPress={() => sendForm()}
            backgroundColor={colors.orange}
          />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
