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
              <input
                type="text"
                class="form-control"
                :class="{
                  'is-valid-textbox':
                    !isInvalid(refState.error_message.user_name) &&
                    refState.isNotInit,
                  'is-invalid-textbox':
                    isInvalid(refState.error_message.user_name) &&
                    refState.isNotInit,
                }"
                v-model="refState.user.user_name"
              />
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
            <th>ユーザーID</th>
            <td>
              <input
                type="text"
                class="form-control"
                :class="{
                  'is-valid-textbox':
                    !isInvalid(refState.error_message.user_id) &&
                    refState.isNotInit,
                  'is-invalid-textbox':
                    isInvalid(refState.error_message.user_id) &&
                    refState.isNotInit,
                }"
                v-model="refState.user.user_id"
              />
              <label
                :class="{
                  'display-none': judgeDisplay(refState.error_message.user_id),
                  'is-valid': !isInvalid(refState.error_message.user_id),
                  'is-invalid': isInvalid(refState.error_message.user_id),
                }"
                >{{ refState.error_message.user_id }}</label
              >
            </td>
          </tr>
          <tr>
            <th>パスワード</th>
            <td>
              <input
                type="password"
                class="form-control"
                :class="{
                  'is-valid-textbox':
                    !isInvalid(refState.error_message.password) &&
                    refState.isNotInit,
                  'is-invalid-textbox':
                    isInvalid(refState.error_message.password) &&
                    refState.isNotInit,
                }"
                v-model="refState.user.password"
              />
              <label
                :class="{
                  'display-none': judgeDisplay(refState.error_message.password),
                  'is-valid': !isInvalid(refState.error_message.password),
                  'is-invalid': isInvalid(refState.error_message.password),
                }"
                >{{ refState.error_message.password }}</label
              >
            </td>
          </tr>
          <tr>
            <th>パスワード確認</th>
            <td>
              <input
                type="password"
                class="form-control"
                :class="{
                  'is-valid-textbox':
                    !isInvalid(refState.error_message.password_digest) &&
                    refState.isNotInit,
                  'is-invalid-textbox':
                    isInvalid(refState.error_message.password_digest) &&
                    refState.isNotInit,
                }"
                v-model="refState.user.password_digest"
              />
              <label
                :class="{
                  'display-none': judgeDisplay(
                    refState.error_message.password_digest
                  ),
                  'is-valid': !isInvalid(
                    refState.error_message.password_digest
                  ),
                  'is-invalid': isInvalid(
                    refState.error_message.password_digest
                  ),
                }"
                >{{ refState.error_message.password_digest }}</label
              >
            </td>
          </tr>
          <tr>
            <th>メールアドレス</th>
            <td>
              <input
                type="text"
                class="form-control"
                :class="{
                  'is-valid-textbox':
                    !isInvalid(refState.error_message.email) &&
                    refState.isNotInit,
                  'is-invalid-textbox':
                    isInvalid(refState.error_message.email) &&
                    refState.isNotInit,
                }"
                v-model="refState.user.email"
              />
              <label
                :class="{
                  'display-none': judgeDisplay(
                    refState.error_message.phone_number
                  ),
                  'is-valid': !isInvalid(refState.error_message.email),
                  'is-invalid': isInvalid(refState.error_message.email),
                }"
                >{{ refState.error_message.email }}</label
              >
            </td>
          </tr>
          <tr>
            <th>電話番号</th>
            <td>
              <input
                type="text"
                class="form-control"
                :class="{
                  'is-valid-textbox':
                    !isInvalid(refState.error_message.phone_number) &&
                    refState.isNotInit,
                  'is-invalid-textbox':
                    isInvalid(refState.error_message.phone_number) &&
                    refState.isNotInit,
                }"
                v-model="refState.user.phone_number"
              />
              <label
                :class="{
                  'display-none': judgeDisplay(
                    refState.error_message.phone_number
                  ),
                  'is-valid': !isInvalid(refState.error_message.phone_number),
                  'is-invalid': isInvalid(refState.error_message.phone_number),
                }"
                >{{ refState.error_message.phone_number }}</label
              >
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
              <input
                type="text"
                class="form-control"
                :class="{
                  'is-valid-textbox':
                    !isInvalid(refState.error_message.image) &&
                    refState.isNotInit,
                  'is-invalid-textbox':
                    isInvalid(refState.error_message.image) &&
                    refState.isNotInit,
                }"
                v-model="refState.user.image"
              />
              <label
                :class="{
                  'display-none': judgeDisplay(refState.error_message.image),
                  'is-valid': !isInvalid(refState.error_message.image),
                  'is-invalid': isInvalid(refState.error_message.image),
                }"
                >{{ refState.error_message.image }}</label
              >
            </td>
          </tr>
          <tr>
            <th>自己紹介</th>
            <td>
              <textarea
                type="text"
                class="form-control"
                :class="{
                  'is-valid-textbox':
                    !isInvalid(refState.error_message.self_introduction) &&
                    refState.isNotInit,
                  'is-invalid-textbox':
                    isInvalid(refState.error_message.self_introduction) &&
                    refState.isNotInit,
                }"
                v-model="refState.user.self_introduction"
              />
              <label
                :class="{
                  'display-none': judgeDisplay(
                    refState.error_message.self_introduction
                  ),
                  'is-valid': !isInvalid(
                    refState.error_message.self_introduction
                  ),
                  'is-invalid': isInvalid(
                    refState.error_message.self_introduction
                  ),
                }"
                >{{ refState.error_message.self_introduction }}</label
              >
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

