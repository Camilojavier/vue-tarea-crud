import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {USER_CREATE, USER_EDIT, USER_DETAIL_ENDPOINT} from '@/constants/api'
import UserView from "../views/users/UserView.vue";
import UserCreateView from "../views/users/UserCreateView.vue";
import UserEditView from "../views/users/UserEditView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: USER_DETAIL_ENDPOINT,
      name: 'user',
      component: UserView
    },
    {
      path: USER_CREATE,
      name: 'userCreate',
      component: UserCreateView
    },
    {
      path: USER_EDIT,
      name: 'userEdit',
      component: UserEditView
    },
  ]
})

export default router
