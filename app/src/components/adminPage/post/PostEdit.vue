<template>
  <div class="input-form mx-xl-5">
    <div class="mt-4">
      <a href="#" @click="transitionPostList">投稿一覧画面</a>
      <span v-if="!refState.isUpdate"> > 投稿 登録画面</span>
      <span v-if="refState.isUpdate"> > 投稿 編集画面</span>
    </div>
    <div class="mt-5">
      <h2 v-if="!refState.isUpdate">投稿 登録画面</h2>
      <h2 v-if="refState.isUpdate">投稿 編集画面</h2>

      <table class="table table-sm shadow table-hover mt-5">
        <tbody>
          <tr :class="{ 'display-none': !refState.isUpdate }">
            <th>No</th>
            <td class="align-middle">{{ refState.post.id }}</td>
          </tr>
          <tr>
            <th>ユーザー名</th>
            <td>
              <SuggestInput
                v-model:value="refState.post.user_name"
                :list="userNameList"
                :placeholder="'ユーザー名を入力してください'"
              ></SuggestInput>
              <label
                :class="{
                  'display-none': judgeDisplay(
                    refState.error_message.user_name
                  ),
                  'is-valid': !isInvalid(refState.error_message.user_name),
                  'is-invalid': isInvalid(refState.error_message.user_name),
                }"
                >{{ refState.error_message.user_name }}</label
              >
            </td>
          </tr>
          <tr>
            <th>内容</th>
            <td>
              <textarea
                type="text"
                class="form-control"
                :class="{
                  'is-valid-textbox':
                    !isInvalid(refState.error_message.post_contents) &&
                    refState.isNotInit,
                  'is-invalid-textbox':
                    isInvalid(refState.error_message.post_contents) &&
                    refState.isNotInit,
                }"
                v-model="refState.post.post_contents"
              />
              <label
                :class="{
                  'display-none': judgeDisplay(
                    refState.error_message.post_contents
                  ),
                  'is-valid': !isInvalid(refState.error_message.post_contents),
                  'is-invalid': isInvalid(refState.error_message.post_contents),
                }"
                >{{ refState.error_message.post_contents }}</label
              >
            </td>
          </tr>
          <tr>
            <th>画像</th>
            <td>
              <input
                type="text"
                class="form-control"
                :class="{
                  'is-valid-textbox':
                    !isInvalid(refState.error_message.post_image) &&
                    refState.isNotInit,
                  'is-invalid-textbox':
                    isInvalid(refState.error_message.post_image) &&
                    refState.isNotInit,
                }"
                v-model="refState.post.post_image"
              />
              <label
                :class="{
                  'display-none': judgeDisplay(
                    refState.error_message.post_image
                  ),
                  'is-valid': !isInvalid(refState.error_message.post_image),
                  'is-invalid': isInvalid(refState.error_message.post_image),
                }"
                >{{ refState.error_message.post_image }}</label
              >
            </td>
          </tr>
          <tr>
            <th>削除</th>
            <td>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  v-model="refState.post.is_delete"
                />
              </div>
            </td>
          </tr>
          <tr>
            <th>登録日</th>
            <td class="align-middle">{{ refState.post.created_at }}</td>
          </tr>
        </tbody>
      </table>
      <button
        type="button"
        class="btn btn-primary create-user-btn"
        @click="createUser"
        v-if="!refState.isUpdate"
      >
        登録
      </button>
      <button
        type="button"
        class="btn btn-primary create-user-btn"
        @click="updateUser"
        v-if="refState.isUpdate"
      >
        更新
      </button>
      <button
        type="button"
        class="btn btn-primary create-user-btn"
        @click="transitionPostList"
      >
        キャンセル
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import dayjs from "dayjs";

import { defineComponent, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Post } from "@/types/Post";
import { lengthCheck, requireCheck } from "@/composables/validationCheck";
import SuggestInput from "@/components/SuggestInput.vue";

interface ExtendPost extends Post {
  user_name: string;
}

interface ErrorMessage {
  user_name: string;
  post_image: string;
  post_contents: string;
}

interface State {
  post: ExtendPost;
  error_message: ErrorMessage;
  isUpdate: boolean;
  isNotInit: boolean;
}

