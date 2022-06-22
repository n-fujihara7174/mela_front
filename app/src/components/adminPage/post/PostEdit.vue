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
              <InputField
                v-model:value="refState.post.users_table_user_id"
                :errorMessage="refState.error_message.user"
                :list="userIdList"
              ></InputField>
            </td>
          </tr>
          <tr>
            <th>内容</th>
            <td>
              <InputField
                v-model:value="refState.post.post_contents"
                :errorMessage="refState.error_message.post_contents"
              ></InputField>
            </td>
          </tr>
          <tr>
            <th>画像</th>
            <td>
              <InputField
                v-model:value="refState.post.post_image"
                :errorMessage="refState.error_message.post_image"
              ></InputField>
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
            <td class="align-middle">
              {{ formatDate(refState.post.created_at) }}
            </td>
          </tr>
        </tbody>
      </table>
      <button
        type="button"
        class="btn btn-primary create-user-btn"
        @click="createPost"
        v-if="!refState.isUpdate"
      >
        登録
      </button>
      <button
        type="button"
        class="btn btn-primary create-user-btn"
        @click="updatePost"
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

import { defineComponent, reactive, watch } from "vue";
import { useRouter } from "vue-router";
import { Post } from "@/types/Post";
import {
  lengthCheck,
  requireCheck,
  determineAssignValue,
} from "@/composables/common/ValidationCheck";
import InputField from "@/components/common/molecules/InputField.vue";

/* ***********************************************************************************
Post型にusers.user_idを格納するプロパティを追加
*********************************************************************************** */
interface ExtendPost extends Post {
  users_table_user_id: string;
}

/* ***********************************************************************************
エラーメッセージを格納するオブジェクトの型を定義
*********************************************************************************** */
interface ErrorMessage {
  user: string;
  post_image: string;
  post_contents: string;
}

/* ***********************************************************************************
本モジュール全体で使用する変数の定義
*********************************************************************************** */
interface State {
  post: ExtendPost;
  error_message: ErrorMessage;
  isUpdate: boolean;
  isNotInit: boolean;
}

/* ***********************************************************************************
引数定義
状態を保持する変数を定義
*********************************************************************************** */
export default defineComponent({
  components: {
    InputField: InputField,
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
      user: "",
      post_image: "",
      post_contents: "",
    };

    const refState = reactive<State>({
      post: {
        id: 0,
        user_id: 0,
        users_table_user_id: "",
        post_contents: "",
        post_image: "",
        is_delete: false,
        created_at: "",
      },
      error_message: {
        user: "",
        post_image: "",
        post_contents: "",
      },
      isUpdate: false,
      isNotInit: false,
    });

    /* ***********************************************************************************
    サジェスト入力用のリストを取得する
    *********************************************************************************** */
    //SuggestInputの引数に渡すユーザー名リストを取得
    const getUserIdList = () => {
      const oReq = new XMLHttpRequest();
      oReq.open("GET", "http://localhost:3000/userIdList/", false);
      oReq.send();
      return oReq.response;
    };

    //getUserIdListの取得結果を文字列から配列に変換
    const stringToArray = (convertTarget: string) => {
      let arrayText = convertTarget.slice(1, convertTarget.length - 1);
      let re = new RegExp('\\"', "g");

      arrayText = arrayText.replaceAll(re, "");
      return arrayText.split(",");
    };

    //ユーザーIDリストのレスポンスが文字列になっているので、分割して配列にする必要がある
    const userIdList = stringToArray(getUserIdList());

    /* ***********************************************************************************
    選択したレコードの情報を取得
    *********************************************************************************** */
    //日付をフォーマットする
    const formatDate = (strDate: string) => {
      return dayjs(strDate).format("YYYY/MM/DD hh:mm:ss");
    };

    //投稿データをposts.idで取得する
    //子コンポーネントに値を渡すために同期処理で取得
    const getPostById = () => {
      const oReq = new XMLHttpRequest();
      oReq.open("GET", "http://localhost:3000/posts/" + props.id, false);
      oReq.send();
      return JSON.parse(oReq.response);
    };

    //ユーザー情報取得
    refState.isUpdate = !!Number(props.id);
    if (refState.isUpdate) {
      const postObject = getPostById();
      refState.post = postObject[0];
    }

    /* ***********************************************************************************
      投稿情報 登録処理
    *********************************************************************************** */
    const createPost = async () => {
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
            refState.error_message = error.response.data;
            refState.isNotInit = true;
          });
      }
    };

    /* ***********************************************************************************
      投稿情報 更新処理
    *********************************************************************************** */
    const updatePost = async () => {
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
            refState.error_message = error.response.data;
            refState.isNotInit = true;
          });
      }
    };

    /* ***********************************************************************************
      バリデーション
    *********************************************************************************** */
    //全てのバリデーションが問題ないかチェック
    const frontValidationCheck = (): boolean => {
      return !(
        !!refState.error_message.user ||
        !!refState.error_message.post_image ||
        !!refState.error_message.post_contents
      );
    };

    //ユーザーIDのバリデーション
    watch(
      () => refState.post.users_table_user_id,
      () => {
        const lengthCheckResult = lengthCheck(
          refState.post.users_table_user_id,
          45
        );
        const requireCheckResult = requireCheck(
          refState.post.users_table_user_id
        );
        refState.error_message.user = determineAssignValue(
          lengthCheckResult,
          requireCheckResult
        );
      }
    );

    //投稿内容のバリデーション
    watch(
      () => refState.post.post_contents,
      () => {
        refState.error_message.post_contents = lengthCheck(
          refState.post.post_contents,
          120
        );
      }
    );

    //投稿画像のバリデーション
    watch(
      () => refState.post.post_image,
      () => {
        refState.error_message.post_image = lengthCheck(
          refState.post.post_image,
          1000
        );
      }
    );

    /* ***********************************************************************************

    *********************************************************************************** */
    const isInvalid = (errorMesssage: string) => {
      return !!errorMesssage;
    };

    //一覧画面に遷移
    const transitionPostList = () => {
      router.push({
        name: "PostList",
      });
    };

    return {
      refState,
      formatDate,
      isInvalid,
      transitionPostList,
      createPost,
      updatePost,
      userIdList,
      frontValidationCheck,
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

.inline {
  display: inline;
}
</style>
