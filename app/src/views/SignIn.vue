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
        <InputField
          v-model:value="refState.loginInfo.email"
          :errorMessage="refState.errorMessage.email"
        >
        </InputField>
      </div>

      <!-- パスワード -->
      <div class="mt-30px">
        <label>パスワード</label>
        <InputField
          v-model:value="refState.loginInfo.password"
          :errorMessage="refState.errorMessage.password"
          :type="'password'"
        >
        </InputField>
      </div>

      <div class="mt-60px d-flex justify-content-between">
        <div>
          <a href="#" @click="transitionSignUp">アカウントの作成</a>
        </div>
        <div>
          <button
            type="button"
            class="btn btn-primary create-user-btn"
            @click="login"
          >
            ログイン
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import InputField from "@/components/common/molecules/InputField.vue";

interface LoginInfo {
  email: string;
  password: string;
}

interface State {
  loginInfo: LoginInfo;
  errorMessage: LoginInfo;
}

export default defineComponent({
  components: {
    InputField: InputField,
  },
  setup() {
    const router = useRouter();

    const loginInfoInit: LoginInfo = {
      email: "",
      password: "",
    };

    const errorMessageInit: LoginInfo = {
      email: "",
      password: "",
    };

    const refState = reactive<State>({
      loginInfo: loginInfoInit,
      errorMessage: errorMessageInit,
    });

    const login = async () => {
      await axios
        .post("http://localhost:3000/auth/sign_in", {
          email: refState.loginInfo.email,
          password: refState.loginInfo.password,
        })
        .catch((error) => {
          //エラーメッセージを格納
          refState.errorMessage = error.response.data;
        });
    };

    const transitionSignUp = () => {
      router.push({
        name: "SignUp",
      });
    };

    return {
      refState,
      login,
      transitionSignUp,
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
  height: 320px;
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
</style>
