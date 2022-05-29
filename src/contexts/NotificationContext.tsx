import * as Notifications from "expo-notifications";
import {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
  PropsWithChildren,
} from "react";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function getNotificationToken() {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
  }
  const { data: token } = await Notifications.getExpoPushTokenAsync();
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  return token;
}

interface Notification {
  token?: string;
  notification?: any;
}

interface NotificationAction {
  unplug: () => any;
  plugin: () => any;
}

const NotificationContext = createContext<Notification & NotificationAction>({
  plugin() {},
  unplug() {},
});

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }: PropsWithChildren<any>) => {
  const [state, setState] = useState<Notification>({});
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  const unplug = () => {
    Notifications.removeNotificationSubscription(notificationListener.current);
    Notifications.removeNotificationSubscription(responseListener.current);
  };

  const plugin = async () => {
    try {
      const notificationToken = await getNotificationToken();

      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          setState({ ...state, notification });
        });

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log(response);
        });

      setState({ ...state, token: notificationToken });
      return notificationToken;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  useEffect(() => {
    plugin();
    return unplug;
  }, []);

  return (
    <NotificationContext.Provider value={{ ...state, unplug, plugin }}>
      {children}
    </NotificationContext.Provider>
  );
};
