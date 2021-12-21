<template>
  <div id="UserList" class="user-list">
    <h2>ユーザー一覧</h2>
    <div class="user-list-wrapper">
      <div class="serch-wrapper">
        <div class="serch-user-name">
          <label>ユーザーID、メールアドレス</label>
          <input v-model="refState.searchParam.userIdOrEmail" />
          <button @click="searchUsers">送信</button>
        </div>
      </div>
      <table>
        <tr class="table-header">
          <th class="id">id</th>
          <th class="user-name">ユーザー名</th>
          <th class="user-id">表示用ユーザーID</th>
          <th class="self-introduction">自己紹介</th>
          <th class="email">メールアドレス</th>
          <th class="phone-number">電話番号</th>
          <th class="birthday">生年月日</th>
          <th class="image">画像</th>
          <th class="post-count">投稿数</th>
          <th class="like">いいね通知</th>
          <th class="comment">コメント通知</th>
          <th class="message">メッセージ通知</th>
          <th class="calender">カレンダー通知</th>
          <th class="is_delete">削除</th>
          <th class="created-at">登録日時</th>
          <th class="updated-at">更新日時</th>
        </tr>
        <tr v-for="(user, index) in refState.users" :key="index">
          <td>{{ user.id }}</td>
          <td>{{ user.user_name }}</td>
          <td>{{ user.user_id }}</td>
          <td>{{ user.self_introduction }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone_number }}</td>
          <td>{{ user.birthday }}</td>
          <td>{{ user.image }}</td>
          <th>{{ user.post_count }}</th>
          <td>{{ judgeFlag(user.can_like_notification) }}</td>
          <td>{{ judgeFlag(user.can_comment_notification) }}</td>
          <td>{{ judgeFlag(user.can_message_notification) }}</td>
          <td>{{ judgeFlag(user.can_calender_notification) }}</td>
          <td>{{ judgeDelete(user.is_delete) }}</td>
          <td>{{ user.created_at }}</td>
          <td>{{ user.updated_at }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-console */
import { defineComponent, reactive, onMounted } from "vue";
import axios from "axios";

interface User {
  id: number;
  user_name: string;
  user_id: string;
  self_introduction: string;
  email: string;
  phone_number: number;
  birthday: Date;
  image: string;
  post_count: number;
  can_like_notification: boolean;
  can_comment_notification: boolean;
  can_message_notification: boolean;
  can_calender_notification: boolean;
  is_delete: boolean;
  created_at: Date;
  updated_at: Date;
}

interface SearchParam {
  userIdOrEmail: string;
}

interface State {
  searchParam: SearchParam;
  users: Array<User>;
}

export default defineComponent({
  setup() {
    const searchParamInit: SearchParam = {
      userIdOrEmail: "",
    };

    const refState = reactive<State>({
      searchParam: searchParamInit,
      users: [],
    });

    const fetchUsers = async () => {
      const result = await axios.get("http://localhost:3000/users");
      refState.users = { ...result.data };
    };

    onMounted(fetchUsers)

    const searchUsers = async () => {
      if (refState.searchParam.userIdOrEmail != null) {
        const result = await axios.get("http://localhost:3000/users", {
          params: {
            user_id_or_email: refState.searchParam.userIdOrEmail,
          },
        });
        refState.users = { ...result.data };
      }
    };

    const judgeFlag = (flag: boolean) => {
      if (flag) {
        return "◯";
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

    return {
      refState,
      fetchUsers,
      judgeFlag,
      judgeDelete,
      searchUsers,
    };
  },
});
</script>

<style scoped>
@import "../../../css/adminPage/user/listStyle.css";
</style>
