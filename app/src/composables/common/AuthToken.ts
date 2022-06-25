/* eslint-disable prettier/prettier */
import { AuthHeaders } from "@/types/Auth";

export const getAuthTokenFromStorage = (): AuthHeaders => {
  const access_token: string = localStorage.getItem("access-token") || "";
  const client: string = localStorage.getItem("client") || "";
  const expiry: string = localStorage.getItem("expiry") || "";
  const uid: string = localStorage.getItem("uid") || "";

  return {
    "access-token": access_token,
    "client": client,
    "expiry": expiry,
    "uid": uid,
    "content-type": "application/json",
  };
};

export const setAuthDataFromResponse = (authDate: AuthHeaders): void => {
  if (
    authDate["access-token"] &&
    authDate["client"] &&
    authDate["uid"] &&
    authDate["expiry"]
  ) {
    localStorage.setItem("access-token", authDate["access-token"]);
    localStorage.setItem("client", authDate["client"]);
    localStorage.setItem("client", authDate["client"]);
    localStorage.setItem("expiry", authDate["expiry"]);
  }
};

export const removeAuthDataFromStorage = (): void => {
  localStorage.removeItem("access-token");
  localStorage.removeItem("client");
  localStorage.removeItem("uid");
  localStorage.removeItem("expiry");
};
