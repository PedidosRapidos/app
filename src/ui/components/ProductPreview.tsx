import React from "react";
import { KeyboardTypeOptions, StyleSheet, TextInput, Image, View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { colors, colorWithOpacity } from "../../res/colors";
import { imageStyles } from "../../res/imageStyles";
import { spacing } from "../../res/spacing";
import { normalizeSize, Typography } from "../../res/typography";
import { Title } from "./Title";

interface Props {
    product: any;
  }
  

export const ProductPreview = ({product} : Props) => {
    return (
        <View>
            <Image source={require("../../res/img/Carne.png")} style={imageStyles.categorieIcon}></Image>
            <Typography>{product.name}</Typography>
            <Typography>{product.price}</Typography>
        </View>
    )

}

const styles = StyleSheet.create({

});
