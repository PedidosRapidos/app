import React, { useEffect } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import {
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  Text,
} from "react-native";
import { RootStackParams } from "../ui/navigation/Stack";
import { globalStyles } from "../res/globalStyles";
import {
  normalizeSize,
  BoldTypography,
  MediumTypography,
} from "../res/typography";
import { height, heightPercentageToDP, width } from "../res/responsive";
import { StyleSheet, LogBox } from "react-native";
import { colors, colorWithOpacity } from "../res/colors";
import { ScrollView } from "react-native-gesture-handler";
import { MainButton } from "../ui/components/MainButton";
import { Typography } from "../res/typography";

interface Props extends StackScreenProps<RootStackParams, "WelcomeScreen"> {}

export const WelcomeScreen = ({ navigation }: Props) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={globalStyles.generalContainer}
    >
      <View>
        <ImageBackground
          source={require("../res/img/welcome.png")}
          resizeMode="cover"
          style={{
            height: height * 0.7,
            width: width,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              justifyContent: "flex-end",
              alignItems: "center",
              marginTop: "13%",
            }}
          >
            <MediumTypography
              style={{
                fontSize: normalizeSize(22),
                textAlign: "center",
                textAlignVertical: "bottom",
                marginBottom: 10,

                color: colors.white,
              }}
            >
              Fastest delivery in the world!
            </MediumTypography>
          </View>
        </ImageBackground>
        <View
          style={{
            marginTop: "5%",
          }}
        >
          <Image source={require("../res/img/logo.png")} style={styles.logo} />
          <MainButton
            text="Continue with email"
            onPress={() => {
              navigation.navigate("SignupScreen");
            }}
          />

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 25,
            }}
          >
            <Typography
              style={{
                fontSize: normalizeSize(13),
                color: colorWithOpacity(colors.white, 0.6),
              }}
            >
              Don't have an account?{" "}
            </Typography>
            <TouchableOpacity>
              <BoldTypography
                onPress={() => {
                  navigation.navigate("SignupScreen");
                }}
              >
                Sign up
              </BoldTypography>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logo: {
    opacity: 0.98,
    aspectRatio: 1,
    height: heightPercentageToDP("9%"),
    marginBottom: "5%",
    alignSelf: "center",
  },
});
