import React from "react";
import { View, StyleSheet } from "react-native";
import { RootStackParams } from "../../ui/navigation/Stack";
import { StackScreenProps } from "@react-navigation/stack";
import { useState } from "react";

import { useForm } from "../../ui/hooks/useForm";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../res/globalStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BackButton } from "../../ui/components/BackButton";
import { Title } from "../../ui/components/Title";
import { normalizeSize, Typography } from "../../res/typography";
import { colors, colorWithOpacity } from "../../res/colors";
import { spacing } from "../../res/spacing";
import { Input } from "../../ui/components/Input";
import { MainButton } from "../../ui/components/MainButton";
import { Shakeable } from "../../ui/components/Shakeable";

import { isRight } from "fp-ts/lib/Either";
import {
  createValidator,
  ValidationComponents,
  Validations,
} from "../../model/Validations";
import { Loader } from "../../ui/components/Loader";
import client from "../../services/config";

interface Props extends StackScreenProps<RootStackParams, "AddShopScreen"> {}

export interface AddShopForm {
  name: string;
  cbu: string;
  address: string;
}

const validateShopForm = createValidator({
  name: ValidationComponents.notNull(),
  cbu: Validations.isCBU,
  address: ValidationComponents.notNull(),
});

export const AddShopScreen = ({ navigation, route }: Props) => {
  const { sellerId , shops} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<AddShopForm>>({});
  const { name, cbu, address, form, onChange } = useForm<AddShopForm>({
    name: "",
    cbu: "",
    address: "",
  });

  const addShop = async () => {
    const validationResult = validateShopForm(form);
    console.log("form/validationResult", form, validationResult);
    if (!isRight(validationResult)) {
      setErrors(validationResult.left);
      console.log("validation errors", validationResult.left);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const { data: shop } = await client.post(
        `/sellers/${sellerId}/shops/`,
        form
      );
      /**Hago una copia del shops por parametro, lo actualizo y lo paso por params en el navigate */
      let updatedShops = shops.slice();
      updatedShops.push(shop)
      
      // TODO: cambiar por un pop() si es posible pq si no, te permite navegar de nuevo a esta screen desde el home y te quedas atrapado
      navigation.navigate({name: "HomeScreenOwner", params:{
        shops: updatedShops
      }, merge:true})
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
            onChangeText={(v) => onChange("name", v)}
            value={name}
            placeholder="Name"
            error={errors.name}
          />

          <Input
            onChangeText={(v) => onChange("cbu", v)}
            value={cbu}
            placeholder="CBU"
            error={errors.cbu}
            keyboardType="numeric"
          />

          <Input
            onChangeText={(v) => onChange("address", v)}
            value={address}
            placeholder="Address"
            error={errors.address}
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
