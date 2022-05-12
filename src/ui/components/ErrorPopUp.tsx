import React from "react";
import { Modal, View, StyleSheet, Image } from "react-native";
import { MainButton } from "./MainButton";
import {
  Typography,
  SemiBoldTypography,
  normalizeSize,
} from "../../res/typography";
import { colors, colorWithOpacity } from "../../res/colors";
import { spacing } from "../../res/spacing";
import { heightPercentageToDP } from "../../res/responsive";

interface Props {
  visible: boolean;
  onRequestClose?: () => void;
  buttonOnPress: () => void;
  title: string;
  description: string;
}

export const ErrorPopUp = ({
  visible,
  onRequestClose = undefined,
  buttonOnPress,
  title,
  description,
}: Props) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
      statusBarTranslucent
    >
      <View style={stylesPopUp.containerModal}>
        <View style={stylesPopUp.modal}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <View style={stylesPopUp.buttonContainer}>
                <Image
                  source={require("../../res/img/error-icon.png")}
                  style={{
                    aspectRatio: 1,
                    height: 35,
                  }}
                />
              </View>
            </View>
            <SemiBoldTypography style={stylesPopUp.title}>
              {title}
            </SemiBoldTypography>
            <Typography style={stylesPopUp.description}>
              {description}
            </Typography>
          </View>

          <View style={{ marginTop: (spacing.paddingHorizontal * 2) / 3 }}>
            <MainButton
              text="Ok"
              onPress={buttonOnPress}
              backgroundColor={colors.red}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const stylesPopUp = StyleSheet.create({
  containerModal: {
    backgroundColor: colorWithOpacity(colors.pureBlack, 0.67),
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.paddingHorizontal,
  },
  modal: {
    width: "95%",
    height: heightPercentageToDP("32%"),
    backgroundColor: colors.popupBackground,
    borderRadius: heightPercentageToDP("2.3%"),
    padding: (spacing.paddingHorizontal * 2) / 3,
  },
  title: {
    fontSize: normalizeSize(20),
    textAlign: "center",
    marginTop: "3%",
    marginBottom: "1%",
  },
  description: {
    textAlign: "center",
    fontSize: normalizeSize(15),
  },
  buttonContainer: {
    borderRadius: heightPercentageToDP("3.2%"),
    aspectRatio: 1,
    height: heightPercentageToDP("8%"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.cream,
    marginBottom: heightPercentageToDP("0.5%"),
  },
});
