<template>
  <div class="mx-xl-5">
    <div class="mt-4">
      <a href="#" @click="transitionList">ユーザー一覧画面</a>
      <span> > 詳細画面</span>
    </div>
    <div class="mt-5">
      <h2>詳細画面</h2>
      <table class="table table-sm shadow table-hover mt-5">
        <tbody>
          <tr :class="{ 'display-none': ! refState.isUpdate }">
            <th>No</th>
            <td class="align-middle">{{ refState.user.id }}</td>
          </tr>
          <tr>
            <th>ユーザー名</th>
            <td>
              <input
                type="text"
                class="form-control"
                v-model="refState.user.user_name"
              />
              <label :class="{ 'display-none': judgeDisplay(refState.error_message.user_name[0]) }">{{ refState.error_message.user_name[0] }}</label>
            </td>
          </tr>
          <tr>
            <th>ユーザーID</th>
            <td>
              <input
                type="text"
                class="form-control"
                v-model="refState.user.user_id"
              />
              <label :class="{ 'display-none': judgeDisplay(refState.error_message.user_id[0]) }">{{ refState.error_message.user_id[0] }}</label>
            </td>
          </tr>
          <tr>
            <th>メールアドレス</th>
            <td>
              <input
                type="text"
                class="form-control"
                v-model="refState.user.email"
              />
              <label :class="{ 'display-none': judgeDisplay(refState.error_message.email[0]) }">{{ refState.error_message.email[0] }}</label>
            </td>
          </tr>
          <tr>
            <th>電話番号</th>
            <td>
              <input
                type="text"
                class="form-control"
                v-model="refState.user.phone_number"
              />
              <label :class="{ 'display-none': judgeDisplay(refState.error_message.phone_number[0]) }">{{ refState.error_message.phone_number[0] }}</label>
            </td>
          </tr>
          <tr>
            <th>生年月日</th>
            <td>
              <input
                type="text"
                class="form-control"
                v-model="refState.user.birthday"
              />
              <label :class="{ 'display-none': judgeDisplay(refState.error_message.user_name[0]) }">{{ refState.error_message.birthday[0] }}</label>
            </td>
          </tr>
          <tr>
            <th>画像</th>
            <td>
              <input
                type="text"
                class="form-control"
                v-model="refState.user.image"
              />
            </td>
          </tr>
          <tr>
            <th>自己紹介</th>
            <td>
              <textarea
                type="text"
                class="form-control"
                v-model="refState.user.self_introduction"
              />
            </td>
          </tr>
          <tr>
            <th>いいね通知</th>
            <td>{{ refState.user.can_like_notification }}</td>
          </tr>
          <tr>
            <th>コメント通知</th>
            <td>{{ refState.user.can_comment_notification }}</td>
          </tr>
          <tr>
            <th>メッセージ通知</th>
            <td>{{ refState.user.can_message_notification }}</td>
          </tr>
          <tr>
            <th>削除</th>
            <td>{{ refState.user.is_delete }}</td>
          </tr>
          <tr>
            <th>登録日</th>
            <td class="align-middle">{{ refState.user.created_at }}</td>
          </tr>
          <tr>
            <th>更新日</th>
            <td class="align-middle">{{ refState.user.updated_at }}</td>
          </tr>
        </tbody>
      </table>
      <button @click="postUser">テスト</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { User } from "@/types/User";

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
  password_digest: string;
  email: string;
  phone_number: string;
  birthday: string;
}

interface State {
  user: UserExtend;
  error_message: ErrorMessage;
  isUpdate: boolean;
}

export default defineComponent({
  props: {
    id: {
      type: String,
      default: "",
    },
  },

  setup(props) {
    const router = useRouter();

    const initErrorMessage: ErrorMessage = {
      user_name: "",
        user_id: "",
        password_digest: "",
        email: "",
        phone_number: "",
        birthday: "",
    }

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
        self_introduction: "",
        email: "",
        phone_number: 0,
        birthday: new Date(),
        image: "",
        can_like_notification: false,
        can_comment_notification: false,
        can_message_notification: false,
        can_calender_notification: false,
        is_delete: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      error_message: {
        user_name: "",
        user_id: "",
        password_digest: "",
        email: "",
        phone_number: "",
        birthday: "",
      },
      isUpdate: false,
    });

    //ユーザー情報取得
    onMounted(async () => {
      const result = await axios.get("http://localhost:3000/users/" + props.id);
      refState.user = result.data[0];
      refState.isUpdate = Boolean(refState.user.id);
      console.log(refState.isUpdate)
    });

    //ユーザー新規登録
    const createUser = async () => {
      await axios
        .post("http://localhost:3000/users/", {
          user: refState.user,
        })
        .then((response) => {
          console.log("create");
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    //ユーザー更新
    const updateUser = async () => {
      //エラーメッセージをクリア
      Object.assign(refState.error_message, reactive(initErrorMessage));

      //更新処理をapiに投げる
      await axios
        .patch("http://localhost:3000/users/" + props.id, {
          user: refState.user,
        })
        .then((response) => {
          //一覧画面に遷移
          transitionList();
        })
        .catch((error) => {
          //エラーメッセージを格納
          Object.assign(refState.error_message, reactive(error.response.data));
        });
    };

    //ユーザー登録・更新処理
    const postUser = () => {
      if (props.id == "0") {
        createUser();
      } else {
        updateUser();
      }
    };

    const transitionList = () => {
      router.push({
        name: "UserList",
      });
    };

    const judgeFlag = (flag: boolean) => {
      if (flag) {
        return "通知を行う";
      } else {
        return "";
      }
    };

    const judgeDelete = (flag: boolean) => {
      if (flag) {
        return "削除";
      } else {
        return "";
      }
    };

    const judgeDisplay = (displayText: string) => {
      const isDisplay = !!displayText;
      return !isDisplay;
    };

    const arrayToString = (ary: Array<string>): string => {
      const str = ary.join("¥n");
      return str;
    };

    return {
      refState,
      transitionList,
      judgeFlag,
      postUser,
      arrayToString,
      judgeDisplay,
    };
  },
});
</script>

<style scoped>
ul {
  list-style: none;
  padding-left: 0;
}

li,
.self-introduction {
  border-radius: 6px;
  background-color: #ffffff;
  color: #636363;
}

textarea {
  resize: none;
  height: 100px;
}

.table th {
  width: 15%;
  padding: 10px 40px;
  border-style: none;
}

.table td {
  border-style: none;
}

.w-19 {
  width: 19%;
}

.w-24 {
  width: 24%;
}

.w-49 {
  width: 49%;
}

.noti {
  width: 30%;
  margin-bottom: 10px;
  margin-left: 3.3%;
}

.select-user-icon {
  width: 100px;
}

.display-none {
  display: none;
}
</style>
