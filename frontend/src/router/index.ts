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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListerner = onAuthStateChanged(getAuth(), (user: unknown) => {
      removeListerner();
      resolve(user);
    }, reject);
  });
}
router.beforeEach(async(to, from, next) => {
  if(to.matched.some(record => record.meta.requireAuth)) {
    if(await getAuth()) {
      next();
    } else {
      alert("You dont have acces !!!");
      next("/");
    }
  }else {
    next();
  }
})
export default router

function alert(arg0: string) {
  throw new Error('Function not implemented.');
}

