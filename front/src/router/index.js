import { createRouter, createWebHashHistory } from 'vue-router'
import AdminPage from '../views/AdminPageRouting.vue'
import UserList from '../components/adminPage/user/UserList.vue'
// import UserShow from '../views/adminPage/user/UserShow.vue'

const routes = [
  {
    path: '/AdminPage',
    component: AdminPage,
    children: [
      {
        path: 'UserList',
        component: UserList
      }
      /* {
        path: '/UserShow',
        component: UserShow
      } */
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
