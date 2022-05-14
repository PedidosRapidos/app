import React, { useContext, useState, FC, PropsWithChildren } from "react";

interface User {
  username: string;
  id: number;
}

interface Session {
  user?: User;
  cart: Array<number>;
  logout: () => void;
  login: (user: User) => void;
  addToCart: (productId: number) => void;
}

const SessionContext = React.createContext<Session>({} as Session);

export const useSession = (): Session => {
  return useContext(SessionContext);
};

export const SessionProvider: FC = ({ children }: PropsWithChildren<any>) => {
  const [state, setState] = useState<{ cart: Array<number>; user?: User }>({
    cart: [],
  });
  const session = {
    ...state,
    logout() {
      setState({ cart: [] });
    },
    login(user: { id: number; username: string }) {
      setState({ ...state, user });
    },
    addToCart(productId: number) {
      const cart = state.cart || [];
      setState({ ...state, cart: [...cart, productId] });
    },
  };

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};
