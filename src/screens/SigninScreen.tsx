import React, { useEffect, useRef } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Animated,
} from "react-native";
import { RootStackParams } from "../ui/navigation/Stack";
import { StackScreenProps } from "@react-navigation/stack";
import { useState } from "react";

import { useForm } from "../ui/hooks/useForm";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../res/globalStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BackButton } from "../ui/components/BackButton";
import { Title } from "../ui/components/Title";
import {
  normalizeSize,
  SemiBoldTypography,
  Typography,
} from "../res/typography";
import { colors, colorWithOpacity } from "../res/colors";
import { spacing } from "../res/spacing";
import { Input } from "../ui/components/Input";
import { MainButton } from "../ui/components/MainButton";
import { Either, isLeft, isRight, left } from "fp-ts/lib/Either";
import {
  doValidate,
  ValidationComponents,
  Validations,
} from "../model/Validations";
import { record } from "fp-ts/lib/Record";
import { useToggle } from "../ui/hooks/useToggle";
import { Loader } from "../ui/components/Loader";
import { executeGetRequest } from "../services/executeGetRequest";
import { formErrors } from "../res/translations/en";
import { executePostRequest } from "../services/executePostRequest";

interface Props extends StackScreenProps<RootStackParams, "SigninScreen"> {}

type LoginErrorData = { [K in keyof LoginServiceParameters]?: string };

export const SigninScreen = ({ navigation, route }: Props) => {
  const params = route.params;

  const [errors, setErrors] = useState<LoginErrorData>({});
  const [isLoading, setIsLoading] = useState(false);

  //const dispatch = useDispatch();

  const { email, password, form, onChange } = useForm({
    email: params.email,
    password: params.password,
  });

  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const startShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const tryLogin = async () => {
    const validationResult = validate(form);

    if (!isRight(validationResult)) {
      console.log(validationResult);
      setErrors(validationResult.left);
      console.log(validationResult.left);

      startShake();
      return;
    }


    setIsLoading(true);
    setErrors({});

    //TODO: me gustaria meter toda esta logica en una clase/metodo
    // de manera de tener una clase por transaccion e.g. LogInUserService
    // por parametro se le puede mandar un callback para el isLoading
    try {
      const respLogin = await executePostRequest(form, '/post');
      navigation.navigate("HomeScreen");

    } catch (err: any) {
      if (
        err.code == "auth/user-not-found" ||
        err.code == "auth/wrong-password"
      ) {
        console.log("ERROR: Los datos son incorrectos");
      } else {
        console.log(err.message);
      }
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
          <Animated.View
            style={{
              transform: [{ translateX: shakeAnimation }],
            }}
          >
            <MainButton
              text="Sign in"
              onPress={() => {
                tryLogin();
              }}
              backgroundColor={colors.orange}
            />
          </Animated.View>
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

export interface LoginServiceParameters {
  email: string;
  password: string;
}

function validate(
  data: Partial<LoginServiceParameters>
): Either<LoginErrorData, LoginServiceParameters> {
  const result = doValidate({
    email: Validations.isEmail,
    password: ValidationComponents.combine(
      ValidationComponents.notNull(),
      ValidationComponents.minLength(1)
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
