import { StyleSheet, View, StyleProp, ViewStyle, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { colors, colorWithOpacity } from "../../res/colors";
import { Typography } from "../../res/typography";

interface Props {
    style?: StyleProp<ViewStyle>;
  size?: number;
  score: number;
}

export const Score = ({ style, size, score }: Props) => {
  return (
    <View style={[styles.scoreContainer, style]}>
      <Icon name={"star"} size={size || 15} style={styles.icon} />
      <Typography style={styles.score}>{score}</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    color: colors.white,
    textAlign: "left",
    marginBottom: 1,
  },
  score:{
      marginLeft: 10,
  }
});
