import { StyleSheet, Text, View , Image} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../res/globalStyles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SearchBar } from "../ui/components/SearchBar";
import React, { useState } from "react";
import { Title } from "../ui/components/Title";
import { spacing } from "../res/spacing";
import { MediumTypography, normalizeSize, Typography } from "../res/typography";
import { colors, colorWithOpacity } from "../res/colors";
import { SectionTitle } from "../ui/components/SectionTitle";
import { SectionContainer } from '../ui/components/SectionContainer';
import { PRImage } from '../ui/components/PRImage';
import { imageStyles } from "../res/imageStyles";
import { MainButton } from "../ui/components/MainButton";
import { executeGetRequest } from "../services/executeGetRequest";
import { Loader } from "../ui/components/Loader";

export const HomeScreen = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const searchProducts = async () => {
    setIsLoading(true);
    try {
      
      /**parsea cada palabra clave y la convierto en una lista de queryParam */
      const words = searchValue.split(' ');
      let paramsString = "?q="
      paramsString += words;
      const endpoint = "products" + paramsString;

      const respLogin = await executeGetRequest(endpoint);
    
    } catch (err: any) {
      if (
        err.code == "auth/user-not-found" ||
        err.code == "auth/wrong-password"
      ) {
        console.log("ERROR: Los datos son incorrectos");
      } else {
        console.log("Error any")
        console.log(err.message);
      }
    } finally {
      setIsLoading(false);
    }

  }

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
          <MainButton
              text="Search"
              onPress={() => {
                searchProducts();
              }}
              backgroundColor={colors.orange}
            />
      </SectionContainer>
      <SectionContainer>
        <SectionTitle text="Categories"/>
        <View style={styles.row}>
          {/*TODO: Convertir en un componente CategorieIcon*/}
          <View>
            <Image source={require("../res/img/logo.png")} style={imageStyles.categorieIcon}></Image>
            <Typography>Food</Typography>
          </View>
          {/*TODO: Convertir en un componente CategorieIcon*/}
          <View>
            <Image source={require("../res/img/logo.png")} style={imageStyles.categorieIcon}></Image>
            <Typography>Products</Typography>
          </View>
        </View>
      </SectionContainer>

      </KeyboardAwareScrollView>
      <Loader visible={isLoading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row:{
    flexDirection:"row"
  }
})

