import { DrawerContentScrollView } from "@react-navigation/drawer";
import { PropsWithChildren } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { useCart } from "../../contexts/CartContext";
import { useUser } from "../../contexts/UserContext";
import { globalStyles } from "../../res/globalStyles";
import { Typography } from "../../res/typography";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Badge } from "react-native-paper";
import { Column, Row } from "../components/Layout";

const DrawerOption = ({
  icon,
  text,
  onPress,
  iconSize = 20,
  badgeCount,
}: {
  icon: string;
  text: string;
  onPress: () => any;
  iconSize?: number;
  children?: any;
  badgeCount?: number;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Row style={styles.paddingVertical}>
        <Icon name={icon} size={iconSize} style={styles.icon} />
        <Typography style={styles.option}>{text}</Typography>
        <View style={styles.alignSelfStart}>
          {badgeCount ? (
            <Badge size={25} style={styles.absolute0}>
              {badgeCount}
            </Badge>
          ) : null}
        </View>
      </Row>
    </TouchableOpacity>
  );
};

export const DrawerContent = ({ navigation }: PropsWithChildren<any>) => {
  const user = useUser();
  const [cart] = useCart();
  const cartCount = cart?.products?.length;

  return (
    <DrawerContentScrollView style={globalStyles.drawerContainer}>
      <Column style={styles.alignItemsStrech}>
        <Typography style={styles.welcome}>
          Welcome {user?.username}!
        </Typography>
        {user?.isClient && (
          <>
            <DrawerOption
              icon="home"
              text="Home"
              onPress={() => navigation.navigate("HomeScreenClient")}
            />

            <DrawerOption
              icon="truck-loading"
              text="Orders"
              onPress={() => navigation.navigate("OrderHistoryScreen")}
            />
          </>
        )}
        <DrawerOption icon="power-off" text="Logout" onPress={user!.logout} />
      </Column>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  welcome: {
    flex: 2,
    marginBottom: 10,
    margin: 5,
    fontSize: 26,
    paddingVertical: 10,
  },
  option: {
    fontSize: 24,
    textAlign: "left",
    paddingHorizontal: 10,
  },
  paddingVertical: {
    paddingVertical: 10,
  },
  icon: {
    color: "white",
    textAlign: "center",
    paddingHorizontal: 10,
  },
  container: { flex: 2 },
  alignSelfStart: { alignSelf: "flex-start" },
  alignItemsStrech: { alignItems: "stretch" },
  absolute0: { position: "absolute", start: 0 },
});
