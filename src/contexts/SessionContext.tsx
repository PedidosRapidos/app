import React, { FC, PropsWithChildren } from "react";
import { CartProvider } from "./CartContext";
import { UserProvider, useUser } from "./UserContext";

export const SessionProvider: FC = ({ children }: PropsWithChildren<any>) => {
  return (
    <UserProvider>
      <CartProvider>{children}</CartProvider>
    </UserProvider>
  );
};

export const WithSession = ({ children }: PropsWithChildren<any>) => {
  const user = useUser();
  if (user.id) {
    return children;
  }
  return null;
};

export const WithClientSession = ({ children }: PropsWithChildren<any>) => {
  const user = useUser();
  if (user.id && user.isClient) {
    return children;
  }
  return null;
};

export const WithSellerSession = ({ children }: PropsWithChildren<any>) => {
  const user = useUser();
  if (user.id && user.isOwner) {
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
