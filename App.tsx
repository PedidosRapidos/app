import "react-native-gesture-handler";
//import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MyStack } from "./src/ui/navigation/Stack";
import { LogBox, StatusBar } from "react-native";

LogBox.ignoreLogs(["[react-native-gesture-handler]"]); //NO usar en desarrollo

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar translucent backgroundColor={"transparent"} />
      <MyStack />
    </NavigationContainer>
  );
};

export default App;
