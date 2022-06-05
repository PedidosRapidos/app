import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  qualification?: number;
  image_url?: string;
}

interface Shop {
  products: Array<Product>;
}

const ShopDetailContext = createContext<[Shop, Dispatch<SetStateAction<Shop>>]>(
  [{} as Shop, (_: any) => {}]
);

export const useShopDetail = () => {
  return useContext(ShopDetailContext);
};

export const ShopDetailProvider = ({ children }: PropsWithChildren<any>) => {
  const state = useState<Shop>({} as Shop);
  return (
    <ShopDetailContext.Provider value={state}>
      {children}
    </ShopDetailContext.Provider>
  );
};
