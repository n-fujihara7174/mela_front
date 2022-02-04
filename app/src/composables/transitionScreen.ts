import { useRouter } from "vue-router";
const router = useRouter();

//編集画面に遷移
export const transitionUserEdit = (id: number): void => {
  router.push({
    name: "UserEdit",
    params: {
      id: id,
    },
  });
};
