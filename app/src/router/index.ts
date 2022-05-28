import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AdminPage from "@/views/AdminPage.vue";
import UserList from "@/components/adminPage/user/UserList.vue";
import UserEdit from "@/components/adminPage/user/UserEdit.vue";
import Top from "@/components/adminPage/post/PostList.vue";
import PostEdit from "@/components/adminPage/post/PostEdit.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import List from "@/components/List.vue";

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
    path: "/List",
    name: "List",
    component: List,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
