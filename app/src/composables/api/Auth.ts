/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Client from "@/composables/api/Client";
import { User } from "@/types/User";
import { AuthHeaders } from "@/types/Auth";
import {
  getAuthTokenFromStorage,
  removeAuthDataFromStorage,
  setAuthDataFromResponse,
} from "@/utils/AuthToken";
import config from "@/const";
import { AxiosResponse, AxiosError } from "axios";

//サインイン
export const sign_in = async (email: string, password: string) => {
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

//サインアウト
export const sign_out = async () => {
  return await Client.delete("/auth/sign_out", {
    headers: getAuthTokenFromStorage(),
  }).then(() => {
    removeAuthDataFromStorage();
  });
};

//新規登録
export const sign_up = async (
  name: string,
  password: string,
  password_confirmation: string,
  email: string
) => {
  return await Client.post<User>("/auth", {
    name,
    password,
    password_confirmation,
    email,
    confirm_success_url: config.CONFIRM_SUCCESS_URL,
    headers: getAuthTokenFromStorage(),
  })
    .then((res: AxiosResponse<User>) => {
      console.log("sign_upメソッド→成功");
      return res;
    })
    .catch((err: AxiosError) => {
      console.log("sign_upメソッド→失敗");
      throw err;
    });
};
