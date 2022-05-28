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

      <div class="mt-60px d-flex justify-content-between">
        <div>
          <a href="#" @click="transitionSignIn">サインイン</a>
        </div>
        <div>
          <button
            type="button"
            class="btn btn-primary create-user-btn"
            @click="handleSignUp"
          >
            新規登録
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import InputField from "@/components/common/molecules/InputField.vue";
import { sign_up } from "@/api/Auth";
import { AxiosError } from "axios";

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
    });

    const handleSignUp = async () => {
      await sign_up(
        refState.loginInfo.name,
        refState.loginInfo.email,
        refState.loginInfo.password,
        refState.loginInfo.password_confirmation
      )
        .then((res) => {
          if (res?.status === 200) {
            console.log("成功");
          } else {
            console.log("失敗");
          }

          console.log(res);
        })
        .catch((error) => {
          console.log("catch");
          setErrorMessage(error);
        });
    };

    const setErrorMessage = (error: AxiosError) => {
      const errorList = Object.keys(error.response?.data?.errors);
      if (errorList.indexOf("name") !== -1) {
        console.log("error.response?.data.errors.name[0]");
        console.log(error.response?.data.errors.name[0]);
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
      console.log("エラー時");
      console.log("refState.errorMessage");
      console.log(refState.errorMessage);
    };

    const transitionSignIn = () => {
      router.push({
        name: "SignIn",
      });
    };

    const transitionList = () => {
      router.push({
        name: "List",
      });
    };

    return {
      refState,
      handleSignUp,
      transitionSignIn,
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
