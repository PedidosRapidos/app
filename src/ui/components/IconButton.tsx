import {
  TouchableOpacity,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { colors, colorWithOpacity } from "../../res/colors";

interface Props {
  onPress?: () => any;
  name: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

export const IconButton = ({ size, name, onPress, style }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.buttonContainer, style]}>
        <Icon name={name} size={size || 25} style={styles.buttonText} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    // borderWidth: 5,
    borderColor: colorWithOpacity(colors.orange, 0.08),
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 15,
    height: 40,
    width: 100,
    backgroundColor: colors.orange,
  },
  buttonText: {
    color: colors.white,
    textAlign: "center",
  },
});
