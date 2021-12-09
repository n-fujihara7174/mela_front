<template>
  <div id="UserList" class="user-list">
    <h2>ユーザー一覧</h2>
    <div class="user-list-wrapper">
      <div class="serch-wrapper">
        <div class="serch-user-name">
          <label>ユーザーID、メールアドレス</label>
          <input v-model="searchParam.userIdOrEmail">
          <button @click="searchUsers" >送信</button>
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
        <tr v-for="(user, index) in users" :key="index">
          <td>{{ user.id }}</td>
          <td>{{ user.user_name }}</td>
          <td>{{ user.display_user_id }}</td>
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

<script>
/* eslint-disable no-console */
import axios from 'axios'

export default {
  // ここの書き方があやふや
  data: function () {
    return {
      users: [],
      searchParam: {
        userIdOrEmail: null
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
      this.users = { ...result.data }
    },
    judgeFlag: function (flag) {
      if (flag) {
        return '◯'
      } else {
        return ''
      }
    },
    judgeDelete: function (flag) {
      if (flag) {
        return '削除'
      } else {
        return ''
      }
    },
    searchUsers: async function () {
      if (this.searchParam.userIdOrEmail != null) {
        const result = await axios.get('http://localhost:3000/users', {
          params: {
            user_id_or_email: this.searchParam.userIdOrEmail
          }
        })
        this.users = { ...result.data }
      }
    }
    /* goToRegisterBook: function(){
            this.$router.push("/CreateBook");
            this.$router.forward();
        } */
  }
}
</script>

<style scoped>
@import '../../../css/adminPage/user/listStyle.css';
</style>
