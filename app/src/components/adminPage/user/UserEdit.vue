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
              <div
                :class="{
                  'is-valid-textbox':
                    !isInvalid(refState.error_message.birthday) &&
                    refState.isNotInit,
                  'is-invalid-textbox':
                    isInvalid(refState.error_message.birthday) &&
                    refState.isNotInit,
                }"
                class="birthday-form form-control"
              >
                <input
                  type="tel"
                  maxlength="4"
                  class="input-year"
                  placeholder="1990"
                  @input="checkInputYear"
                  v-model="refState.birthday.year"
                />/
                <input
                  type="tel"
                  maxlength="2"
                  class="input-month"
                  placeholder="01"
                  @input="checkInputMonth"
                  v-model="refState.birthday.month"
                />/
                <input
                  type="tel"
                  maxlength="2"
                  class="input-day"
                  placeholder="01"
                  @input="checkInputDay"
                  v-model="refState.birthday.day"
                />
              </div>
              <label
                :class="{
                  'display-none': judgeDisplay(refState.error_message.birthday),
                  'is-valid': !isInvalid(refState.error_message.birthday),
                  'is-invalid': isInvalid(refState.error_message.birthday),
                }"
                >{{ refState.error_message.birthday }}</label
              >
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

import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import { User } from "@/types/User";
import {
  lengthCheck,
  requireCheck,
  checkDateFormat,
  checkDateValue,
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
生年月日を入力するテキストボックス用のオブジェクトを定義
*********************************************************************************** */
interface Birthday {
  year: string;
  month: string;
  day: string;
}

/* ***********************************************************************************
モジュール全体で使うオブジェクトの定義
*********************************************************************************** */
interface State {
  user: User;
  birthday: Birthday;
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
        phone_number: 0,
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

    //テキストを年、月、日を分割する
    const splitBirthday = () => {
      const aryBirthday = refState.user.birthday.split("/");
      refState.birthday.year = aryBirthday[0];
      refState.birthday.month = aryBirthday[1];
      refState.birthday.day = aryBirthday[2];
    };

    const setUser = () => {
      const user = getUserById();
      refState.user = user[0];
      refState.user.created_at = formatDate(refState.user.created_at);
      refState.user.updated_at = formatDate(refState.user.updated_at);
      refState.user.birthday = dayjs(refState.user.birthday).format(
        "YYYY/MM/DD"
      );
      //誕生日を分割する
      splitBirthday();
    };

    setUser();

    /* ***********************************************************************************
    ユーザー情報の登録・更新処理
    *********************************************************************************** */
    //ユーザー新規登録
    const createUser = async () => {
      //エラーメッセージをクリア
      Object.assign(refState.error_message, reactive(initErrorMessage));

      //生年月日入力欄の値をマージする
      mergeBirthday();

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

      //生年月日入力欄の値をマージする
      mergeBirthday();

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
    生年月日情報を操作
    *********************************************************************************** */
    //テキストボックスに入力された年、月、日をマージする
    const mergeBirthday = () => {
      const year = escape(refState.birthday.year);
      const month = escape(refState.birthday.month);
      const day = escape(refState.birthday.day);
      refState.user.birthday = year + "/" + month + "/" + day;
    };

    /* ***********************************************************************************
    登録日、更新日をフォーマット
    *********************************************************************************** */

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
      const assignValue = (str1: string, str2: string): string => {
        if (str1 == "") {
          return str2;
        } else {
          return str1;
        }
      };

      refState.error_message.user_name = assignValue(
        lengthCheck(refState.user.user_name, 45),
        requireCheck(refState.user.user_name)
      );

      refState.error_message.user_id = assignValue(
        lengthCheck(refState.user.user_id, 45),
        requireCheck(refState.user.user_id)
      );

      refState.error_message.email = assignValue(
        lengthCheck(refState.user.email, 45),
        requireCheck(refState.user.email)
      );

      refState.error_message.phone_number = assignValue(
        lengthCheck(refState.user.phone_number.toString(), 45),
        requireCheck(refState.user.phone_number.toString())
      );

      refState.error_message.birthday = checkDateFormat(refState.user.birthday);
      if (!refState.error_message.birthday) {
        refState.error_message.birthday = checkDateValue(
          refState.user.birthday
        );
      }
      refState.error_message.birthday = assignValue(
        refState.error_message.birthday,
        requireCheck(refState.user.birthday.toString())
      );

      refState.error_message.image = lengthCheck(refState.user.email, 1000);
      refState.error_message.self_introduction = lengthCheck(
        refState.user.self_introduction,
        120
      );

      refState.isNotInit = true;

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
