<template>
  <div class="mx-xl-5">
    <div class="mt-4">
      <a href="#" @click="transitionList">ユーザー一覧画面</a>
      <span> > 詳細画面</span>
    </div>
    <div class="mt-5">
      <h2>詳細画面</h2>
      <table class="table table-sm shadow table-hover">
        <tr>
          <th>No</th>
          <td>{{ refState.user.id }}</td>
        </tr>
        <tr>
          <th>ユーザー名</th>
          <td>
            <input type="text" v-model="refState.user.user_name" />
            <label>{{ refState.user.user_name }}</label>
          </td>
        </tr>
        <tr>
          <th>ユーザーID</th>
          <td><input type="text" v-model="refState.user.user_id" /></td>
        </tr>
        <tr>
          <th>メールアドレス</th>
          <td><input type="text" v-model="refState.user.email" /></td>
        </tr>
        <tr>
          <th>電話番号</th>
          <td><input type="text" v-model="refState.user.phone_number" /></td>
        </tr>
        <tr>
          <th>生年月日</th>
          <td><input type="text" v-model="refState.user.birthday" /></td>
        </tr>
        <tr>
          <th>画像</th>
          <td><input type="text" v-model="refState.user.image" /></td>
        </tr>
        <tr>
          <th>自己紹介</th>
          <td>
            <input type="text" v-model="refState.user.self_introduction" />
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
          <td>{{ refState.user.created_at }}</td>
        </tr>
        <tr>
          <th>更新日</th>
          <td>{{ refState.user.updated_at }}</td>
        </tr>
      </table>
      <button @click="testconsole">テスト</button>
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

interface State {
  user: UserExtend;
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
    });

    onMounted(async () => {
      const result = await axios.get("http://localhost:3000/users/" + props.id);
      refState.user = result.data[0];
      console.log(refState.user);
    });

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

    const testconsole = () => {
      console.log(refState.user.user_name);
    };

    return {
      refState,
      transitionList,
      judgeFlag,
      testconsole,
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

.table th {
  width: 15%;
  padding: 10px 20px;
  border-top: 1px #e0e0e0 solid;
  border-bottom: 0;
}
</style>
