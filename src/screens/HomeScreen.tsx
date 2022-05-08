import { StyleSheet, Text, View , Image} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../res/globalStyles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SearchBar } from "../ui/components/SearchBar";
import { useState } from "react";
import { Title } from "../ui/components/Title";
import { spacing } from "../res/spacing";
import { MediumTypography, normalizeSize, Typography } from "../res/typography";
import { colors, colorWithOpacity } from "../res/colors";
import { SectionTitle } from "../ui/components/SectionTitle";
import { SectionContainer } from '../ui/components/SectionContainer';
import { PRImage } from '../ui/components/PRImage';
import { imageStyles } from "../res/imageStyles";

export const HomeScreen = () => {
  const [searchValue, setSearchValue] = useState("");
  
  return (
    <SafeAreaView style={globalStyles.generalContainer}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        style={globalStyles.innerContainer}
      >
      
      <SectionContainer>
        <SectionTitle text="Search"/>
          <SearchBar
            onChangeText={(nextSearchValue) => setSearchValue(nextSearchValue)}
            value={searchValue}
            placeholder="Search product name"
          />
      </SectionContainer>

      <SectionContainer>
        <SectionTitle text="Categories"/>
        <View style={styles.row}>
          <View>
            <Image source={require("../res/img/logo.png")} style={imageStyles.categorieIcon}></Image>
            <Typography>Food</Typography>
          </View>
          <View>
            <Image source={require("../res/img/logo.png")} style={imageStyles.categorieIcon}></Image>
            <Typography>Products</Typography>
          </View>
        </View>
      </SectionContainer>

      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row:{
    flexDirection:"row"
  }
})

