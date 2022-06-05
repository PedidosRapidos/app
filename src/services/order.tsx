import { imageURL } from "../services/config";

const noImage = require("../../assets/noimage.png");

export const orderImage = (order: any) => {
  const products = order.cart?.products;
  const product = products && products.length > 0 ? products[0] : null;
  return product ? { uri: imageURL(product) } : noImage;
};

export const orderDescription = (order: any): string => {
  const products = order.cart?.products || [];
  const description = products
    .map(({ name }: any) => name as string)
    .reduce((acc: string, name: string) => `${acc}, ${name}`);
  return description || "...";
};

export const stateStr: Record<string, string | undefined> = {
  TO_CONFIRM: "To Confirm",
  CONFIRMED: "Confirmed",
  IN_PREPARATION: "In Preparation",
  UNDER_WAY: "Under Way",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};
