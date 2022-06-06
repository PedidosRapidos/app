import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import MyStack from "./src/ui/navigation/Stack";
import { LogBox, StatusBar } from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { fonts } from "./src/res/typography";
import { SessionProvider } from "./src/contexts/SessionContext";
LogBox.ignoreLogs(["[react-native-gesture-handler]"]);
LogBox.ignoreLogs(["expo-app-loading"]);

const App = () => {
  let [fontStyles] = useFonts(fonts);
  if (!fontStyles) {
    return <AppLoading />;
  } else {
    return (
      <PaperProvider>
        <SessionProvider>
          <NavigationContainer>
            <StatusBar translucent backgroundColor={"transparent"} />
            <MyStack />
          </NavigationContainer>
        </SessionProvider>
      </PaperProvider>
    );
  }
};

export default App;
