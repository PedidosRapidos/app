import React from "react";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles } from "../../res/globalStyles";
import { normalizeSize, SemiBoldTypography } from "../../res/typography";
import { colorWithOpacity, colors } from "../../res/colors";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardTypeOptions,
} from "react-native";
import { spacing } from "../../res/spacing";
import { useToggle } from "../hooks/useToggle";
import Icon from "react-native-vector-icons/Ionicons";

type ErrorType = string | undefined | null | false;

interface Props {
  onChangeText: (text: string) => void;
  value: string;
  allowSecureTextEntry?: boolean;
  placeholder: string;
  error?: ErrorType;
  marginBottom?: number;
  keyboardType?: KeyboardTypeOptions;
}

export const Input = ({
  onChangeText,
  value,
  allowSecureTextEntry = false,
  placeholder,
  error = undefined,
  marginBottom = spacing.inputSpacing,
  keyboardType = "default",
}: Props) => {
  const [showText, toggleShowText] = useToggle(!allowSecureTextEntry);

  return (
    <View style={{ marginBottom: error ? 0 : marginBottom }}>
      <View style={error ? styles.inputError : styles.inputContainer}>
        <TextInput
          style={styles.inputGeneric}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colorWithOpacity(colors.white, 0.5)}
          value={value}
          secureTextEntry={!showText}
          keyboardType={keyboardType}
        />

        {allowSecureTextEntry ? (
          <TouchableOpacity
            style={{
              aspectRatio: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingRight: 15,
            }}
            onPress={() => toggleShowText()}
          >
            <View>
              {!showText ? (
                <Icon
                  name="eye-sharp"
                  size={25}
                  color={colorWithOpacity(colors.grayLight, 0.61)}
                />
              ) : (
                <Icon
                  name="eye-off-sharp"
                  size={25}
                  color={colorWithOpacity(colors.grayLight, 0.61)}
                />
              )}
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
      {error ? (
        <View style={{ height: marginBottom }}>
          <SemiBoldTypography style={styles.errorText}>
            {error}
          </SemiBoldTypography>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: colorWithOpacity(colors.black, 0.5),
    borderBottomWidth: 1,
    borderBottomColor: colorWithOpacity(colors.blue, 0.5),
    flexDirection: "row",
  },
  inputError: {
    backgroundColor: colorWithOpacity(colors.black, 0.5),
    borderBottomWidth: 1,
    borderBottomColor: colors.red,

    flexDirection: "row",
  },
  inputGeneric: {
    flex: 1,
    padding: 7,
    paddingBottom: 11,
    paddingLeft: 23,
    fontSize: normalizeSize(18),
    color: "white",
    fontFamily: "FireSansRegular",
    marginRight: 10,
  },
  alertContainer: {
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 15,
  },
  errorText: {
    color: colors.red,
    marginBottom: 3,
    fontSize: normalizeSize(12),
    fontFamily: "FiraSansThinItalic",
    marginLeft: 23,
    top: 3,
  },
});
