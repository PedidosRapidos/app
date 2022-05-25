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
import { WithoutSession, WithSession } from "../../contexts/SessionContext";
import { ShopProductsScreen } from "../../screens/ownerScreens/ShopProductsScreen";
import { DrawerContent } from "./DrawerContent";
import { CartScreen } from "../../screens/clientScreens/CartScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ProductDetailScreenOwner } from "../../screens/ownerScreens/ProductDetailScreenOwner";
import { useUser } from "../../contexts/UserContext";
import { EditProductScreen } from "../../screens/ownerScreens/EditProductScreen";
import { CheckOutScreen } from "../../screens/clientScreens/CheckOutScreen";

export type RootStackParams = {
  WelcomeScreen: undefined;
  CartScreen: undefined;
  SigninScreen: { email: string; password: string };
  SignupScreen: undefined;
  HomeScreenOwner: { shops: Array<any> };
  HomeScreenClient: { clientId: number; clientName: string };
  AddShopScreen: { sellerId: number; shops: Array<any> };
  UploadProductScreen: { sellerId: number; shopId: number };
  EditProductScreen: { product: any };
  ProductDetailScreen: { product: any };
  ProductDetailScreenOwner: { product: any };
  ShopProductsScreen: { sellerId: number; shopId: number };
  CheckOutScreen: undefined;
};
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const MyStack = () => {
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
            name={"CheckOutScreen"}
            component={CheckOutScreen}
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
            name={"EditProductScreen"}
            component={EditProductScreen}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name={"ProductDetailScreen"}
            component={ProductDetailScreen}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name={"ProductDetailScreenOwner"}
            component={ProductDetailScreenOwner}
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

export default MyStack;
