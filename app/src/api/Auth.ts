/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Client from "@/api/Client";
import { User } from "@/types/User";
import { AuthHeaders } from "@/types/Auth";
import {
  getAuthTokenFromStorage,
  removeAuthDataFromStorage,
  setAuthDataFromResponse,
} from "@/utils/AuthToken";

import { AxiosResponse, AxiosError } from "axios";

export const login = async (email: string, password: string) => {
  return await Client.post<User>("/auth/sign_in", { email, password })
    .then((res: AxiosResponse<User>) => {
      const header: AuthHeaders = {
        "access-token": "",
        uid: "",
        client: "",
        expiry: "",
        "content-type": "",
      };
      header["access-token"] = res.headers["access-token"] || "";
      header["uid"] = res.headers["uid"] || "";
      header["client"] = res.headers["client"] || "";
      header["expiry"] = res.headers["expiry"] || "";
      header["content-type"] = res.headers["content-type"] || "";
      setAuthDataFromResponse(header);
      return res;
    })
    .catch((err: AxiosError) => {
      return err.response;
    });
};

export const logout = async () => {
  return await Client.delete("/auth/sign_out", {
    headers: getAuthTokenFromStorage(),
  }).then(() => {
    removeAuthDataFromStorage();
  });
};
