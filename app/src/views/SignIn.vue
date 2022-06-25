<template>
  <main class="mx-auto flex h-screen w-full items-center justify-center">
    <div
      class="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow sm:px-6 md:px-8 lg:px-10"
    >
      <div
        class="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl"
      >
        ログイン
      </div>
      <div class="mt-8">
        <form action="#" autoComplete="off">
          <!-- ユーザー名入力欄 -->
          <div class="flex flex-col mb-10">
            <div class="flex relative">
              <span
                class="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b text-gray-500 shadow-sm text-sm"
                :class="setInvalidClass(refState.errorMessage)"
              >
                <img src="@/assets/mail.svg" alt="" class="w-4" />
              </span>
              <div
                class="rounded-r-lg relative z-0 w-full group px-3 border"
                :class="setInvalidClass(refState.errorMessage)"
              >
                <input
                  type="email"
                  name="floating_email"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-none appearance-none sfocus:outline-none focus:ring-0 peer"
                  placeholder=" "
                  v-model="refState.loginInfo.email"
                />
                <label
                  for="floating_email"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-100 top-3 -z-10 origin-[0] peer-focus:left-3 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-8"
                >
                  Eメール</label
                >
              </div>
            </div>
            <div class="text-xs text-red-600">
              {{ refState.errorMessage }}
            </div>
          </div>

          <!-- パスワード入力欄 -->
          <div class="flex flex-col mb-6">
            <div class="flex relative">
              <span
                class="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b text-gray-500 shadow-sm text-sm"
                :class="setInvalidClass(refState.errorMessage)"
              >
                <img src="@/assets/lock_open.svg" alt="" class="w-4" />
              </span>
              <div class="flex justify-center w-full">
                <div
                  class="relative z-0 w-full group px-3 border"
                  :class="setInvalidClass(refState.errorMessage)"
                >
                  <input
                    :type="refState.isPasswordMasking ? 'password' : 'text'"
                    name="floating_password"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-none appearance-none sfocus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    v-model="refState.loginInfo.password"
                  />
                  <label
                    for="floating_password"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-100 top-3 -z-10 origin-[0] peer-focus:left-3 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-8"
                  >
                    パスワード</label
                  >
                </div>
                <div
                  class="flex content-center border-t border-r border-b rounded-r-lg px-3"
                  :class="setInvalidClass(refState.errorMessage)"
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
            </div>
            <div class="text-xs text-red-600">
              {{ refState.errorMessage }}
            </div>
          </div>
          <div class="flex items-center mb-6 -mt-4">
            <div class="flex ml-auto">
              <a
                href="#"
                class="inline-flex text-xs font-thin text-gray-500 sm:text-sm hover:text-gray-700"
              >
                パスワードを忘れた場合
              </a>
            </div>
          </div>
          <div class="flex w-full">
            <button
              type="button"
              class="py-2 px-4 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              @click="handleSignIn"
            >
              ログイン
            </button>
          </div>
        </form>
      </div>
      <div class="flex items-center justify-center mt-6">
        <a
          href="#"
          class="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700"
          @click="toSignUp"
        >
          <span class="ml-2"> アカウントをお持ちでない場合</span>
        </a>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useSignIn } from "@/composables/SignIn";
import { screenTransition } from "@/composables/common/ScreenTransition";
import { classAssignment } from "@/composables/common/ClassAssignment";

export default defineComponent({
  setup() {
    const { refState, handleSignIn, inversionPasswordMasking } = useSignIn();
    const { toSignUp } = screenTransition();
    const { setInvalidClass } = classAssignment();

    return {
      refState,
      handleSignIn,
      inversionPasswordMasking,
      toSignUp,
      setInvalidClass,
    };
  },
});
</script>
