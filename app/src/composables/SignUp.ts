/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
//アカウント新規作成画面の内部処理
import { reactive } from "vue";
import { sign_up } from "@/composables/api/Auth";

interface SignUpInfo {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  confirm_success_url: string;
}

interface State {
  loginInfo: SignUpInfo;
  errorMessage: SignUpInfo;
  isPasswordMasking: boolean;
}

export const useSignUp = () => {
  const signUpInfoInit: SignUpInfo = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    confirm_success_url: "",
  };

  const errorMessageInit: SignUpInfo = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    confirm_success_url: "",
  };

  const refState = reactive<State>({
    loginInfo: signUpInfoInit,
    errorMessage: errorMessageInit,
    isPasswordMasking: true,
  });

  const handleSignUp = async () => {
    refState.loginInfo.password_confirmation = refState.loginInfo.password;

    console.log("handleSignUpを通った");

    await sign_up(
      refState.loginInfo.name,
      refState.loginInfo.password,
      refState.loginInfo.password_confirmation,
      refState.loginInfo.email
    )
      .then((res) => {
        if (res?.status === 200) {
          console.log("成功");
          //ここに遷移処理を記載
        } else {
          console.log("失敗");
        }
      })
      .catch((error) => {
        console.log(".catch(error)");
        console.log(error);
        const errorList = Object.keys(error.response?.data?.errors);
        if (errorList.indexOf("name") !== -1) {
          refState.errorMessage.name = error.response?.data.errors.name[0];
        }
        if (errorList.indexOf("email") !== -1) {
          refState.errorMessage.email = error.response?.data.errors.email[0];
        }
        if (errorList.indexOf("password") !== -1) {
          refState.errorMessage.password =
            error.response?.data.errors.password[0];
        }
        console.log(".catchの一番下");
      });
  };

  const inversionPasswordMasking = () => {
    refState.isPasswordMasking = !refState.isPasswordMasking;
  };

  return {
    refState,
    handleSignUp,
    inversionPasswordMasking,
  };
};
