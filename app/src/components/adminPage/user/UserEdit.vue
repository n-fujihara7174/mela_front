<template>
  <div class="input-form mx-xl-5">
    <div class="mt-4">
      <a href="#" @click="transitionList">ユーザー 一覧画面</a>
      <span v-if="!refState.isUpdate"> > ユーザー 登録画面</span>
      <span v-if="refState.isUpdate"> > ユーザー 編集画面</span>
    </div>
    <div class="mt-5">
      <h2 v-if="!refState.isUpdate">ユーザー 登録画面</h2>
      <h2 v-if="refState.isUpdate">ユーザー 編集画面</h2>
      <table class="table table-sm shadow table-hover mt-5">
        <tbody>
          <tr :class="{ 'display-none': !refState.isUpdate }">
            <th>No</th>
            <td class="align-middle">{{ refState.user.id }}</td>
          </tr>
          <tr>
            <th>ユーザー名</th>
            <td>
              <InputField
                v-model:value="refState.user.user_name"
                :errorMessage="refState.error_message.user_name"
              ></InputField>
            </td>
          </tr>
          <tr>
            <th>ユーザーID</th>
            <td>
              <InputField
                v-model:value="refState.user.user_id"
                :errorMessage="refState.error_message.user_id"
              ></InputField>
            </td>
          </tr>
          <tr>
            <th>メールアドレス</th>
            <td>
              <InputField
                v-model:value="refState.user.email"
                :errorMessage="refState.error_message.email"
              ></InputField>
            </td>
          </tr>
          <tr>
            <th>電話番号</th>
            <td>
              <InputField
                v-model:value="refState.user.phone_number"
                :errorMessage="refState.error_message.phone_number"
              ></InputField>
            </td>
          </tr>
          <tr>
            <th>生年月日</th>
            <td>
              <InputField
                v-model:value="refState.user.birthday"
                :errorMessage="refState.error_message.birthday"
                :type="'date'"
              ></InputField>
            </td>
          </tr>
          <tr>
            <th>画像</th>
            <td>
              <InputField
                v-model:value="refState.user.image"
                :errorMessage="refState.error_message.image"
              ></InputField>
            </td>
          </tr>
          <tr>
            <th>自己紹介</th>
            <td>
              <InputField
                v-model:value="refState.user.self_introduction"
                :errorMessage="refState.error_message.self_introduction"
                :type="'textarea'"
              ></InputField>
            </td>
          </tr>
          <tr>
            <th>いいね通知</th>
            <td>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  v-model="refState.user.can_like_notification"
                />
              </div>
            </td>
          </tr>
          <tr>
            <th>コメント通知</th>
            <td>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  v-model="refState.user.can_comment_notification"
                />
              </div>
            </td>
          </tr>
          <tr>
            <th>メッセージ通知</th>
            <td>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  v-model="refState.user.can_message_notification"
                />
              </div>
            </td>
          </tr>
          <tr>
            <th>カレンダー通知</th>
            <td>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  v-model="refState.user.can_calender_notification"
                />
              </div>
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
                  v-model="refState.user.is_delete"
                />
              </div>
            </td>
          </tr>
          <tr>
            <th>登録日</th>
            <td class="align-middle">{{ refState.user.created_at }}</td>
          </tr>
          <tr>
            <th>前回更新日</th>
            <td class="align-middle">{{ refState.user.updated_at }}</td>
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
        @click="transitionList"
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
import { User } from "@/types/User";
import {
  lengthCheck,
  requireCheck,
  checkDateFormat,
  checkDateValue,
  determineAssignValue,
} from "@/composables/validationCheck";
import InputField from "@/components/adminPage/common/molecules/InputField.vue";

/* ***********************************************************************************
エラーメッセージを格納するオブジェクトの型を定義
*********************************************************************************** */
interface ErrorMessage {
  user_name: string;
  user_id: string;
  email: string;
  phone_number: string;
  birthday: string;
  image: string;
  self_introduction: string;
}

/* ***********************************************************************************
モジュール全体で使うオブジェクトの定義
*********************************************************************************** */
interface State {
  user: User;
  error_message: ErrorMessage;
  isUpdate: boolean;
  isNotInit: boolean;
}

