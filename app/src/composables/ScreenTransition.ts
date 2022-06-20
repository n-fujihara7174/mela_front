/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* 画面遷移処理 */
import { useRouter } from "vue-router";

export const screenTransition = () => {
  //新規登録画面
  const toSignUp = (): void => {
    useRouter().push({
      name: "SignUp",
    });
  };

  const toSignIn = (): void => {
    useRouter().push({
      name: "SignIn",
    });
  };

  //
  const toList = (): void => {
    useRouter().push({
      name: "List",
    });
  };

  return {
    toSignIn,
    toSignUp,
    toList,
  };
};
