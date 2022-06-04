import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AdminPage from "@/views/AdminPage.vue";
import UserList from "@/components/adminPage/user/UserList.vue";
import UserEdit from "@/components/adminPage/user/UserEdit.vue";
import PostEdit from "@/components/adminPage/post/PostEdit.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import Top from "@/views/Basic.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/Admin",
    component: AdminPage,
    children: [
      {
        path: "UserList",
        name: "UserList",
        component: UserList,
      },
      {
        path: "UserEdit/:id",
        name: "UserEdit",
        component: UserEdit,
        props: true,
      },
      {
        path: "Top",
        name: "Top",
        component: Top,
      },
      {
        path: "PostEdit/:id",
        name: "PostEdit",
        component: PostEdit,
        props: true,
      },
    ],
  },
  {
    path: "/SignIn",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/SignUp",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "",
    component: () => import("@/views/Basic.vue"),
    children: [
      {
        path: "/Top",
        name: "Top",
        component: () => import("@/components/template/main/Main.vue"),
      },
      {
        path: "/Post",
        name: "Post",
        component: () => import("@/components/template/main/WorkPost.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
