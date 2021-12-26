<template>
  <div id="UserList" class="mx-xl-5 mt-5">
    <div class="d-flex">
      <div class="me-auto">
        <h2>ユーザー一覧</h2>
      </div>
      <div class="search-wrapper mb-4 d-flex">
        <div class="search-user-name">
          <input id="userNameAndUserId" class="form-control" placeholder="ユーザー名、ユーザーID" v-model="refState.searchValue.userIdOrEmail" />
        </div>
        <div>
          <button @click="searchUsers" type="button" class="btn btn-primary serch-btn">検索</button>
        </div>
      </div>
    </div>
    <div class="user-list-wrapper">
      <table class="table table-hover table-sm shadow">
        <thead>
          <tr>
            <th class="user-name px-3">ユーザー名</th>
            <th class="user-id px-3">ユーザーID</th>
            <th class="email px-3">メールアドレス</th>
            <th class="phone-number px-3">電話番号</th>
            <th class="is-delete px-3">削除</th>
            <th class="detail-button text-center">詳細</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in refState.users" :key="index">
          <td class="px-3 align-middle">{{ user.user_name }}</td>
          <td class="px-3 align-middle">{{ user.user_id }}</td>
          <td class="px-3 align-middle">{{ user.email }}</td>
          <td class="px-3 align-middle">{{ user.phone_number }}</td>
          <td class="px-3 align-middle">{{ judgeDelete(user.is_delete) }}</td>
          <td class="px=3 align-middle text-center"><button type="button" class="btn btn-primary">詳細</button></td>
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
.user-list-wrapper {
  width: 100%;
}

.search-wrapper {
  padding-right: 4px;
}

.search-wrapper input {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.search-wrapper button {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.user-name {
  width: 20%;
}

.email {
  width: 35%;
}

.display-user-id {
  width: 20%;
}

.phone-number {
  width: 10%;
}

.is-delete {
  width: 5%;
}

.detail-button {
  width: 10%
}

.search-parameter-label {
  display: block;
}
</style>
