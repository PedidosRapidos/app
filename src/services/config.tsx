import axios from "axios";

export const API_URL = "https://pedidos-rapidos.herokuapp.com"; // prod
//"http://192.168.100.4:8080"; // device -> localhost
// "http://192.168.0.13:8080"; // agus
//"http://10.0.2.2:8080"; // emulator -> localhost

const client = axios.create({
  baseURL: API_URL,
  timeout: 120000,
});

export default client;
