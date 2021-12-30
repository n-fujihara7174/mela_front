import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AdminPage from "../views/AdminPage.vue";
import UserList from "../components/adminPage/user/UserList.vue";
import UserDetail from "../components/adminPage/user/UserDetail.vue"

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
        path: 'UserDetail/:id',
        name: "UserDetail",
        component: UserDetail,
        props: true
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
