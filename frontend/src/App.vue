<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <link rel="stylesheet" href="@/assets/style.css">

  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <div>
      <nav>
        <router-link to="/about"> About </router-link> |
        <!-- <span v-if="isLoggedIn">>
          <button @click="handleSignOut">Logout</button>
        </span>
        <span v-else> -->
          <router-link to="/connection"> Login </router-link>
        <!-- </span> -->
      </nav>
    </div>

  </header>
  <RouterView />
</template>


<script lang="ts">

import { watchEffect, ref } from 'vue'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import {useRouter} from 'vue-router';


const isLoggedIn = ref(true);
const router = useRouter();

// const auth = getAuth();

// onAuthStateChanged(auth, (user: any) => {
//   if (!user) {
//     isLoggedIn.value = false;
//     router.push('/sign-in');
//   }
// });

// const handleSignOut = () => {
//   signOut(auth).then(() => {
//     // Sign-out successful.
//     isLoggedIn.value = false;
//     router.push('/');
//   }).catch((error: any) => {
//     // An error happened.
//     console.log(error);
//   });
// }
</script>

