<template>
  <div id="UserList" class="mx-xl-5">
    <div class="mb-5">
      <h2>ユーザー一覧</h2>
    </div>
    <div class="user-list-wrapper">
      <div class="serch-wrapper row">
        <div class="serch-user-name col-1">
          <label class="search-parameter-label small">ユーザーID、メールアドレス</label>
          <input v-model="refState.searchValue.userIdOrEmail" />
        </div>
        <div class="col-xxl-2">
          <button @click="searchUsers">検索</button>
        </div>
      </div>
      <table class="table table-striped">
        <thead>
          <tr class="table-header">
            <th class="id">id</th>
            <th class="user-name">ユーザー名</th>
            <th class="user-id">ユーザーID</th>
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
        </thead>
        <tbody>
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
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-console */
import { defineComponent, reactive, onMounted } from "vue";
import axios from "axios";
import {User} from "@/types/User"

//検索
interface SearchValue {
  userIdOrEmail: string;
}

interface State {
  searchValue: SearchValue;
  users: Array<User>;
}

export default defineComponent({
  setup() {
    const searchValueInit: SearchValue = {
      userIdOrEmail: "",
    };

    const refState = reactive<State>({
      searchValue: searchValueInit,
      users: [],
    });

    const fetchUsers = async () => {
      const result = await axios.get("http://localhost:3000/users");
      refState.users = { ...result.data };
    };

    onMounted(fetchUsers)

    const searchUsers = async () => {
      if (refState.searchValue.userIdOrEmail != null) {
        const result = await axios.get("http://localhost:3000/users", {
          params: {
            user_id_or_email: refState.searchValue.userIdOrEmail,
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
tr,th,td {
  border-collapse: collapse;
  border:1px solid;
  border-color: #d3d3d3;
  padding: 10px;
}

.user-list {
  margin-left: 60px;
  margin-right: 60px;
}

.user-list-wrapper {
  width: 2500px;
}

.table-header {
  background-color: #666666;
  color: #DCDCDC;
}

.id {
  width: 80px;
}

.user-name, .display-user-id, .phone-number, .self-introduction, .email, .image{
  width: 200px;
}

.birthday {
  width: 110px;
}

.search-parameter-label {
  display: block;
}

</style>
