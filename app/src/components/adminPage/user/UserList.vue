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
                @keyup.enter="setUsers"
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
          <tr
            v-for="(user, index) in refState.users.slice(
              refState.startIndex,
              refState.endIndex
            )"
            :key="index"
          >
            <td class="px-3 align-middle">{{ user.user_name }}</td>
            <td class="px-3 align-middle">{{ user.user_id }}</td>
            <td class="px-3 align-middle">{{ user.email }}</td>
            <td class="px-3 align-middle">{{ user.phone_number }}</td>
            <td class="px-3 align-middle">{{ is_delete(user.is_delete) }}</td>
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
    <div>
      <PageNation
        :listLength="refState.users.length"
        v-model:startIndex="refState.startIndex"
        v-model:endIndex="refState.endIndex"
      ></PageNation>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { User } from "@/types/User";
import { judgeDelete } from "@/composables/judgValue";
import { useRouter } from "vue-router";

/* ******************************************************************************************
型定義
****************************************************************************************** */
//検索値格納用
interface SearchValue {
  userIdOrEmail: string;
}

//状態格納用
interface State {
  searchValue: SearchValue;
  users: Array<User>;
  startIndex: number;
  endIndex: number;
}

export default defineComponent({
  setup() {
    /* ******************************************************************************************
    モジュール全体で使用する変数の定義
    ****************************************************************************************** */
    const router = useRouter();
    const is_delete = judgeDelete;

    //検索値格納用の変数を初期化
    const searchValueInit: SearchValue = {
      userIdOrEmail: "",
    };

    //状態をリアクティブで定義
    const refState = reactive<State>({
      searchValue: searchValueInit,
      users: [],
      startIndex: 1,
      endIndex: 51,
    });

    /* ******************************************************************************************
    モジュール全体で使用する変数の定義
    ****************************************************************************************** */
    const getUserList = () => {
      //urlを設定
      let url = new URL("http://localhost:3000/users");
      url.searchParams.set(
        "user_id_or_email",
        refState.searchValue.userIdOrEmail
      );

      //リクエストを送信
      const oReq = new XMLHttpRequest();
      oReq.open("GET", url.toString(), false);
      oReq.send();
      return JSON.parse(oReq.response);
    };

    const setUsers = () => {
      refState.users = getUserList();
    };

    setUsers();

    /* ******************************************************************************************
    モジュール全体で使用する変数の定義
    ****************************************************************************************** */
    const transitionUserEdit = (id: number): void => {
      router.push({
        name: "UserEdit",
        params: {
          id: id,
        },
      });
    };

    return {
      refState,
      is_delete,
      setUsers,
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
