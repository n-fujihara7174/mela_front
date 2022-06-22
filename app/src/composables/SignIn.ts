/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { reactive } from "vue";
import { sign_in } from "@/composables/api/Auth";

interface LoginInfo {
  email: string;
  password: string;
}

interface State {
  loginInfo: LoginInfo;
  errorMessage: string;
  isPasswordMasking: boolean;
}

export const useSignIn = () => {
  const loginInfoInit: LoginInfo = {
    email: "",
    password: "",
  };

  const refState = reactive<State>({
    loginInfo: loginInfoInit,
    errorMessage: "",
    isPasswordMasking: true,
  });

  const handleSignIn = async () => {
    await sign_in(refState.loginInfo.email, refState.loginInfo.password)
      .then((res) => {
        if (res?.status === 200) {
          console.log("成功！");
          console.log(res);
        } else {
          refState.errorMessage =
            "メールアドレスかパスワードが間違っています。";
        }
      })
      .catch(() => {
        alert("ログインに失敗しました。");
      });
  };

  const inversionPasswordMasking = () => {
    refState.isPasswordMasking = !refState.isPasswordMasking;
  };

  return {
    refState,
    handleSignIn,
    inversionPasswordMasking,
  };
};
