import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { WelcomeScreen } from "../../screens/WelcomeScreen";
import { SigninScreen } from "../../screens/SigninScreen";
import { SignupScreen } from "../../screens/SignupScreen";

export type RootStackParams = {
  WelcomeScreen: undefined;
  SigninScreen: { email: string; password: string };
  SignupScreen: undefined;
  ComingSoon: undefined;
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
      />
    </Stack.Navigator>
  );
};

//let [fontStyles] = useFonts(fonts);
// if (!fontStyles) {
//  return <AppLoading />;
// } else {
//  return (
//   <NavigationContainer>
//     <StatusBar translucent backgroundColor={"transparent"} />
//     <MyStack />
//   </NavigationContainer>
// );
// }
