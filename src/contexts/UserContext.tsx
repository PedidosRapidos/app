import React, {
  useContext,
  useState,
  FC,
  PropsWithChildren,
  useEffect,
} from "react";
import * as SecureStore from "expo-secure-store";
import client from "../services/config";
import { useNotification } from "./NotificationContext";

export interface User {
  username: string;
  id: number;
  email: string;
  isOwner: boolean;
  isClient: boolean;
  cartId: number;
}

interface UserActions {
  login: (user: { email: string; password: string }) => Promise<any>;
  logout: () => Promise<any> | void;
  updateCartId: (CartId: number) => any;
}

const UserContext = React.createContext<User & UserActions>(
  {} as User & UserActions
);

export const useUser = (): User & UserActions => {
  return useContext(UserContext);
};

export const UserProvider: FC = ({ children }: PropsWithChildren<any>) => {
  const [user, setUser] = useState<User>({} as User);
  const { unplug, plugin, validToken } = useNotification();
  const userActions = {
    ...user,
    async logout() {
      try {
        await SecureStore.deleteItemAsync("user");
        await unplug();
        await client.post("/users/logout", {
          email: user.email,
        });
      } catch (e) {
        console.log("logout user", e);
      }
      setUser({} as User);
    },
    async login(form: { email: string; password: string }) {
      const notificationToken = await plugin();
      const { data: user } = await client.post("/users/login", {
        token: notificationToken,
        ...form,
      });
      await SecureStore.setItemAsync("user", JSON.stringify(user));
      setUser(user);
    },
    async restore() {
      try {
        const json = await SecureStore.getItemAsync("user");

        if (json) {
          const user: User = JSON.parse(json);
          setUser(user);
          if (await validToken()) {
            this.logout();
          }
        }
      } catch (e) {
        console.log("restore user:", e);
      }
    },
    async updateCartId(cartId: number) {
      setUser({ ...user, cartId });
      try {
        await SecureStore.setItemAsync("user", JSON.stringify(user));
      } catch (e) {
        console.log("login user", e);
      }
    },
  };

  useEffect(() => {
    userActions.restore();
  }, []);

  return (
    <UserContext.Provider value={userActions}>{children}</UserContext.Provider>
  );
};
