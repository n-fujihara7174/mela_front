<template>
  <div>
    <div>
      <h2>詳細画面</h2>
      <div>
        <span>ユーザー名</span>
        <span>{{ refState.user.user_name }}</span>
      </div>
      <div>
        <span>ユーザーID</span>
        <span>{{ refState.user.user_id }}</span>
      </div>
      <div>
        <span>メールアドレス</span>
        <span>{{ refState.user.email }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import axios from "axios";
import { User } from "@/types/User";

interface State {
  user: User;
}

export default defineComponent({
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },

  setup(props) {
    const refState = reactive<State>({
      user: {
        id: 0,
        user_name: "",
        user_id: "",
        self_introduction: "",
        email: "",
        phone_number: 0,
        birthday: new Date(),
        image: "",
        post_count: 0,
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
      console.log(refState);
      const result = await axios.get("http://localhost:3000/users/" + props.id);
      console.log(result.data)
      refState.user = result.data[0]
      console.log(refState.user)
    });

    return {
      refState,
    };
  },
});
</script>
