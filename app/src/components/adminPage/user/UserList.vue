<template>
  <div id="UserList" class="mx-xl-5 mt-5">
    <div class="d-flex">
      <div class="me-auto backdrop">
        <h2>ユーザー一覧</h2>
      </div>
      <div class="search-wrapper mb-4 d-flex">
        <div class="flex-column">
          <div align="right">
            <button
              type="button"
              class="btn btn-primary create-user-btn"
              @click="transitionUserEdit(0)"
            >
              新規登録
            </button>
          </div>
          <div class="d-flex">
            <div class="search-user-name">
              <input
                id="userNameAndUserId"
                class="form-control"
                placeholder="ユーザー名、ユーザーID"
                @keyup.enter="searchUsers"
                v-model="refState.searchValue.userIdOrEmail"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="user-list-wrapper">
      <table class="table table-sm shadow table-hover">
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
            <td class="px=3 align-middle text-center">
              <button
                type="button"
                class="btn btn-primary"
                @click="transitionUserEdit(user.id)"
              >
                編集
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { User } from "@/types/User";

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
    const router = useRouter();

    const searchValueInit: SearchValue = {
      userIdOrEmail: "",
    };

    const refState = reactive<State>({
      searchValue: searchValueInit,
      users: [],
    });

    //ユーザー一覧取得
    const fetchUsers = async () => {
      const result = await axios.get("http://localhost:3000/users");
      refState.users = { ...result.data };
    };

    onMounted(fetchUsers);

    //ユーザー一覧取得（検索パラメータあり）
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

    //編集画面に遷移
    const transitionUserEdit = (id: number) => {
      router.push({
        name: "UserEdit",
        params: {
          id: id,
        },
      });
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
      transitionUserEdit,
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

.search-user-btn {
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
  width: 10%;
}

.search-parameter-label {
  display: block;
}

.create-user-btn {
  width: 200px;
  margin-bottom: 30px;
}

.search-user-name {
  width: 400px;
}
</style>