import { defineComponent, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { User } from "@/types/User";
import {
  lengthCheck,
  requireCheck,
  checkDateFormat,
  checkDateValue,
} from "@/composables/validationCheck";

interface UserExtend extends User {
  post_count: number;
  like_count: number;
  follow_count: number;
  follower_count: number;
  message_user_count: number;
}

interface ErrorMessage {
  user_name: string;
  user_id: string;
  password: string;
  password_digest: string;
  email: string;
  phone_number: string;
  birthday: string;
  image: string;
  self_introduction: string;
}

interface Birthday {
  year: string;
  month: string;
  day: string;
}

interface State {
  user: UserExtend;
  birthday: Birthday;
  error_message: ErrorMessage;
  isUpdate: boolean;
  isNotInit: boolean;
}

export default defineComponent({
  props: {
    id: {
      type: Number,
      required: true,
    },
  },

  setup(props) {
    const router = useRouter();

    const initErrorMessage: ErrorMessage = {
      user_name: "",
      user_id: "",
      password: "",
      password_digest: "",
      email: "",
      phone_number: "",
      birthday: "",
      image: "",
      self_introduction: "",
    };

    const refState = reactive<State>({
      user: {
        post_count: 0,
        like_count: 0,
        follow_count: 0,
        follower_count: 0,
        message_user_count: 0,
        id: 0,
        user_name: "",
        user_id: "",
        password: "",
        password_digest: "",
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
        password: "",
        password_digest: "",
        email: "",
        phone_number: "",
        birthday: "",
        image: "",
        self_introduction: "",
      },
      isUpdate: false,
      isNotInit: false,
    });

    //ユーザー情報取得
    onMounted(async () => {
      refState.isUpdate = !!Number(props.id);
      if (refState.isUpdate) {
        const result = await axios.get(
          "http://localhost:3000/users/" + props.id.toString()
        );
        refState.user = result.data[0];
        refState.user.created_at = formatDate(refState.user.created_at);
        refState.user.updated_at = formatDate(refState.user.updated_at);
        refState.user.birthday = dayjs(refState.user.birthday).format(
          "YYYY/MM/DD"
        );
        //誕生日を分割する
        splitBirthday();
      }
    });

    //ユーザー新規登録
    const createUser = async () => {
      //エラーメッセージをクリア
      Object.assign(refState.error_message, reactive(initErrorMessage));

      //生年月日入力欄の値をマージする
      mergeBirthday();

      if (frontValidationCheck()) {
        console.log("ifの中");
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
            refState.error_message.user_name = hasProperty(
              error.response.data,
              "user_name"
            )
              ? error.response.data.user_name[0]
              : "";

            refState.error_message.user_id = hasProperty(
              error.response.data,
              "user_id"
            )
              ? error.response.data.user_id[0]
              : "";

            refState.error_message.password_digest = hasProperty(
              error.response.data,
              "password_digest"
            )
              ? error.response.data.password_digest[0]
              : "";

            refState.error_message.email = hasProperty(
              error.response.data,
              "email"
            )
              ? error.response.data.email[0]
              : "";

            refState.error_message.phone_number = hasProperty(
              error.response.data,
              "phone_number"
            )
              ? error.response.data.phone_number[0]
              : "";

            refState.error_message.birthday = hasProperty(
              error.response.data,
              "birthday"
            )
              ? error.response.data.birthday[0]
              : "";

            refState.error_message.image = hasProperty(
              error.response.data,
              "image"
            )
              ? error.response.data.image[0]
              : "";

            refState.error_message.self_introduction = hasProperty(
              error.response.data,
              "self_introduction"
            )
              ? error.response.data.self_introduction[0]
              : "";

            refState.isNotInit = true;
          });
      } else {
        console.log("elseのなか");
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
            refState.error_message.user_name = hasProperty(
              error.response.data,
              "user_name"
            )
              ? error.response.data.user_name[0]
              : "";
            refState.error_message.user_id = hasProperty(
              error.response.data,
              "user_id"
            )
              ? error.response.data.user_id[0]
              : "";

            refState.error_message.password_digest = hasProperty(
              error.response.data,
              "password_digest"
            )
              ? error.response.data.password_digest[0]
              : "";

            refState.error_message.email = hasProperty(
              error.response.data,
              "email"
            )
              ? error.response.data.email[0]
              : "";

            refState.error_message.phone_number = hasProperty(
              error.response.data,
              "phone_number"
            )
              ? error.response.data.phone_number[0]
              : "";

            refState.error_message.birthday = hasProperty(
              error.response.data,
              "birthday"
            )
              ? error.response.data.birthday[0]
              : "";

            refState.error_message.image = hasProperty(
              error.response.data,
              "image"
            )
              ? error.response.data.image[0]
              : "";

            refState.error_message.self_introduction = hasProperty(
              error.response.data,
              "self_introduction"
            )
              ? error.response.data.self_introduction[0]
              : "";
            refState.isNotInit = true;
          });
      }
      console.log(refState.error_message);
    };

    const mergeBirthday = () => {
      const year = escape(refState.birthday.year);
      const month = escape(refState.birthday.month);
      const day = escape(refState.birthday.day);
      refState.user.birthday = year + "/" + month + "/" + day;
    };

    const splitBirthday = () => {
      const aryBirthday = refState.user.birthday.split("/");
      refState.birthday.year = aryBirthday[0];
      refState.birthday.month = aryBirthday[1];
      refState.birthday.day = aryBirthday[2];
    };

    const formatDate = (strDate: string) => {
      return dayjs(strDate).format("YYYY/MM/DD hh:mm:ss");
    };

    //生年月日入力欄に入力された文字が数字かチェック
    const checkInputYear = () => {
      refState.birthday.year = replaceStringToEmpty(refState.birthday.year);
    };

    //生年月日入力欄に入力された文字が数字かチェック
    const checkInputMonth = () => {
      refState.birthday.month = replaceStringToEmpty(refState.birthday.month);
    };

    //生年月日入力欄に入力された文字が数字かチェック
    const checkInputDay = () => {
      refState.birthday.day = replaceStringToEmpty(refState.birthday.day);
    };

    const replaceStringToEmpty = (checkTarget: string) => {
      const regex = new RegExp("[^0-9]");
      return checkTarget.replace(regex, "");
    };

    //一覧画面に遷移
    const transitionList = () => {
      router.push({
        name: "UserList",
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
        lengthCheck(refState.user.user_name, 45),
        requireCheck(refState.user.user_name)
      );

      refState.error_message.user_id = assignValue(
        lengthCheck(refState.user.user_id, 45),
        requireCheck(refState.user.user_id)
      );

      refState.error_message.password = assignValue(
        lengthCheck(refState.user.password, 45),
        requireCheck(refState.user.password)
      );

      refState.error_message.password_digest = assignValue(
        lengthCheck(refState.user.password_digest, 45),
        requireCheck(refState.user.password_digest)
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
        !!refState.error_message.password_digest ||
        !!refState.error_message.email ||
        !!refState.error_message.phone_number ||
        !!refState.error_message.birthday ||
        !!refState.error_message.image ||
        !!refState.error_message.self_introduction
      );
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
