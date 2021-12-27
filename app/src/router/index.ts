import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AdminPage from "../views/AdminPage.vue";
import UserList from "../components/adminPage/user/UserList.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/Admin",
    component: AdminPage,
    children: [
      {
        path: "UserList",
        component: UserList,
      },
      /* {
        path: '/UserShow',
        component: UserShow
      } */
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
