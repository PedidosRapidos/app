import React from 'react';
import {View, useWindowDimensions, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {SemiBoldTypography, normalizeSize, MediumTypography} from '../../res/typography';
import {colors} from '../../res/colors';
import { height, width } from '../../res/responsive';
import { spacing } from '../../res/spacing';

interface Props {
  text: string;
  style?: StyleProp<ViewStyle>;
}

export const SectionTitle = ({text, style}: Props) => {
  const {width, height} = useWindowDimensions();

  return (
    <View style={[styles.container, style]}>
      <MediumTypography style={styles.title}>{text}</MediumTypography>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        width: width * 0.8,
        marginBottom: spacing.sectionSpacing,
    },
    title: {
        fontSize: normalizeSize(24),
        color: colors.white,
    },
});
