import { API_URL } from "./config";

export async function executeGetRequest(endpoint) {
  const baseURL = API_URL;

  const url = baseURL + endpoint;
  console.log("Fetching: " + url);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.log("DEGUG: Respuesta de red OK pero HTTP no");
    //Se supone que el backend devuelve detail
    throw { code: response.detail };
  }

  const json = await response.json();
  return json;
}
