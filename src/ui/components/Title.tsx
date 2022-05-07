import React from 'react';
import {View, useWindowDimensions, StyleSheet} from 'react-native';
import {SemiBoldTypography, normalizeSize} from '../../res/typography';
import {colors} from '../../res/colors';

interface Props {
  text: string;
}

export const Title = ({text}: Props) => {
  const {width, height} = useWindowDimensions();

  return (
    <View style={{width: width * 0.5}}>
      <SemiBoldTypography style={styles.title}>{text}</SemiBoldTypography>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: normalizeSize(35),
    color: colors.white,
  },
});
