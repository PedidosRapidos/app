import axios from "axios";
import * as Device from "expo-device";

const profiles = {
  prod: "https://pedidos-rapidos.herokuapp.com",
  paulo: Device.isDevice ? "http://192.168.1.38:8080" : "http://10.0.2.2:8080",
  agus: Device.isDevice ? "http://192.168.0.13:8080" : "http://10.0.2.2:8080",
};

export const API_URL = // profiles.prod; // prod
  // profiles.agus; // agus
  profiles.paulo; // paulo

const client = axios.create({
  baseURL: API_URL,
  timeout: 120000,
});

export const imageURL = ({ image_url, id }: any) => {
  const url = image_url
    ? `${API_URL}${image_url}`
    : `${API_URL}/products/${id}/image`;
  return url;
};

export default client;
