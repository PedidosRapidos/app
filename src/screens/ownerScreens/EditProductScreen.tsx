import { RootStackParams } from "../../ui/navigation/Stack";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../res/globalStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Image, StyleSheet, View } from "react-native";
import { colors, colorWithOpacity } from "../../res/colors";
import { normalizeSize } from "../../res/typography";
import { spacing } from "../../res/spacing";
import { Input } from "../../ui/components/Input";
import { useForm } from "../../ui/hooks/useForm";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { MainButton } from "../../ui/components/MainButton";
import client, { imageURL } from "../../services/config";
import { SecondaryButton } from "../../ui/components/SecondaryButton";
import { SectionContainer } from "../../ui/components/SectionContainer";
import { SectionTitle } from "../../ui/components/SectionTitle";
import { useShopDetail } from "../../contexts/ShopContext";

interface Props
  extends StackScreenProps<RootStackParams, "EditProductScreen"> {}

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

export const EditProductScreen = ({ navigation, route }: Props) => {
  const { product } = route.params;
  const { productName, description, price, onChange, setForm } = useForm({
    productName: product.name,
    description: product.description,
    price: product.price.toString(),
  });

  const [_, setShop] = useShopDetail();
  const [isNewImage, setIsNewImage] = useState<any>(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  useEffect(() => {
    if (product) {
      setSelectedImage(imageURL(product));
      setForm({
        productName: product.name,
        description: product.description,
        price: product.price.toString(),
      });
    }
  }, [product.id]);

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
    setIsNewImage(true);
    setSelectedImage(pickerResult.uri);
  };

  const sendForm = async () => {
    let formData = new FormData();

    formData.append("name", productName);
    formData.append("description", description);
    formData.append("price", price);

    // Infer the type of the image
    if (isNewImage) {
      let filename = selectedImage.split("/").pop();

      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      formData.append("image", {
        uri: selectedImage,
        name: filename,
        type: type,
      });
    }

    console.log("--------------------");
    console.log(selectedImage);
    console.log("--------------------");
    const { product } = route.params;
    try {
      const { data } = await client.put(`/products/${product.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setShop((shop) => ({
        ...shop,
        products: shop.products.map((item) =>
          item.id === product.id ? data : item
        ),
      }));
      navigation.goBack();
    } catch (err: any) {
      if (err.request) {
        console.log(
          "Request failed, response:",
          err.response?.data || err.message || err
        );
      } else {
        console.log("log:", err.response?.data || err.message || err);
      }
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
          <SectionTitle text="Update your product data"></SectionTitle>
          <Input
            onChangeText={(nextProductName) =>
              onChange("productName", nextProductName)
            }
            value={productName}
            placeholder="Name"
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <SecondaryButton
                text="Pick an image"
                onPress={openImagePickerAsync}
                left={false}
              />
            </View>
            <View style={{ flex: 1 }}>
              {selectedImage && (
                <Image
                  source={{
                    uri: selectedImage,
                  }}
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
