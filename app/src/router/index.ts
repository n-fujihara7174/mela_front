import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AdminPage from "@/views/AdminPage.vue";
import UserList from "@/components/adminPage/user/UserList.vue";
import UserEdit from "@/components/adminPage/user/UserEdit.vue";
import PostList from "@/components/adminPage/post/PostList.vue";
import PostEdit from "@/components/adminPage/post/PostEdit.vue";
import Login from "@/components/login/Login.vue";

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
        path: "PostList",
        name: "PostList",
        component: PostList,
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
    path: "/Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
