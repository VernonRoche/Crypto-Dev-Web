<template>
  <div>
    <nav>
      <router-link to="/"> Home </router-link> |
      <span v-if="isLoggedIn"
      >>
          <button @click="signOutLoigin">Logout</button>
        </span>
      <span v-else>
          <router-link to="/register"> Register </router-link> |
          <router-link to="/sign-in"> Login </router-link>
        </span>
    </nav>
    <router-view />
  </div>
</template>

<script setup >
import { ref, watchEffect } from 'vue' // used for conditional rendering
import {getAuth, type Auth} from 'firebase//auth'
import { useRouter } from 'vue-router'
const router = useRouter();
const isLoggedIn = ref(true);
const auth = getAuth();
// runs after firebase is initialized
// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     isLoggedIn.value = true // if we have a user
//   } else {
//     isLoggedIn.value = false // if we do not
//   }
// })
// const signOut = () => {
//   firebase.auth().signOut()
//   router.push('/')
// }

const signOutLoigin = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    this.user='';
    this.isLoggedIn=false;
    router.push('/');
  }).catch((error: any) => {
    // An error happened.
    console.log(error);
  });
}
</script>