import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { WelcomeScreen } from "../../screens/WelcomeScreen";
import { SigninScreen } from "../../screens/SigninScreen";
import { SignupScreen } from "../../screens/SignupScreen";
import { HomeScreenClient } from "../../screens/clientScreens/HomeScreenClient";
import { AddShopScreen } from "../../screens/ownerScreens/AddShopScreen";
import { UploadProductScreen } from "../../screens/ownerScreens/UploadProductScreen";
import { HomeScreenOwner } from "../../screens/ownerScreens/HomeScreenOwner";
import { ProductDetailScreen } from "../../screens/ProductDetailScreen";
import {
  useUser,
  WithoutSession,
  WithSession,
} from "../../contexts/SessionContext";
import { ShopProductsScreen } from "../../screens/ownerScreens/ShopProductsScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "./DrawerContent";
import { CartScreen } from "../../screens/clientScreens/CartScreen";

export type RootStackParams = {
  WelcomeScreen: undefined;
  CartScreen: undefined;
  SigninScreen: { email: string; password: string };
  SignupScreen: undefined;
  HomeScreenOwner: { sellerId: number; sellerName: string };
  HomeScreenClient: { clientId: number; clientName: string };
  AddShopScreen: { sellerId: number };
  UploadProductScreen: { sellerId: number; shop: any; products: Array<any> };
  ProductDetailScreen: { product: any };
  ShopProductsScreen: { sellerId: number; shop: any; products: Array<any> };
};
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export const MyStack = () => {
  const user = useUser();
  return (
    <>
      <WithoutSession>
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
        </Stack.Navigator>
      </WithoutSession>
      <WithSession>
        <Drawer.Navigator
          initialRouteName={
            user.isOwner ? "HomeScreenOwner" : "HomeScreenClient"
          }
          drawerContent={(props) => <DrawerContent {...props} />}
          backBehavior="history"
        >
          <Drawer.Screen
            name={"HomeScreenClient"}
            component={HomeScreenClient}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name={"HomeScreenOwner"}
            component={HomeScreenOwner}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name={"CartScreen"}
            component={CartScreen}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name={"AddShopScreen"}
            component={AddShopScreen}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name={"UploadProductScreen"}
            component={UploadProductScreen}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name={"ProductDetailScreen"}
            component={ProductDetailScreen}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name={"ShopProductsScreen"}
            component={ShopProductsScreen}
            options={{ headerShown: false }}
          />
        </Drawer.Navigator>
      </WithSession>
    </>
  );
};
