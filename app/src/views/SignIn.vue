<template>
  <div
    class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <img class="mx-auto h-12 w-auto" src="" alt="Workflow" />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
            start your 14-day free trial
          </a>
        </p>
      </div>
      <form class="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <a
              href="#"
              class="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <!-- Heroicon name: solid/lock-closed -->
            </span>
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import { sign_in } from "@/api/Auth";

interface LoginInfo {
  email: string;
  password: string;
}

interface State {
  loginInfo: LoginInfo;
  errorMessage: string;
}

export default defineComponent({
  setup() {
    const router = useRouter();

    const loginInfoInit: LoginInfo = {
      email: "",
      password: "",
    };

    const refState = reactive<State>({
      loginInfo: loginInfoInit,
      errorMessage: "",
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

    const transitionSignUp = () => {
      router.push({
        name: "SignUp",
      });
    };

    // const transitionList = () => {
    //   router.push({
    //     name: "List",
    //   });
    // };

    const judgeDisplay = (displayText: string) => {
      const isDisplay = !!displayText;
      console.log(isDisplay);
      return isDisplay;
    };

    const isInvalid = (errorMesssage: string) => {
      return !!errorMesssage;
    };

    return {
      refState,
      handleSignIn,
      transitionSignUp,
      judgeDisplay,
      isInvalid,
    };
  },
});
</script>

<style scoped>
.signin-page {
  width: 100vw;
  height: 100vh;
}

.signin-form {
  background-color: white;
  border-radius: 6px;
}

.w-100 {
  width: 100%;
}

.w-400px {
  width: 400px;
}

.h-320px {
  height: 340px;
}

.mt-30px {
  margin-top: 30px;
}

.mt-60px {
  margin-top: 60px;
}

.mt-30 {
  margin-top: 20vh;
}

.p-20px {
  padding: 20px;
}

.empty-error-message {
  height: 19.2px;
}
</style>
