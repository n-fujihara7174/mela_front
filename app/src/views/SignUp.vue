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
              v-model="refState.loginInfo.name"
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
              v-model="refState.loginInfo.email"
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
                v-model="refState.loginInfo.password"
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
              @click="handleSignUp"
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
          @click="toSignIn"
        >
          <span class="ml-2"> アカウントをお持ちの場合</span>
        </a>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useSignUp } from "@/composables/signUp/SignUp";
import { screenTransition } from "@/composables/ScreenTransition";

export default defineComponent({
  setup() {
    const { refState, handleSignUp, inversionPasswordMasking } = useSignUp();
    const { toSignIn } = screenTransition();

    return {
      refState,
      handleSignUp,
      inversionPasswordMasking,
      toSignIn,
    };
  },
});
</script>
