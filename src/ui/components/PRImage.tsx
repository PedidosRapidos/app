import React from 'react';
import {View, useWindowDimensions, StyleSheet, Image, Text, LogBox} from 'react-native';
import {SemiBoldTypography, normalizeSize, MediumTypography} from '../../res/typography';
import {colors} from '../../res/colors';
import { height, heightPercentageToDP, width } from '../../res/responsive';
import { spacing } from '../../res/spacing';

interface Props {
  path: string;
}

export const PRImage = ({path}: Props) => {
  const {width, height} = useWindowDimensions();
  console.log(path);
  return (
    <Image source=
        {{uri: path !== "" ? "../../res/img/logo.png" : require("../../res/img/logo.png")}} style={styles.logo}></Image>
  );
};

const styles = StyleSheet.create({
    logo: {
        opacity: 0.98,
        aspectRatio: 1,
        height: heightPercentageToDP("9%"),
        marginBottom: "5%",
        borderWidth: 1,
        borderColor: "white",
        //alignSelf: "center",
      },
});
