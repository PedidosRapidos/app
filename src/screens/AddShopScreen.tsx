import React from "react";
import { View, StyleSheet } from "react-native";
import { RootStackParams } from "../ui/navigation/Stack";
import { StackScreenProps } from "@react-navigation/stack";
import { useState } from "react";

import { useForm } from "../ui/hooks/useForm";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../res/globalStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BackButton } from "../ui/components/BackButton";
import { Title } from "../ui/components/Title";
import { normalizeSize, Typography } from "../res/typography";
import { colors, colorWithOpacity } from "../res/colors";
import { spacing } from "../res/spacing";
import { Input } from "../ui/components/Input";
import { MainButton } from "../ui/components/MainButton";
import { Shakeable } from "../ui/components/Shakeable";

import { Either, isLeft, isRight, left } from "fp-ts/lib/Either";
import {
  doValidate,
  ValidationComponents,
  Validations,
} from "../model/Validations";
import { record } from "fp-ts/lib/Record";
import { Loader } from "../ui/components/Loader";
import { formErrors } from "../res/translations/en";
import client from "../services/config";

interface Props extends StackScreenProps<RootStackParams, "AddShopScreen"> {}

type AddShopErrorData = { [K in keyof AddShopServiceParameters]?: string };

export const AddShopScreen = ({ navigation, route }: Props) => {
  const { sellerId } = route.params;
  const [errors, setErrors] = useState<AddShopErrorData>({});
  const [isLoading, setIsLoading] = useState(false);

  const { cbu, address, form, onChange } = useForm({
    cbu: "",
    address: "",
  });

  const addShop = async () => {
    const validationResult = validate(form);
    console.log("form/validationResult", form, validationResult);
    if (!isRight(validationResult)) {
      console.log(validationResult);
      setErrors(validationResult.left);
      console.log(validationResult.left);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const { data: shop } = await client.post(
        `/sellers/${sellerId}/shops/`,
        form
      );
      navigation.navigate("UploadProductScreen", {
        sellerId: sellerId as number,
        shopId: shop.id as number,
      });
    } catch (err: any) {
      console.error(
        "Request failed, response:",
        err.response?.data || err.message || err
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={globalStyles.generalContainer}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        style={globalStyles.innerContainer}
      >
        <BackButton />
        <Title text="Add a new Shop!" />

        <View style={{ marginTop: 8 }}>
          <Typography style={[styles.section, styles.sectionMarginBotton]}>
            Enter your shop data
          </Typography>
        </View>

        <View style={styles.inputContainer}>
          <Input
            onChangeText={(v) => onChange("cbu", v)}
            value={cbu}
            placeholder="CBU"
            error={{
              isError: errors.cbu !== undefined,
              errorMessage: errors.cbu!,
            }}
            keyboardType="numeric"
          />

          <Input
            onChangeText={(v) => onChange("address", v)}
            value={address}
            placeholder="Address"
            error={{
              isError: errors.address !== undefined,
              errorMessage: errors.address!,
            }}
          />
        </View>

        <View
          style={{
            flex: 1,
            paddingBottom: spacing.inputSpacing,
            marginTop: spacing.inputSpacing,
          }}
        >
          <Shakeable shake={Object.entries(errors).length !== 0}>
            <MainButton
              text="Add Shop"
              onPress={addShop}
              backgroundColor={colors.orange}
            />
          </Shakeable>
        </View>
      </KeyboardAwareScrollView>
      <Loader visible={isLoading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  section: {
    color: colorWithOpacity(colors.white, 0.6),
    fontSize: normalizeSize(17),
  },
  sectionMarginBotton: {
    marginBottom: (spacing.inputSpacing * 2) / 3,
  },
  inputContainer: {
    marginTop: (spacing.inputSpacing * 2) / 3,
  },
  forgotPasswordText: {
    fontSize: normalizeSize(13),
  },
});

export interface AddShopServiceParameters {
  cbu: string;
  address: string;
}

function validate(
  data: Partial<AddShopServiceParameters>
): Either<AddShopErrorData, AddShopServiceParameters> {
  const result = doValidate({
    cbu: Validations.isCBU,
    address: ValidationComponents.notNull(),
  })(data);

  if (isLeft(result)) {
    console.log(JSON.stringify(data, null, 2));
    console.log(JSON.stringify(result.left, null, 2));
  }

  if (isRight(result)) {
    //@ts-ignore
    return result;
  }

  return left(
    record.map(result.left, (error) => {
      if (error === undefined) {
        return formErrors["VALUE_MISSING"];
      }

      return formErrors[error.type];
    })
  );
}
