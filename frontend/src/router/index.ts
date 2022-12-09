import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {getAuth , onAuthStateChanged } from 'firebase/auth';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView

    },
    {
      path: '/connection',
      name: 'connection',
      component: () => import('../views/SignInLogin.vue')
    },

    {
      path: '/account',
      name: 'account',
      component : () => import('../views/MyAccount.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: {
        requiresAuth: true,
      }
    }
  ]
})


export default router

