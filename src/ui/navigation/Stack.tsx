import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { WelcomeScreen } from "../../screens/WelcomeScreen";
import { SigninScreen } from "../../screens/SigninScreen";
import { SignupScreen } from "../../screens/SignupScreen";
import { HomeScreen } from "../../screens/HomeScreen";
import { AddShopScreen } from "../../screens/AddShopScreen";

export type RootStackParams = {
  WelcomeScreen: undefined;
  SigninScreen: { email: string; password: string };
  SignupScreen: undefined;
  HomeScreen: undefined;
  AddShopScreen: {sellerId: number};
  UploadProductScreen: {sellerId:number, shopId:number};
};

const Stack = createStackNavigator();

export const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={"WelcomeScreen"}
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"SignupScreen"}
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"SigninScreen"}
        component={SigninScreen}
        options={{ headerShown: false }}
        initialParams={{
          email: "",
          password: "",
        }}
      />
      <Stack.Screen
        name={"HomeScreen"}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"AddShopScreen"}
        component={AddShopScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"UploadProductScreen"}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
