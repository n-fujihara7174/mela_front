<template>
  <div id="UserList" class="mx-xl-5">
    <div class="mb-5">
      <h2>ユーザー一覧</h2>
    </div>
    <div class="user-list-wrapper">
      <!-- <div class="serch-wrapper row mb-4">
        <div class="serch-user-name col-1">
          <label class="search-parameter-label small">ユーザーID、メールアドレス</label>
          <input v-model="refState.searchValue.userIdOrEmail" />
        </div>
        <div class="col-1 d-flex align-items-end">
          <button @click="searchUsers">検索</button>
        </div>
      </div> -->
      <table class="table table-hover table-sm shadow">
        <thead>
          <tr>
            <th class="user-name px-3">ユーザー名</th>
            <th class="user-id px-3">ユーザーID</th>
            <th class="email px-3">メールアドレス</th>
            <th class="phone-number px-3">電話番号</th>
            <th class="is_delete px-3">削除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in refState.users" :key="index">
          <td class="px-3">{{ user.user_name }}</td>
          <td class="px-3">{{ user.user_id }}</td>
          <td class="px-3">{{ user.email }}</td>
          <td class="px-3">{{ user.phone_number }}</td>
          <td class="px-3">{{ judgeDelete(user.is_delete) }}</td>
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
.user-list {
  margin-left: 60px;
  margin-right: 60px;
}

.user-list-wrapper {
  width: 100%;
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
  width: 15%;
}

.is_delete {
  width: 10%;
}

.search-parameter-label {
  display: block;
}
</style>
