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
import { isRight } from "fp-ts/lib/Either";
import {
  createValidator,
  ValidationComponents,
  Validations,
} from "../model/Validations";
import { Loader } from "../ui/components/Loader";
import client from "../services/config";
import { useToggle } from "../ui/hooks/useToggle";
import { ErrorPopUp } from "../ui/components/ErrorPopUp";
import { useUser } from "../contexts/UserContext";

interface Props extends StackScreenProps<RootStackParams, "SigninScreen"> {}

export interface LoginServiceParameters {
  email: string;
  password: string;
}

const validateSignInForm = createValidator({
  email: Validations.isEmail,
  password: ValidationComponents.combine(
    ValidationComponents.notNull(),
    ValidationComponents.minLength(1)
  ),
});

type LoginErrorData = { [K in keyof LoginServiceParameters]?: string };

export const SigninScreen = ({ route }: Props) => {
  const params = route.params;
  const user = useUser();

  const [errors, setErrors] = useState<LoginErrorData>({});
  const [isLoading, setIsLoading] = useState(false);

  const { email, password, form, onChange } = useForm({
    email: params.email,
    password: params.password,
  });

  const [showError, toggleShowError] = useToggle(false);

  const [respError, setRespError] = useState({
    title: "",
    message: "",
  });
  const tryLogin = async () => {
    const validationResult = validateSignInForm(form);

    if (!isRight(validationResult)) {
      console.log("validations errors: ", validationResult.left);
      setErrors(validationResult.left);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await user.login(form);
    } catch (err: any) {
      setIsLoading(false);
      console.log(
        "Request failed, response:",
        err.response?.data || err.message || err
      );
      if (err.request) {
        if (err.message.endsWith("500")) {
          setRespError({
            title: "Oh no! What's wrong with the server?",
            message: "There was a server error try again later",
          });
        } else if (err.message.endsWith("400")) {
          setRespError({
            title: "Oh no! is your data right?",
            message: "Please check your email and password",
          });
        } else {
          setRespError({
            title: "Oh no! something went wrong",
            message: err.response?.data.detail,
          });
        }
      }
      toggleShowError();
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
        <Title text="Welcome back!" />

        <View style={{ marginTop: 8 }}>
          <Typography style={[styles.section, styles.sectionMarginBotton]}>
            Enter your data to sign in
          </Typography>
        </View>

        <View style={styles.inputContainer}>
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
            marginBottom={(spacing.inputSpacing * 2) / 3}
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
              text="Sign in"
              onPress={tryLogin}
              backgroundColor={colors.orange}
            />
          </Shakeable>
        </View>
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
  inputContainer: {
    marginTop: (spacing.inputSpacing * 2) / 3,
  },
  forgotPasswordText: {
    fontSize: normalizeSize(13),
  },
});
