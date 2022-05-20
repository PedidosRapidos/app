import React, {
  useContext,
  useState,
  FC,
  PropsWithChildren,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import client from "../services/config";
import { useUser } from "./UserContext";

export interface Product {
  id: number;
}

export interface Cart {
  id: string;
  products: Array<Product>;
}

interface CartActions {
  add: (productId: Product, units?: number) => any;
  remove: (productId: Product, units?: number) => any;
}

type UseCart = [Cart & CartActions, Dispatch<SetStateAction<Cart>>];
const CartContext = React.createContext<UseCart>([
  {} as Cart & CartActions,
  (_: any) => {},
]);

export const useCart = (): UseCart => {
  return useContext(CartContext);
};

export const CartProvider: FC = ({ children }: PropsWithChildren<any>) => {
  const { cartId } = useUser();
  const [cart, setCart] = useState<Cart>({} as Cart);
  useEffect(() => {
    const init = async (cartId: number) => {
      try {
        const { data: cart } = await client.get(`/shopping_cart/${cartId}`);
        setCart(cart);
      } catch (e) {
        console.log("user init:", e);
      }
    };
    if (cartId) {
      init(cartId);
    }
  }, [cartId]);

  const cartActions = {
    ...cart,
    async add({ id: productId }: Product, units: number = 1) {
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
    async remove({ id: productId }: { id: number }, units: number = 1) {
      if (cart.id) {
        try {
          const { data: updatedCart } = await client.delete(
            `/shopping_cart/${cart.id}/products/${productId}`
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
    <CartContext.Provider value={[cartActions, setCart]}>
      {children}
    </CartContext.Provider>
  );
};
