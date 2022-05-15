import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { PropsWithChildren } from "react";
import { View } from "react-native";
import { useSession } from "../../contexts/SessionContext";
import { globalStyles } from "../../res/globalStyles";
import { Typography } from "../../res/typography";
import { MainButton } from "../components/MainButton";

export const DrawerContent = ({ navigation }: PropsWithChildren<any>) => {
  const session = useSession();
  return (
    <DrawerContentScrollView style={globalStyles.generalContainer}>
      <View style={{ flex: 2 }}></View>
      <View style={{ flex: 2 }}>
        <Typography> Welcome {session.user?.username}! </Typography>
        {session.user?.isClient && (
          <MainButton
            text="My Cart"
            onPress={() => navigation.navigate("CartScreen")}
          />
        )}
        <MainButton text="Logout" onPress={session.logout} />
      </View>
    </DrawerContentScrollView>
  );
};
