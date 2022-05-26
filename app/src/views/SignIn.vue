<template>
  <div class="signin-page d-flex justify-content-center align-items-center">
    <div class="w-400px h-320px p-20px signin-form">
      <!-- タイトル -->
      <div>
        <h3 class="text-center">サインイン</h3>
      </div>

      <!-- メールアドレス -->
      <div class="mt-30px">
        <label>メールアドレス</label>
        <input
          id="input"
          type="text"
          class="form-control"
          :class="{
            'is-invalid-textbox': isInvalid(refState.errorMessage),
          }"
          v-model="refState.loginInfo.email"
        />
      </div>

      <!-- パスワード -->
      <div class="mt-30px">
        <label>パスワード</label>
        <input
          id="input"
          type="text"
          class="form-control"
          :class="{
            'is-invalid-textbox': isInvalid(refState.errorMessage),
          }"
          v-model="refState.loginInfo.password"
        />
      </div>

      <div>
        <label v-if="judgeDisplay(refState.errorMessage)" class="is-invalid">{{
          refState.errorMessage
        }}</label>
        <div v-else class="empty-error-message"></div>
      </div>

      <div class="mt-60px d-flex justify-content-between">
        <div>
          <a href="#" @click="transitionSignUp">アカウントの作成</a>
        </div>
        <div>
          <button
            type="button"
            class="btn btn-primary create-user-btn"
            @click="handleLogin"
          >
            ログイン
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/api/Auth";

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

    const handleLogin = async () => {
      await login(refState.loginInfo.email, refState.loginInfo.password)
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

    const transitionList = () => {
      router.push({
        name: "List",
      });
    };

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
      handleLogin,
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
