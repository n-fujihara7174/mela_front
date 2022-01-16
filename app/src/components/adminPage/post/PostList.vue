<template>
  <div id="UserList" class="mx-xl-5 mt-5">
    <div class="d-flex">
      <div class="me-auto backdrop">
        <h2>投稿一覧</h2>
      </div>
      <div class="search-wrapper mb-4 d-flex">
        <div class="flex-column">
          <div align="right">
            <button
              type="button"
              class="btn btn-primary create-user-btn"
              @click="transitionPostDetail(0)"
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
                @keyup.enter="searchPosts"
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
            <th class="user-name px-3">No</th>
            <th class="user-id px-3">ユーザーID</th>
            <th class="email px-3">内容</th>
            <th class="phone-number px-3">画像</th>
            <th class="is-delete px-3">削除</th>
            <th class="detail-button text-center">登録日</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(post, index) in refState.posts" :key="index">
            <td class="px-3 align-middle">{{ post.id }}</td>
            <td class="px-3 align-middle">{{ post.user_id }}</td>
            <td class="px-3 align-middle">{{ post.post_contents }}</td>
            <td class="px-3 align-middle">{{ post.post_image }}</td>
            <td class="px-3 align-middle">{{ judgeDelete(post.is_delete) }}</td>
            <td class="px-3 align-middle">{{ post.created_at }}</td>
            <td class="px=3 align-middle text-center">
              <button
                type="button"
                class="btn btn-primary"
                @click="transitionPostDetail(user.id)"
              >
                詳細
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
import { Post } from "@/types/Post";

//検索
interface SearchValue {
  allText: string;
}

interface State {
  searchValue: SearchValue;
  posts: Array<Post>;
}

export default defineComponent({
  setup() {
    const router = useRouter();

    const searchValueInit: SearchValue = {
      allText: "",
    };

    const refState = reactive<State>({
      searchValue: searchValueInit,
      posts: [],
    });

    //ユーザー一覧取得
    const fetchPosts = async () => {
      const result = await axios.get("http://localhost:3000/posts");
      refState.posts = { ...result.data };
    };

    onMounted(fetchPosts);

    //ユーザー一覧取得（検索パラメータあり）
    const searchPosts = async () => {
      if (refState.searchValue.allText != null) {
        const result = await axios.get("http://localhost:3000/posts", {
          params: {
            all_text: refState.searchValue.allText,
          },
        });
        refState.posts = { ...result.data };
      }
    };

    //編集画面に遷移
    const transitionPostDetail = (id: number) => {
      router.push({
        name: "PostDetail",
        params: {
          id: id,
        },
      });
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
      fetchPosts,
      judgeDelete,
      searchPosts,
      transitionPostDetail,
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
