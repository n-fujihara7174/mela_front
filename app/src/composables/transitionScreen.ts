import { useRouter } from "vue-router";

export function transitionList(){
  const router = useRouter();

  router.push({
    name: "UserList",
  });
}
