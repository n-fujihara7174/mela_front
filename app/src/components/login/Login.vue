<template>
  <div>
    <label>メールアドレス</label>
    <InputField
      v-model:value="refState.loginInfo.email"
      :errorMessage="refState.errorMessage.email"
    >
    </InputField>
    <label>パスワード</label>
    <InputField
      v-model:value="refState.loginInfo.password"
      :errorMessage="refState.errorMessage.password"
      :type="'password'"
    >
    </InputField>
    <button
      type="button"
      class="btn btn-primary create-user-btn"
      @click="login"
    >
      ログイン
    </button>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, reactive } from "vue";
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
        .then(() => {
          //メールを送信
        })
        .catch((error) => {
          //エラーメッセージを格納
          refState.errorMessage = error.response.data;
        });
    };

    return {
      refState,
      login,
    };
  },
});
</script>
