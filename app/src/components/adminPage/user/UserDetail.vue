<template>
  <div class="mx-xl-5">
    <div class="mt-4">
      <a href="#" @click="transitionList">ユーザー一覧画面</a>
      <span> > 詳細画面</span>
    </div>
    <div class="mt-5">
      <h2>詳細画面</h2>
      <div>
      </div>
      <div class="mt-5">
        <div class="d-flex align-items-center">
          <div>
            <img
            src="@/image/人物のアイコン素材.jpeg"
            alt=""
            class="select-user-icon"
            />
          </div>
          <div class="w-100">
            <div>
              <ul class="d-flex flex-wrap justify-content-between align-items-center">
                <li class="count">
                  <div>
                    <p>投稿数</p>
                    <span>{{ refState.user.post_count }}</span>
                  </div>
                </li>
                <li class="count">
                  <div>
                    <p>いいね数</p>
                    <span>{{ refState.user.like_count }}</span>
                  </div>
                </li>
                <li class="count">
                  <div>
                    <p>フォロー数</p>
                    <span>{{ refState.user.follow_count }}</span>
                  </div>
                </li>
                <li class="count">
                  <div>
                    <p>フォロワー数</p>
                    <span>{{ refState.user.follower_count }}</span>
                  </div>
                </li>
                <li class="count">
                  <div>
                    <p>メッセージ数</p>
                    <span>{{ refState.user.message_user_count }}</span>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <ul class="d-flex flex-wrap justify-content-between align-items-center">
                <li class="count">
                <div>
                  <p>ユーザーID</p>
                  <span>{{ refState.user.user_id }}</span>
                </div>
              </li>
              <li class="count">
                <div>
                  <p>ユーザー名</p>
                  <span>{{ refState.user.user_name }}</span>
                </div>
              </li>
              <li class="count">
                <div>
                  <p>メールアドレス</p>
                  <span>{{ refState.user.email }}</span>
                </div>
              </li>
              <li class="count">
                <div>
                  <p>電話番号</p>
                  <span>{{ refState.user.phone_number }}</span>
                </div>
              </li>
              <li class="count">
                <div>
                  <p>生年月日</p>
                  <span>{{ refState.user.birthday }}</span>
                </div>
              </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-5 d-flex">
        <div class="w-50">
          <div>自己紹介</div>
            <span>{{ refState.user.self_introduction }}</span>
        </div>
        <div class="w-50">
          <ul class="d-flex flex-wrap justify-content-between">
            <li class="notification-related">
              <div>いいね通知</div>
              <span>{{ judgeFlag(refState.user.can_like_notification) }}</span>
            </li>
            <li class="notification-related">
              <div>コメント通知</div>
              <span>{{ judgeFlag(refState.user.can_comment_notification) }}</span>
            </li>
            <li class="notification-related">
              <div>メッセージ通知</div>
              <span>{{ judgeFlag(refState.user.can_message_notification) }}</span>
            </li>
            <li class="notification-related">
              <div>カレンダー通知</div>
              <span>{{ judgeFlag(refState.user.can_calender_notification) }}</span>
            </li>
          </ul>
          <ul class="d-flex flex-wrap justify-content-between">
            <li class="others-data">
              <div>削除</div>
              <span>{{ refState.user.is_delete }}</span>
            </li>
            <li class="others-data">
              <div>登録日</div>
              <span>{{ refState.user.created_at }}</span>
            </li>
            <li class="others-data">
              <div>更新日</div>
              <span>{{ refState.user.updated_at }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { User } from "@/types/User";

interface UserExtend extends User {
  post_count: number;
  like_count: number;
  follow_count: number;
  follower_count: number;
  message_user_count: number;
}

interface State {
  user: UserExtend;
}

export default defineComponent({
  props: {
    id: {
      type: String,
      default: "",
    },
  },

  setup(props) {
    const router = useRouter();

    const refState = reactive<State>({
      user: {
        post_count: 0,
        like_count: 0,
        follow_count: 0,
        follower_count: 0,
        message_user_count: 0,
        id: 0,
        user_name: "",
        user_id: "",
        self_introduction: "",
        email: "",
        phone_number: 0,
        birthday: new Date(),
        image: "",
        can_like_notification: false,
        can_comment_notification: false,
        can_message_notification: false,
        can_calender_notification: false,
        is_delete: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    onMounted(async () => {
      const result = await axios.get("http://localhost:3000/users/" + props.id);
      refState.user = result.data[0];
      console.log(refState.user);
    });

    const transitionList = () => {
      router.push({
        name: "UserList",
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
      transitionList,
      judgeFlag,
    };
  },
});
</script>

<style scoped>
ul {
  list-style: none;
  padding-left: 0;
}

.count {
  width: 10%;
}

.noti {
  width: 30%;
  margin-bottom: 10px;
  margin-left: 3.3%;
}

.select-user-icon {
  width: 100px;
}

.notification-related {
  width: 25%;
}
</style>
