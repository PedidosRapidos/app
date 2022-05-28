import { StyleSheet, View } from "react-native";
import { spacing } from "../../res/spacing";

interface Props {
    children: any;
  }

export const SectionContainer = ({children}:Props) => {
    return (
      <View style={styles.container}>
        {children}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      marginBottom: spacing.sectionSpacing,
    },
  });
  