export default defineComponent({
  /* ***********************************************************************************
  コンポーネント読み込み
  *********************************************************************************** */
  components: {
    InputField: InputField,
  },

  /* ***********************************************************************************
  コンポーネントの引数を設定
  *********************************************************************************** */
  props: {
    id: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    /* ***********************************************************************************
    コンポーネント全体で使用する変数の定義
    *********************************************************************************** */
    const router = useRouter();

    const initErrorMessage: ErrorMessage = {
      user_name: "",
      user_id: "",
      email: "",
      phone_number: "",
      birthday: "",
      image: "",
      self_introduction: "",
    };

    const refState = reactive<State>({
      user: {
        id: 0,
        user_name: "",
        user_id: "",
        self_introduction: "",
        email: "",
        phone_number: "",
        birthday: "",
        image: "",
        can_like_notification: false,
        can_comment_notification: false,
        can_message_notification: false,
        can_calender_notification: false,
        is_delete: false,
        created_at: "",
        updated_at: "",
      },
      birthday: {
        year: "",
        month: "",
        day: "",
      },
      error_message: {
        user_name: "",
        user_id: "",
        email: "",
        phone_number: "",
        birthday: "",
        image: "",
        self_introduction: "",
      },
      isUpdate: false,
      isNotInit: false,
    });

    /* ***********************************************************************************
    一覧画面で選択されたユーザー情報を取得
    *********************************************************************************** */
    const getUserById = () => {
      const oReq = new XMLHttpRequest();
      oReq.open(
        "GET",
        "http://localhost:3000/users/" + props.id.toString(),
        false
      );
      oReq.send();
      return JSON.parse(oReq.response);
    };

    //登録日付、更新日付をフォーマット
    const formatDate = (strDate: string) => {
      return dayjs(strDate).format("YYYY/MM/DD hh:mm:ss");
    };

    const setUser = () => {
      const user = getUserById();
      refState.user = user[0];
      refState.user.created_at = formatDate(refState.user.created_at);
      refState.user.updated_at = formatDate(refState.user.updated_at);
      refState.user.birthday = dayjs(refState.user.birthday).format(
        "YYYY/MM/DD"
      );
    };

    setUser();

    /* ***********************************************************************************
    ユーザー情報の登録・更新処理
    *********************************************************************************** */
    //ユーザー新規登録
    const createUser = async () => {
      //エラーメッセージをクリア
      Object.assign(refState.error_message, reactive(initErrorMessage));

      if (frontValidationCheck()) {
        await axios
          .post("http://localhost:3000/users/", {
            user: refState.user,
          })
          .then(() => {
            //一覧画面に遷移
            transitionList();
          })
          .catch((error) => {
            //エラーメッセージを格納
            refState.error_message = error.response.data;
            refState.isNotInit = true;
          });
      }
    };

    //ユーザー更新
    const updateUser = async () => {
      //エラーメッセージをクリア
      Object.assign(refState.error_message, reactive(initErrorMessage));

      if (frontValidationCheck()) {
        //更新処理をapiに投げる
        await axios
          .patch("http://localhost:3000/users/" + props.id, {
            user: refState.user,
          })
          .then(() => {
            //一覧画面に遷移
            transitionList();
          })
          .catch((error) => {
            refState.error_message = error.response.data;
            refState.isNotInit = true;
          });
      }
    };

    /* ***********************************************************************************
    生年月日に入力された文字が数字かどうかチェックし、数字以外であれば入力できないようにする
    *********************************************************************************** */
    const checkInputYear = () => {
      refState.birthday.year = replaceStringToEmpty(refState.birthday.year);
    };

    const checkInputMonth = () => {
      refState.birthday.month = replaceStringToEmpty(refState.birthday.month);
    };

    const checkInputDay = () => {
      refState.birthday.day = replaceStringToEmpty(refState.birthday.day);
    };

    const replaceStringToEmpty = (checkTarget: string) => {
      const regex = new RegExp("[^0-9]");
      return checkTarget.replace(regex, "");
    };

    /* ***********************************************************************************
    一覧画面に遷移
    *********************************************************************************** */
    const transitionList = () => {
      router.push({
        name: "UserList",
      });
    };

    /* ***********************************************************************************
    フロント側のバリデーションチェック
    *********************************************************************************** */
    const frontValidationCheck = (): boolean => {
      return !(
        !!refState.error_message.user_name ||
        !!refState.error_message.user_id ||
        !!refState.error_message.email ||
        !!refState.error_message.phone_number ||
        !!refState.error_message.birthday ||
        !!refState.error_message.image ||
        !!refState.error_message.self_introduction
      );
    };

    watch(
      () => refState.user.user_name,
      () => {
        const lengthCheckResult = lengthCheck(refState.user.user_name, 45);
        const requireCheckResult = requireCheck(refState.user.user_name);
        refState.error_message.user_name = determineAssignValue(
          lengthCheckResult,
          requireCheckResult
        );
      }
    );

    watch(
      () => refState.user.user_id,
      () => {
        const lengthCheckResult = lengthCheck(refState.user.user_id, 45);
        const requireCheckResult = requireCheck(refState.user.user_id);
        refState.error_message.user_id = determineAssignValue(
          lengthCheckResult,
          requireCheckResult
        );
      }
    );

    watch(
      () => refState.user.email,
      () => {
        const lengthCheckResult = lengthCheck(refState.user.email, 256);
        const requireCheckResult = requireCheck(refState.user.email);
        refState.error_message.email = determineAssignValue(
          lengthCheckResult,
          requireCheckResult
        );
      }
    );

    watch(
      () => refState.user.phone_number,
      () => {
        const lengthCheckResult = lengthCheck(
          refState.user.phone_number.toString(),
          11
        );
        refState.error_message.phone_number = lengthCheckResult;
      }
    );

    watch(
      () => refState.user.birthday,
      () => {
        const lengthCheckResult = checkDateFormat(refState.user.birthday);
        const validCheckResult = checkDateValue(refState.user.birthday);
        const requireCheckResult = requireCheck(refState.user.birthday);
        refState.error_message.birthday = determineAssignValue(
          lengthCheckResult,
          requireCheckResult,
          validCheckResult
        );
      }
    );

    watch(
      () => refState.user.image,
      () => {
        refState.error_message.image = lengthCheck(refState.user.image, 1000);
      }
    );

    watch(
      () => refState.user.self_introduction,
      () => {
        refState.error_message.self_introduction = lengthCheck(
          refState.user.self_introduction,
          120
        );
      }
    );

    /* ***********************************************************************************
    画面に表示するかどうか判定
    *********************************************************************************** */
    const judgeDisplay = (displayText: string) => {
      const isDisplay = !!displayText;
      return !isDisplay;
    };

    /* ***********************************************************************************
    入力値がエラーかどうか判定
    *********************************************************************************** */
    const isInvalid = (errorMesssage: string) => {
      return !!errorMesssage;
    };

    return {
      refState,
      judgeDisplay,
      isInvalid,
      transitionList,
      createUser,
      updateUser,
      checkInputYear,
      checkInputMonth,
      checkInputDay,
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
</style>
