import React, {
  useContext,
  useState,
  FC,
  PropsWithChildren,
  useEffect,
} from "react";
import * as SecureStore from "expo-secure-store";

interface User {
  username: string;
  id: number;
  email: string;
  isOwner: boolean;
  isClient: boolean;
  cartId: number;
}

interface Session {
  user?: User;
  cart: Array<number>;
}

const SessionContext = React.createContext<Session>({} as Session);

export const useSession = (): Session => {
  return useContext(SessionContext);
};

export const SessionProvider: FC = ({ children }: PropsWithChildren<any>) => {
  const [state, setState] = useState<Session>({
    cart: [],
  });
  const session = {
    ...state,
    async logout() {
      try {
        await SecureStore.deleteItemAsync("session");
      } catch (e) {
        console.log(e);
      }
      setState({ cart: [] });
    },
    async login(user: User) {
      const session: Session = { cart: [], user };
      try {
        await SecureStore.setItemAsync("session", JSON.stringify(session));
      } catch (e) {
        console.log(e);
      }
      setState(session);
    },
    async restore() {
      try {
        const json = await SecureStore.getItemAsync("session");
        if (json) {
          const session: Session = JSON.parse(json);
          setState(session);
        }
      } catch (e) {
        console.log(e);
      }
    },
    addToCart(productId: number) {
      const cart = state.cart || [];
      setState({ ...state, cart: [...cart, productId] });
    },
  };

  useEffect(() => {
    session.restore();
  }, []);
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

export const WithSession = ({ children }: PropsWithChildren<any>) => {
  const session = useSession();
  if (session.user) {
    return children;
  }
  return null;
};

export const WithoutSession = ({ children }: PropsWithChildren<any>) => {
  const session = useSession();
  if (session.user) {
    return null;
  }
  return children;
};
