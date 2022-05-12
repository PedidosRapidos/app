import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { WelcomeScreen } from "../../screens/WelcomeScreen";
import { SigninScreen } from "../../screens/SigninScreen";
import { SignupScreen } from "../../screens/SignupScreen";
import { HomeScreenClient } from "../../screens/clientScreens/HomeScreenClient";
import { AddShopScreen } from "../../screens/ownerScreens/AddShopScreen";
import { UploadProductScreen } from "../../screens/ownerScreens/UploadProductScreen";
import { HomeScreenOwner } from "../../screens/ownerScreens/HomeScreenOwner";

export type RootStackParams = {
  WelcomeScreen: undefined;
  SigninScreen: { email: string; password: string };
  SignupScreen: undefined;
  HomeScreenOwner: { sellerId: number; sellerName: string };
  HomeScreenClient: { clientId: number; clientName: string };
  AddShopScreen: { sellerId: number };
  UploadProductScreen: { sellerId: number; shopId: number };
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
        name={"HomeScreenClient"}
        component={HomeScreenClient}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"HomeScreenOwner"}
        component={HomeScreenOwner}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"AddShopScreen"}
        component={AddShopScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"UploadProductScreen"}
        component={UploadProductScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
