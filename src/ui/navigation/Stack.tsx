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
import { OrderHistoryScreen } from "../../screens/clientScreens/OrderHistoryScreen";
import { OrderDetailScreen } from "../../screens/clientScreens/OrderDetailScreen";
import { OrdersScreenOwner } from "../../screens/ownerScreens/OrdersScreenOwner";
import { OrderDetailScreenOwner } from "../../screens/ownerScreens/OrderDetailScreenOwner";
import { OrderProductsScreen } from "../../screens/clientScreens/OrderProductsScreen";
import { ProductShopsScreen } from "../../screens/clientScreens/ProductShopsScreen";
import { NotificationSnackbar } from "../components/NotificationSnackbar";
import { colors } from "../../res/colors";
import { AppBar } from '../components/AppBar';
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export type RootStackParams = {
  WelcomeScreen: undefined;
  CartScreen: undefined;
  SigninScreen: { email: string; password: string };
  SignupScreen: undefined;
  OrdersScreenOwner: { shopId: number };
  OrderDetailScreenOwner: { order: any };
  HomeScreenOwner: { shops: Array<any> };
  HomeScreenClient: undefined;
  AddShopScreen: { sellerId: number; shops: Array<any> };
  UploadProductScreen: { sellerId: number; shopId: number };
  EditProductScreen: { product: any };
  ProductDetailScreen: { product: any };
  ProductDetailScreenOwner: { product: any };
  ShopProductsScreen: { sellerId: number; shopData: any };
  ProductShopsScreen: { shopData: any };
  CheckOutScreen: { order: any };
  PendingOrdersScreen: undefined;
  OrderHistoryScreen: undefined;
  OrderDetailScreen: { order: any };
  OrderProductsScreen: { order: any };
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
          screenOptions={{
            headerTitleAlign:"center",
            headerStyle:{backgroundColor:colors.black},
            headerTintColor: "white",
        }}
          
        >
          <Drawer.Screen
            name={"HomeScreenClient"}
            component={HomeScreenClient}
            options={{
              title:"Search",
              headerRight: () => <AppBar/>,
    

            }}
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
          <Drawer.Screen
            name={"ProductShopsScreen"}
            component={ProductShopsScreen}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name={"OrderHistoryScreen"}
            component={OrderHistoryScreen}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name={"OrderDetailScreen"}
            component={OrderDetailScreen}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name={"OrdersScreenOwner"}
            component={OrdersScreenOwner}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name={"OrderDetailScreenOwner"}
            component={OrderDetailScreenOwner}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name={"OrderProductsScreen"}
            component={OrderProductsScreen}
            options={{ headerShown: false }}
          />
        </Drawer.Navigator>
        <NotificationSnackbar />
      </WithSession>
    </>
  );
};

export default MyStack;
