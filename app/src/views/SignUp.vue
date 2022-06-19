<template>
  <main class="mx-auto flex h-screen w-full items-center justify-center">
    <div
      class="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10"
    >
      <div
        class="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white"
      >
        新規登録
      </div>
      <div class="mt-8">
        <form action="#" autoComplete="off">
          <div
            class="rounded-lg relative z-0 w-full mb-10 group px-3 border border-gray-300"
          >
            <input
              type="text"
              name="floating_user_name"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-none appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 sfocus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              for="floating_user_name"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-100 top-3 -z-10 origin-[0] peer-focus:left-3 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-8"
            >
              ユーザー名</label
            >
          </div>
          <div
            class="rounded-lg relative z-0 w-full mb-10 group px-3 border border-gray-300"
          >
            <input
              type="email"
              name="floating_email"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-none appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 sfocus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              for="floating_email"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-100 top-3 -z-10 origin-[0] peer-focus:left-3 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-8"
            >
              Eメール</label
            >
          </div>
          <div class="flex justify-center">
            <div
              class="rounded-l-lg relative z-0 w-full mb-10 group px-3 border border-gray-300"
            >
              <input
                :type="refState.isPasswordMasking ? 'password' : 'text'"
                name="floating_password"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-none appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 sfocus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                for="floating_password"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-100 top-3 -z-10 origin-[0] peer-focus:left-3 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-8"
              >
                パスワード</label
              >
            </div>
            <div
              class="flex content-center border-t border-r border-b border-gray-300 rounded-r-lg px-3 mb-10"
            >
              <button type="button" @click="inversionPasswordMasking">
                <img
                  v-if="refState.isPasswordMasking"
                  src="@/assets/eye_off.svg"
                  alt=""
                  class="w-8"
                />
                <img
                  v-if="!refState.isPasswordMasking"
                  src="@/assets/eye.svg"
                  alt=""
                  class="w-8"
                />
              </button>
            </div>
          </div>
          <div class="flex w-full">
            <button
              type="submit"
              class="py-2 px-4 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            >
              新規登録
            </button>
          </div>
        </form>
      </div>
      <div class="flex items-center justify-center mt-6">
        <a
          href="#"
          target="_blank"
          class="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white"
        >
          <span class="ml-2"> アカウントをお持ちの場合</span>
        </a>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import { sign_up } from "@/api/Auth";

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

export default defineComponent({
  setup() {
    const router = useRouter();

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
      console.log(refState.loginInfo);
      await sign_up(
        refState.loginInfo.name,
        refState.loginInfo.password,
        refState.loginInfo.password_confirmation,
        refState.loginInfo.email
      )
        .then((res) => {
          if (res?.status === 200) {
            //トップ画面に遷移
            router.push({
              name: "List",
            });
          } else {
            console.log("失敗");
          }
        })
        .catch((error) => {
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
          if (errorList.indexOf("password_confirmation") !== -1) {
            refState.errorMessage.password_confirmation =
              error.response?.data.errors.password_confirmation[0];
          }
        });
    };

    const inversionPasswordMasking = () => {
      refState.isPasswordMasking = !refState.isPasswordMasking;
    };

    const transitionSignIn = () => {
      router.push({
        name: "SignIn",
      });
    };

    return {
      refState,
      handleSignUp,
      transitionSignIn,
      inversionPasswordMasking,
    };
  },
});
</script>
