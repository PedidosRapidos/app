import React, {
  useContext,
  useState,
  FC,
  PropsWithChildren,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import * as SecureStore from "expo-secure-store";
import client from "../services/config";

export interface User {
  username: string;
  id: number;
  email: string;
  isOwner: boolean;
  isClient: boolean;
  cartId: number;
}

interface UserActions {
  login: (user: User) => Promise<any>;
  logout: () => Promise<any> | void;
}

export interface Product {
  id: number;
}

export interface Cart {
  id: string;
  products: Array<Product>;
}

interface CartActions {
  add: (productId: Product) => Promise<any>;
}

const UserContext = React.createContext<User & UserActions>(
  {} as User & UserActions
);

export const useUser = (): User & UserActions => {
  return useContext(UserContext);
};

type UseCart = [Cart & CartActions, Dispatch<SetStateAction<Cart>>];
const CartContext = React.createContext<UseCart>([
  {} as Cart & CartActions,
  (_: any) => {},
]);

export const useCart = (): UseCart => {
  return useContext(CartContext);
};

export const SessionProvider: FC = ({ children }: PropsWithChildren<any>) => {
  const [user, setUser] = useState<User>({} as User);
  const [cart, setCart] = useState<Cart>({} as Cart);

  const userActions = {
    ...user,
    async logout() {
      try {
        await SecureStore.deleteItemAsync("user");
      } catch (e) {
        console.log("logout user", e);
      }
      setUser({} as User);
    },
    async login(user: User) {
      try {
        await SecureStore.setItemAsync("user", JSON.stringify(user));
      } catch (e) {
        console.log("login user", e);
      }
      setUser(user);
    },
    async restore() {
      try {
        const json = await SecureStore.getItemAsync("user");
        if (json) {
          const user: User = JSON.parse(json);
          setUser(user);
        }
      } catch (e) {
        console.log("restore user:", e);
      }
    },
  };

  useEffect(() => {
    userActions.restore();
  }, []);

  useEffect(() => {
    const init = async (cartId: number) => {
      try {
        const { data: cart } = await client.get(`/shopping_cart/${cartId}`);
        setCart(cart);
      } catch (e) {
        console.log("user init:", e);
      }
    };
    if (user.cartId) {
      init(user?.cartId);
    }
  }, [user.cartId]);

  const cartActions = {
    ...cart,
    async add({ id: productId }: { id: number }) {
      if (cart.id) {
        try {
          const { data: updatedCart } = await client.post(
            `/shopping_cart/${cart.id}/products/`,
            {
              product_id: productId,
            }
          );
          setCart(updatedCart);
        } catch (e) {
          console.log("add item", e);
        }
      } else {
        console.log("trying to add item, but cart doesnt exits");
      }
    },
  };

  return (
    <UserContext.Provider value={userActions}>
      <CartContext.Provider value={[cartActions, setCart]}>
        {children}
      </CartContext.Provider>
    </UserContext.Provider>
  );
};

export const WithSession = ({ children }: PropsWithChildren<any>) => {
  const user = useUser();
  if (user.id) {
    return children;
  }
  return null;
};

export const WithoutSession = ({ children }: PropsWithChildren<any>) => {
  const user = useUser();
  if (user.id) {
    return null;
  }
  return children;
};
