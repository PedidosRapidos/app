import React from "react";
import {
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  Image,
  View,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { colors, colorWithOpacity } from "../../res/colors";
import { imageStyles } from "../../res/imageStyles";
import { spacing } from "../../res/spacing";
import { normalizeSize, Typography } from "../../res/typography";
import { Title } from "./Title";

import { API_URL } from "../../services/config";
interface Props {
  product: any;
}

export const ProductPreview = ({ product }: Props) => {
  console.log(`${API_URL}/products/${product.id}/image`);
  return (
    <View>
      <Image
        source={{
          uri: `${API_URL}/products/${product.id}/image?q=${new Date()}`,
        }}
        style={{ ...imageStyles.categorieIcon, width: 305, height: 159 }}
      ></Image>
      <Typography>{product.name}</Typography>
      <Typography>{product.price}</Typography>
    </View>
  );
};

const styles = StyleSheet.create({});
