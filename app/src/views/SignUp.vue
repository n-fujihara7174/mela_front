<template>
  <div class="signin-page d-flex justify-content-center align-items-center">
    <div class="w-400px w-472px p-20px signin-form">
      <!-- タイトル -->
      <div>
        <h3 class="text-center">サインアップ</h3>
      </div>

      <!-- ユーザー名 -->
      <div class="mt-30px">
        <label>ユーザー名</label>
        <InputField
          v-model:value="refState.loginInfo.name"
          :errorMessage="refState.errorMessage.name"
        >
        </InputField>
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

      <!-- パスワードの確認 -->
      <div class="mt-30px">
        <label>パスワードの確認</label>
        <InputField
          v-model:value="refState.loginInfo.password_confirmation"
          :errorMessage="refState.errorMessage.password_confirmation"
          :type="'password'"
        >
        </InputField>
      </div>

      <!-- 生年月日 -->
      <div class="mt-30px">
        <label>生年月日</label>
        <InputField
          v-model:value="refState.loginInfo.birthday"
          :errorMessage="refState.errorMessage.birthday"
          :type="'date'"
        ></InputField>
      </div>

      {{ refState.loginInfo.birthday }}

      <div>
        <div class="mt-30px">
          <button
            type="button"
            class="btn btn-primary create-user-btn"
            @click="signUp"
          >
            新規登録
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

interface SignUpInfo {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  birthday: string;
  confirm_success_url: string;
}

interface State {
  loginInfo: SignUpInfo;
  errorMessage: SignUpInfo;
}

export default defineComponent({
  components: {
    InputField: InputField,
  },
  setup() {
    const router = useRouter();

    const signUpInfoInit: SignUpInfo = {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      birthday: "",
      confirm_success_url: "",
    };

    const errorMessageInit: SignUpInfo = {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      birthday: "",
      confirm_success_url: "",
    };

    const refState = reactive<State>({
      loginInfo: signUpInfoInit,
      errorMessage: errorMessageInit,
    });

    const signUp = async () => {
      await axios
        .post("http://localhost:3000/auth", {
          name: refState.loginInfo.name,
          email: refState.loginInfo.email,
          password: refState.loginInfo.password,
          password_confirmation: refState.loginInfo.password_confirmation,
          birthday: refState.loginInfo.birthday,
          confirm_success_url: "http://localhost:8080/PostList",
        })
        .then(() => {
          transitionList();
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

    const transitionList = () => {
      router.push({
        name: "List",
      });
    };

    return {
      refState,
      signUp,
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

.w-472px {
  width: 472px;
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