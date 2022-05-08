import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../res/globalStyles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SearchBar } from "../ui/components/SearchBar";
import { useState } from "react";

export const HomeScreen = () => {
  const [searchValue, setSearchValue] = useState("");
  
  return (
    <SafeAreaView style={globalStyles.generalContainer}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        style={globalStyles.innerContainer}
      >
        <SearchBar
          onChangeText={(nextSearchValue) => setSearchValue(nextSearchValue)}
          value={searchValue}
          placeholder="Search product name"
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