export default defineComponent({
  components: {
    SuggestInput: SuggestInput,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const router = useRouter();

    const initErrorMessage: ErrorMessage = {
      user_name: "",
      post_image: "",
      post_contents: "",
    };

    const refState = reactive<State>({
      post: {
        id: 0,
        user_id: 0,
        user_name: "",
        post_contents: "",
        post_image: "",
        is_delete: false,
        created_at: "",
      },
      error_message: {
        user_name: "",
        post_image: "",
        post_contents: "",
      },
      isUpdate: false,
      isNotInit: false,
    });

    //SuggestInputの引数に渡すユーザー名リストを取得
    const getUserNameList = () => {
      const oReq = new XMLHttpRequest();
      oReq.open("GET", "http://localhost:3000/userNameList/", false);
      oReq.send();
      return oReq.response;
    };

    const stringToArray = (convertTarget: string) => {
      let arrayText = convertTarget.slice(1, convertTarget.length - 1);
      let re = new RegExp('\\"', "g");

      arrayText = arrayText.replaceAll(re, "");
      return arrayText.split(",");
    };

    const userNameList = stringToArray(getUserNameList());
    //レスポンスが文字列になっているので、分割して配列にする必要がある

    //ユーザー情報取得
    onMounted(async () => {
      console.log("onMounted");
      refState.isUpdate = !!Number(props.id);
      if (refState.isUpdate) {
        const result = await axios.get(
          "http://localhost:3000/posts/" + props.id
        );
        refState.post = result.data[0];
        refState.post.created_at = formatDate(refState.post.created_at);
      }
    });

    //ユーザー新規登録
    const createUser = async () => {
      //エラーメッセージをクリア
      Object.assign(refState.error_message, reactive(initErrorMessage));

      if (frontValidationCheck()) {
        await axios
          .post("http://localhost:3000/users/", {
            user: refState.post,
          })
          .then(() => {
            //一覧画面に遷移
            transitionPostList();
          })
          .catch((error) => {
            //エラーメッセージを格納
            refState.error_message.user_name = hasProperty(
              error.response.data,
              "user_name"
            )
              ? error.response.data.user_name[0]
              : "";

            refState.error_message.post_image = hasProperty(
              error.response.data,
              "post_image"
            )
              ? error.response.data.post_image[0]
              : "";

            refState.error_message.post_contents = hasProperty(
              error.response.data,
              "post_contents"
            )
              ? error.response.data.post_contents[0]
              : "";

            refState.isNotInit = true;
          });
      }
    };

    //ユーザー更新
    const updateUser = async () => {
      //エラーメッセージをクリア
      Object.assign(refState.error_message, reactive(initErrorMessage));

      //バリデーションチェックが問題なければ更新処理に進む
      if (frontValidationCheck()) {
        //更新処理をapiに投げる
        await axios
          .patch("http://localhost:3000/users/" + props.id, {
            user: refState.post,
          })
          .then(() => {
            //一覧画面に遷移
            transitionPostList();
          })
          .catch((error) => {
            //エラーメッセージを格納
            refState.error_message.user_name = hasProperty(
              error.response.data,
              "user_name"
            )
              ? error.response.data.user_name[0]
              : "";

            refState.error_message.post_image = hasProperty(
              error.response.data,
              "post_image"
            )
              ? error.response.data.post_image[0]
              : "";

            refState.error_message.post_contents = hasProperty(
              error.response.data,
              "post_contents"
            )
              ? error.response.data.post_contents[0]
              : "";

            refState.isNotInit = true;
          });
      }
    };

    //一覧画面に遷移
    const transitionPostList = () => {
      router.push({
        name: "PostList",
      });
    };

    //フロント側のバリデーション
    const frontValidationCheck = (): boolean => {
      const assignValue = (str1: string, str2: string): string => {
        if (str1 == "") {
          return str2;
        } else {
          return str1;
        }
      };

      refState.error_message.user_name = assignValue(
        lengthCheck(refState.post.user_name, 45),
        requireCheck(refState.post.user_name)
      );
      refState.error_message.post_contents = lengthCheck(
        refState.post.post_contents,
        120
      );
      refState.error_message.post_image = lengthCheck(
        refState.post.post_image,
        1000
      );
      refState.isNotInit = true;

      return !(
        !!refState.error_message.user_name ||
        !!refState.error_message.post_contents ||
        !!refState.error_message.post_image
      );
    };

    const formatDate = (strDate: string) => {
      return dayjs(strDate).format("YYYY/MM/DD hh:mm:ss");
    };

    const judgeFlag = (flag: boolean) => {
      if (flag) {
        return "通知を行う";
      } else {
        return "";
      }
    };

    const judgeDisplay = (displayText: string) => {
      const isDisplay = !!displayText;
      return !isDisplay;
    };

    const isInvalid = (errorMesssage: string) => {
      return !!errorMesssage;
    };

    const hasProperty = (obj: any, key: string) => {
      return Object.prototype.hasOwnProperty.call(obj, key);
    };

    return {
      refState,
      judgeFlag,
      judgeDisplay,
      isInvalid,
      transitionPostList,
      createUser,
      updateUser,
      userNameList,
    };
  },
});
</script>

<style scoped>
button {
  width: 150px;
  margin-top: 30px;
  margin-bottom: 100px;
  margin-right: 50px;
}

.table th {
  width: 15%;
  padding: 10px 40px;
  border-style: none;
}

.table td {
  border-style: none;
}

.birthday-form {
  width: 160px;
  padding: 6px 12px;
}

.birthday-form input {
  border: none;
  text-align: right;
}

.input-year {
  width: 50px;
  text-align: right;
}

.input-month {
  width: 25px;
  text-align: right;
}

.input-day {
  width: 25px;
  text-align: right;
}
</style>
