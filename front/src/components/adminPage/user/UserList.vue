<template>
  <div id="UserList" class="user-list">
    <h2>ユーザー一覧</h2>
    <div>
      <table>
        <tr>
          <th>id</th>
          <th>ユーザー名</th>
          <th>表示用ユーザーID</th>
          <th>自己紹介</th>
          <th>メアド</th>
          <th>電話番号</th>
          <th>生年月日</th>
          <th>画像</th>
          <th>いいね通知</th>
          <th>コメント通知</th>
          <th>メッセージ通知</th>
          <th>カレンダー通知</th>
          <th>削除フラグ</th>
          <th>登録日時</th>
          <th>更新日時</th>
        </tr>
        <tr v-for="(user, index) in users" :key="index">
          <td>{{ user.user_name }}</td>
          <td>{{ user.display_user_id }}</td>
          <td>{{ user.self_introduction }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone_number }}</td>
          <td>{{ user.birthday }}</td>
          <td>{{ user.image }}</td>
          <td>{{ user.can_like_notification }}</td>
          <td>{{ user.can_coment_notification }}</td>
          <td>{{ user.can_message_notification }}</td>
          <td>{{ user.can_calender_notification }}</td>
          <td>{{ user.is_delete }}</td>
          <td>{{ user.created_at }}</td>
          <td>{{ user.updated_at }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import axios from 'axios'

export default {
  // ここの書き方があやふや
  data: function () {
    return {
      users: [],
      searchParam: {
        name: null,
        product: null,
        author: null
      }
    }
  },
  // 実行するメソッドを定義？
  mounted: function () {
    this.fetchUsers()
  },
  /* computed:{
        FilterBook: function(){
            return this.books.filter(book => book.delete_flg == false)
        }
    }, */
  // メソッド定義する場所
  methods: {
    fetchUsers: async function () {
      const result = await axios.get('http://localhost:3000/users')
      this.users = result.data
    }
    /* searchBooks: async function(){
        const result = await axios.get('http://localhost:3000/books',{
          params: {
            searchName: this.searchParam.name,
            searchProduct: this.searchParam.product,
            searchAuthor: this.searchParam.author,
            searchFlg: "検索"
          }
        })
          this.books = result.data;
        },
    goToRegisterBook: function(){
            this.$router.push("/CreateBook");
            this.$router.forward();
        } */
  }
}
</script>

<style>
main {
  display: -webkit-flex;
  display: flex;
  flex-wrap: nowrap;
  height: 100%;
}
.card {
  width: 300px;
  margin: 0 20px;
  margin-bottom: 30px;
}
.book-index {
  height: 95vh;
}
.card-contents {
  margin-left: 0px;
}
.card {
  height: 40vh;
}
</style>
