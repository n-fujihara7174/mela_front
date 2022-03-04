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
              @click="transitionPostEdit(0)"
            >
              新規登録
            </button>
          </div>
          <div class="d-flex">
            <div class="search-parameter-form">
              <label for="searchUserName">ユーザー名</label>
              <input
                id="searchUserName"
                class="form-control"
                @keyup.enter="setPosts"
                v-model="refState.searchValue.users_table_user_id"
              />
            </div>
            <div class="search-parameter-form">
              <label for="searchUserName">投稿内容</label>
              <input
                id="searchUserName"
                class="form-control"
                @keyup.enter="setPosts"
                v-model="refState.searchValue.post_contents"
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
            <th class="key-value px-3">No</th>
            <th class="user-name px-3">ユーザーID</th>
            <th class="post-contents px-3">投稿内容</th>
            <th class="image px-3">画像</th>
            <th class="is-delete px-3">削除</th>
            <th class="created_at px-3">登録日</th>
            <th class="detail-button text-center"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(post, index) in refState.posts.slice(
              refState.startIndex,
              refState.endIndex
            )"
            :key="index"
          >
            <td class="px-3 align-middle">{{ post.id }}</td>
            <td class="px-3 align-middle">{{ post.users_table_user_id }}</td>
            <td class="px-3 align-middle">{{ post.post_contents }}</td>
            <td class="px-3 align-middle">{{ post.post_image }}</td>
            <td class="px-3 align-middle">{{ judgeDelete(post.is_delete) }}</td>
            <td class="px-3 align-middle">{{ formatDate(post.created_at) }}</td>
            <td class="px=3 align-middle text-center">
              <button
                type="button"
                class="btn btn-primary"
                @click="transitionPostEdit(post.id)"
              >
                詳細
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <PageNation
        :listLength="refState.posts.length"
        v-model:startIndex="refState.startIndex"
        v-model:endIndex="refState.endIndex"
      ></PageNation>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import { Post } from "@/types/Post";

import PageNation from "@/components/adminPage/common/molecules/PageNation.vue";

/* ******************************************************************************************

****************************************************************************************** */
interface SearchValue {
  users_table_user_id: string;
  post_contents: string;
}

interface State {
  searchValue: SearchValue;
  posts: Array<Post>;
  startIndex: number;
  endIndex: number;
}

/* ******************************************************************************************

****************************************************************************************** */
export default defineComponent({
  components: {
    PageNation: PageNation,
  },

  setup() {
    const router = useRouter();

    const searchValueInit: SearchValue = {
      users_table_user_id: "",
      post_contents: "",
    };

    const refState = reactive<State>({
      searchValue: searchValueInit,
      posts: [],
      startIndex: 1,
      endIndex: 51,
    });

    /* *************************************************************************************
    ユーザー一覧取得
    ************************************************************************************* */
    const getPostList = () => {
      //urlを設定
      let url = new URL("http://localhost:3000/posts");
      url.searchParams.set(
        "users_table_user_id",
        refState.searchValue.users_table_user_id
      );
      url.searchParams.set("post_contents", refState.searchValue.post_contents);

      //リクエストを送信
      const oReq = new XMLHttpRequest();
      oReq.open("GET", url.toString(), false);
      oReq.send();
      return JSON.parse(oReq.response);
    };

    const setPosts = () => {
      refState.posts = getPostList();
      console.log(refState.posts);
    };

    setPosts();

    // //検索パラメータあり
    // const searchPosts = async () => {
    //   console.log("searchPosts");
    //   if (
    //     refState.searchValue.users_table_user_id != null &&
    //     refState.searchValue.post_contents != null
    //   ) {
    //     const result = await axios.get("http://localhost:3000/posts", {
    //       params: {
    //         users_table_user_id: refState.searchValue.users_table_user_id,
    //         post_contents: refState.searchValue.post_contents,
    //       },
    //     });
    //     refState.posts = { ...result.data };
    //   }
    // };

    /* **************************************************************************************

    ************************************************************************************** */
    const transitionPostEdit = (id: number) => {
      router.push({
        name: "PostEdit",
        params: {
          id: id,
        },
      });
    };

    const formatDate = (strDate: string) => {
      return dayjs(strDate).format("YYYY/MM/DD hh:mm:ss");
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
      formatDate,
      judgeDelete,
      setPosts,
      //searchPosts,
      transitionPostEdit,
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

.key-value {
  width: 5%;
}

.user-name {
  width: 25%;
}

.post-contents {
  width: 25%;
}

.image {
  width: 15%;
}

.is_delete {
  width: 5%;
}

.created_at {
  width: 10%;
}

.detail-button {
  width: 10%;
}

.search-parameter-form {
  width: 250px;
  margin-left: 20px;
}

.search-parameter-label {
  display: block;
}

.create-user-btn {
  width: 200px;
  margin-bottom: 30px;
}
</style>
