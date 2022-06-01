import * as Notifications from "expo-notifications";
import { NotificationContent } from "expo-notifications";
import * as SecureStore from "expo-secure-store";

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
  notification?: NotificationContent;
  response?: NotificationContent;
}

interface NotificationAction {
  unplug: () => any;
  plugin: () => any;
  validToken: () => Promise<boolean>;
}

const NotificationContext = createContext<Notification & NotificationAction>({
  plugin() {},
  unplug() {},
  async validToken() {
    return false;
  },
});

export const useNotification = () => {
  const data = useContext(NotificationContext);
  return data;
};

export const NotificationProvider = ({ children }: PropsWithChildren<any>) => {
  const [state, setState] = useState<Notification>({});
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  const unplug = async () => {
    console.log("unplug notifications");
    Notifications.removeNotificationSubscription(notificationListener.current);
    Notifications.removeNotificationSubscription(responseListener.current);
    await SecureStore.deleteItemAsync("notificationToken");
    setState({});
  };

  const validToken = async () => {
    const token = await SecureStore.getItemAsync("notificationToken");
    return token === state.token;
  };

  const plugin = async () => {
    try {
      const notificationToken = await getNotificationToken();
      console.log("plugin notification listener", notificationToken);

      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          const content = notification.request.content;
          setState({ ...state, notification: content });
        });

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log("notification user response", response);
          const content = response.notification.request.content;
          setState({ ...state, response: content });
        });

      if (notificationToken) {
        await SecureStore.setItemAsync(
          "notificationToken",
          notificationToken || ""
        );

        setState({ ...state, token: notificationToken });
      }
      return notificationToken;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  useEffect(() => {
    plugin();
    return () => {
      unplug();
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{ ...state, unplug, plugin, validToken }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
