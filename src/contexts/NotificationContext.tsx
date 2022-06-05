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
  notification?: NotificationContent & { identifier: string };
  response?: NotificationContent & { identifier: string };
  identifier: string;
}

interface NotificationAction {
  unplug: () => any;
  plugin: () => any;
  validToken: () => Promise<boolean>;
  clearNotification: () => any;
  clearNotificationResponse: () => any;
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
  const [state, setState] = useState<Notification>({} as Notification);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  const unplug = async () => {
    console.log("unplug notifications");
    Notifications.removeNotificationSubscription(notificationListener.current);
    Notifications.removeNotificationSubscription(responseListener.current);
    await SecureStore.deleteItemAsync("notificationToken");
    setState({} as Notification);
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
          const { content, identifier } = notification.request;
          setState({ ...state, notification: { ...content, identifier } });
        });

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log("notification user response", response);
          const { content, identifier } = response.notification.request;
          setState({ ...state, response: { ...content, identifier } });
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

  const clearNotification = () => {
    if (state?.notification?.identifier) {
      Notifications.dismissNotificationAsync(state.notification.identifier);
    }
    setState({ ...state, notification: undefined });
  };

  const clearNotificationResponse = () => {
    if (state?.response?.identifier) {
      Notifications.dismissNotificationAsync(state.response.identifier);
    }
    setState({ ...state, response: undefined });
  };
  useEffect(() => {
    plugin();
    return () => {
      unplug();
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        ...state,
        unplug,
        plugin,
        validToken,
        clearNotification,
        clearNotificationResponse,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
