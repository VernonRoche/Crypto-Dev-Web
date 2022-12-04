<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <link rel="stylesheet" href="@/assets/style.css">
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <nav>
        <!-- <RouterLink to="/">Home</RouterLink> -->
        <center><RouterLink to="/about">About</RouterLink></center>
        <!-- <center><router-link to="/register">Register</router-link></center> -->
        <center><router-link to="/connection">Connection</router-link></center>
        <!-- <button @click="handleSignOut" v-if="isLoggedIn">Sign Out</button> -->
      </nav>
    </div>
  </header>
  <RouterView />
</template>


<!-- <script setup>
import { onMounted, ref} from 'vue'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'


const isLoggedIn = ref(false);

let auth ;
 onMounted = () => {
   if(user){
     isLoggedIn.value = true;
   }else{
     isLoggedIn.value = false;
   }
 };

const handleSignOut = () => {
  signOut(auth)
  .then(() => {
    router.push("/");
  })
};
</script> -->

