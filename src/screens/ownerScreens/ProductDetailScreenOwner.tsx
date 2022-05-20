import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { RootStackParams } from "../../ui/navigation/Stack";
import { StackScreenProps } from "@react-navigation/stack";

import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../res/globalStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { normalizeSize, Typography } from "../../res/typography";
import { colors, colorWithOpacity } from "../../res/colors";
import { spacing } from "../../res/spacing";
import { imageStyles } from "../../res/imageStyles";
import { API_URL } from "../../services/config";

interface Props
  extends StackScreenProps<RootStackParams, "ProductDetailScreen"> {}

const styles = StyleSheet.create({
  section: {
    color: colorWithOpacity(colors.white, 0.6),
    fontSize: normalizeSize(17),
    textDecorationLine: "underline",
  },
  sectionMarginBotton: {
    marginBottom: (spacing.inputSpacing * 2) / 6,
  },
  textSection: {
    fontSize: normalizeSize(17),
  },
  buttonContainer: {
    borderWidth: 5,
    borderColor: colorWithOpacity(colors.orange, 0.08),
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 15,
    height: 40,
    width: 100,
    backgroundColor: colors.orange,
    marginVertical: spacing.paddingVertical / 3,
    marginHorizontal: spacing.paddingHorizontal / 2,
  },
  buttonText: {
    color: colors.white,
    textAlign: "center",
  },
});

export const ProductDetailScreenOwner = ({ navigation, route }: Props) => {
  const { product } = route.params;
  return (
    <SafeAreaView style={globalStyles.generalContainer}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        style={globalStyles.innerContainer}
      >
        <View style={{ marginTop: 50 }}>
          <Image
            source={{
              uri: `${API_URL}/products/${product.id}/image?q=${new Date()}`,
            }}
            style={{
              ...imageStyles.categorieIcon,
              width: 450,
              height: 250,
              borderWidth: 2,
              borderColor: colors.popupBackground,
              marginBottom: (spacing.inputSpacing * 2) / 6,
              alignSelf: "center",
            }}
          ></Image>
          <Typography style={[styles.section]}>Name:</Typography>
          <Typography style={[styles.textSection, styles.sectionMarginBotton]}>
            {product.name}
          </Typography>
          <Typography style={[styles.section]}>Price:</Typography>
          <Typography style={[styles.textSection, styles.sectionMarginBotton]}>
            {product.price}
          </Typography>
          <Typography style={[styles.section]}>Description:</Typography>
          <Typography style={[styles.textSection, styles.sectionMarginBotton]}>
            {product.description}
          </Typography>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};