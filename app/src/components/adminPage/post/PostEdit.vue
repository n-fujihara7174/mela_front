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
            <th>ユーザーID</th>
            <td>
              <SuggestInput
                v-model:value="refState.post.unique_user_id"
                :list="userIdList"
                :placeholder="'ユーザー名を入力してください'"
                :errorMessage="refState.error_message.unique_user_id"
                :isNotInit="refState.isNotInit"
              ></SuggestInput>
              <label
                :class="{
                  'display-none': judgeDisplay(
                    refState.error_message.unique_user_id
                  ),
                  'is-valid': !isInvalid(refState.error_message.unique_user_id),
                  'is-invalid': isInvalid(
                    refState.error_message.unique_user_id
                  ),
                }"
                >{{ refState.error_message.unique_user_id }}</label
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
          <tr v-if="refState.isUpdate">
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
  unique_user_id: string;
}

interface ErrorMessage {
  unique_user_id: string;
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
      unique_user_id: "",
      post_image: "",
      post_contents: "",
    };

    const refState = reactive<State>({
      post: {
        id: 0,
        user_id: 0,
        unique_user_id: "",
        post_contents: "",
        post_image: "",
        is_delete: false,
        created_at: "",
      },
      error_message: {
        unique_user_id: "",
        post_image: "",
        post_contents: "",
      },
      isUpdate: false,
      isNotInit: false,
    });

    //SuggestInputの引数に渡すユーザー名リストを取得
    const getUserIdList = () => {
      const oReq = new XMLHttpRequest();
      oReq.open("GET", "http://localhost:3000/userIdList/", false);
      oReq.send();
      return oReq.response;
    };

    const stringToArray = (convertTarget: string) => {
      let arrayText = convertTarget.slice(1, convertTarget.length - 1);
      let re = new RegExp('\\"', "g");

      arrayText = arrayText.replaceAll(re, "");
      return arrayText.split(",");
    };

    const userIdList = stringToArray(getUserIdList());
    //レスポンスが文字列になっているので、分割して配列にする必要がある

    //ユーザー情報取得
    onMounted(async () => {
      console.log("onMounted");
      console.log("!!Number(props.id) : " + !!Number(props.id));
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
          .post("http://localhost:3000/posts/", {
            post: refState.post,
          })
          .then(() => {
            //一覧画面に遷移
            transitionPostList();
          })
          .catch((error) => {
            //エラーメッセージを格納
            refState.error_message.unique_user_id = hasProperty(
              error.response.data,
              "unique_user_id"
            )
              ? error.response.data.unique_user_id[0]
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
          .patch("http://localhost:3000/posts/" + props.id, {
            post: refState.post,
          })
          .then(() => {
            //一覧画面に遷移
            transitionPostList();
          })
          .catch((error) => {
            //エラーメッセージを格納
            refState.error_message.unique_user_id = hasProperty(
              error.response.data,
              "unique_user_id"
            )
              ? error.response.data.unique_user_id[0]
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

      refState.error_message.unique_user_id = assignValue(
        lengthCheck(refState.post.unique_user_id, 45),
        requireCheck(refState.post.unique_user_id)
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
        !!refState.error_message.unique_user_id ||
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
      userIdList,
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
