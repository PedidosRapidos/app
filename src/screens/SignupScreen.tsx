import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { RootStackParams } from "../ui/navigation/Stack";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../res/globalStyles";
import { BackButton } from "../ui/components/BackButton";
import { colors, colorWithOpacity } from "../res/colors";
import { Title } from "../ui/components/Title";
import { Typography, normalizeSize } from "../res/typography";
import { Input } from "../ui/components/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm } from "../ui/hooks/useForm";
import { spacing } from "../res/spacing";
import Checkbox from "expo-checkbox";
import { MainButton } from "../ui/components/MainButton";
import { Shakeable } from "../ui/components/Shakeable";
import { record } from "fp-ts/lib/Record";
import { Either, isLeft, isRight, left } from "fp-ts/lib/Either";

import {
  Validations,
  ValidationComponents,
  doValidate,
} from "../model/Validations";

import { Loader } from "../ui/components/Loader";
import { formErrors } from "../res/translations/en";
import client from "../services/config";

export interface SignUpServiceParameters {
  userName: string;
  email: string;
  isOwner: boolean;
  isCLient: boolean;
  password: string;
}

export interface SignupFieldData extends SignUpServiceParameters {
  confirmPassword: string;
}

type SignupErrorData = { [K in keyof SignupFieldData]?: string };

interface Props extends StackScreenProps<RootStackParams, "SignupScreen"> {}

export const SignupScreen = ({ navigation }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<SignupErrorData>({});

  const {
    userName,
    email,
    password,
    confirmPassword,
    isOwner,
    isCLient,
    onChange,
    form,
  } = useForm({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    isOwner: false,
    isCLient: false,
  });

  const trySingup = async () => {
    const validationResult = validate(form);
    if (!isRight(validationResult)) {
      setErrors(validationResult.left);
      return;
    }
    setIsLoading(true);
    setErrors({});

    try {
      const { data: respSignUp } = await client.post("/sellers/", form);
      console.log(respSignUp);
      if (form.isOwner) {
        navigation.navigate("AddShopScreen", { sellerId: respSignUp.id });
      } else {
        navigation.navigate("SigninScreen", { email, password });
      }
    } catch (err: any) {
      console.error(
        "Request failed, response:",
        err.response?.data || err.message || err
      );
    } finally {
      //TODO: ver si salta update state on unmounted component
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
        <Title text="Let's get started!" />

        <View style={{ marginTop: 8 }}>
          <Typography style={[styles.section, styles.sectionMarginBotton]}>
            Enter your data to sign up
          </Typography>
        </View>
        <Input
          onChangeText={(nextUserName) => onChange("userName", nextUserName)}
          value={userName}
          placeholder="User Name"
          error={{
            isError: errors.userName !== undefined,
            errorMessage: errors.userName!,
          }}
        />

        <Input
          onChangeText={(nextEmail) => onChange("email", nextEmail)}
          value={email}
          placeholder="Email"
          error={{
            isError: errors.email !== undefined,
            errorMessage: errors.email!,
          }}
          keyboardType="email-address"
        />

        <Input
          onChangeText={(nextPassword) => onChange("password", nextPassword)}
          value={password}
          placeholder="Password"
          error={{
            isError: errors.password !== undefined,
            errorMessage: errors.password!,
          }}
          allowSecureTextEntry
        />

        <Input
          onChangeText={(nextConfirmPassword) =>
            onChange("confirmPassword", nextConfirmPassword)
          }
          value={confirmPassword}
          placeholder="Confirm password"
          error={{
            isError: errors.confirmPassword !== undefined,
            errorMessage: errors.confirmPassword!,
          }}
          allowSecureTextEntry
        />

        <Typography style={[styles.section, styles.sectionMarginBotton]}>
          Select the roles that apply:
        </Typography>

        <View
          style={{
            flexDirection: "row",
            marginBottom: spacing.sectionSpacing,
            justifyContent: "space-around",
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Checkbox
              value={isOwner}
              onValueChange={(value) => onChange("isOwner", value)}
              color={isOwner ? colors.orange : colors.gray}
              style={{
                marginRight: spacing.paddingHorizontal / 4,
                marginTop: "4%",
              }}
            />

            <Typography style={styles.section}>Seller</Typography>
          </View>

          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Checkbox
              value={isCLient}
              onValueChange={(value) => onChange("isCLient", value)}
              color={isCLient ? colors.orange : colors.gray}
              style={{
                marginRight: spacing.paddingHorizontal / 4,
                marginTop: "4%",
              }}
            />
            <Typography style={styles.section}>Buyer</Typography>
          </View>
        </View>

        <Shakeable shake={Object.entries(errors).length !== 0}>
          <MainButton
            text="Sign up"
            onPress={trySingup}
            backgroundColor={colors.orange}
            disable={!isCLient && !isOwner}
          />
        </Shakeable>
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
});

function validate(
  data: Partial<SignupFieldData>
): Either<SignupErrorData, SignUpServiceParameters> {
  const result = doValidate({
    userName: Validations.isUserName,
    email: Validations.isEmail,
    password: Validations.isPassword,
    confirmPassword: ValidationComponents.combine(
      ValidationComponents.equalTo(data.password, {
        type: "PASSWORD_MISMATCH",
      } as const),
      ValidationComponents.notNull()
    ),
    isCLient: ValidationComponents.combine(
      ValidationComponents.atLeastOneSelected(data.isOwner, {
        type: "ROLE_MISSING",
      } as const),
      ValidationComponents.notNull()
    ),
    isOwner: ValidationComponents.combine(
      ValidationComponents.atLeastOneSelected(data.isCLient, {
        type: "ROLE_MISSING",
      } as const),
      ValidationComponents.notNull()
    ),
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
