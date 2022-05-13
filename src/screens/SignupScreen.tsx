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
import { isRight } from "fp-ts/lib/Either";

import {
  Validations,
  ValidationComponents,
  createValidator,
} from "../model/Validations";

import { Loader } from "../ui/components/Loader";
import client from "../services/config";
import { ErrorPopUp } from "../ui/components/ErrorPopUp";
import { useToggle } from "../ui/hooks/useToggle";

export interface SignUpServiceParameters {
  username: string;
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

const validateSignupForm = createValidator((data) => ({
  username: Validations.isUserName,
  email: Validations.isEmail,
  password: Validations.isPassword,
  confirmPassword: ValidationComponents.combine(
    ValidationComponents.equalTo(data.password, {
      type: "PASSWORD_MISMATCH",
    } as const),
    ValidationComponents.notNull()
  ),
  isClient: ValidationComponents.combine(
    ValidationComponents.atLeastOneSelected(data.isOwner, {
      type: "ROLE_MISSING",
    } as const),
    ValidationComponents.notNull()
  ),
  isOwner: ValidationComponents.combine(
    ValidationComponents.atLeastOneSelected(data.isClient, {
      type: "ROLE_MISSING",
    } as const),
    ValidationComponents.notNull()
  ),
}));

export const SignupScreen = ({ navigation }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<SignupErrorData>({});
  const [showError, toggleShowError] = useToggle(false);

  const [respError, setRespError] = useState({
    title: "",
    message: "",
  });

  const {
    username,
    email,
    password,
    confirmPassword,
    isOwner,
    isClient,
    onChange,
    form,
  } = useForm({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    isOwner: false,
    isClient: false,
  });

  const trySingup = async () => {
    const validationResult = validateSignupForm(form);
    if (!isRight(validationResult)) {
      setErrors(validationResult.left);
      return;
    }
    setIsLoading(true);
    setErrors({});

    try {
      const { data: respSignUp } = await client.post("/user/register", form);
      console.log(respSignUp);
      navigation.navigate("SigninScreen", { email, password });
    } catch (err: any) {
      console.log(err);

      console.error(
        "Request failed, response:",
        err.response?.data || err.message || err
      );
      if (err.request) {
        if (err.message.endsWith("500")) {
          setRespError({
            title: "Oh no! the server is dead",
            message: "There was a server error try again later",
          });
        } else if (err.message.endsWith("404")) {
          setRespError({
            title: "Oh no! something went wrong",
            message: "endpoint not found",
          });
        } else {
          setRespError({
            title: "Oh no! something went wrong",
            message: err.message,
          });
        }

        toggleShowError();
      } //TODO: error custom para 500 y 404
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
          onChangeText={(nextUserName) => onChange("username", nextUserName)}
          value={username}
          placeholder="User Name"
          error={errors.username}
        />

        <Input
          onChangeText={(nextEmail) => onChange("email", nextEmail)}
          value={email}
          placeholder="Email"
          error={errors.email}
          keyboardType="email-address"
        />

        <Input
          onChangeText={(nextPassword) => onChange("password", nextPassword)}
          value={password}
          placeholder="Password"
          error={errors.password}
          allowSecureTextEntry
        />

        <Input
          onChangeText={(nextConfirmPassword) =>
            onChange("confirmPassword", nextConfirmPassword)
          }
          value={confirmPassword}
          placeholder="Confirm password"
          error={errors.confirmPassword}
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
              value={isClient}
              onValueChange={(value) => onChange("isClient", value)}
              color={isClient ? colors.orange : colors.gray}
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
            disable={(!isClient && !isOwner) || (isClient && isOwner)}
          />
        </Shakeable>
      </KeyboardAwareScrollView>
      <Loader visible={isLoading} />

      <ErrorPopUp
        visible={showError}
        buttonOnPress={toggleShowError}
        onRequestClose={toggleShowError}
        title={respError.title}
        description={respError.message}
      />
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
