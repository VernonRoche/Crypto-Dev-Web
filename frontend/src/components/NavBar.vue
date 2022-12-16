<template>
  <div id="app">
    <nav>
      <router-link to="/about"> About </router-link> |
      <span v-if="isLoggedIn">
        <button @click="handleSignOut">Logout</button> |
        <!-- <router-link to="/account"> My Account </router-link> -->
        <button @click="handlePopupLogin">Myaccount</button>
        <PopupMyAccount
          v-if="popupTrigger.buttonTrigger"
          :handlePopupLogin="() => handlePopupLogin"
        >
        </PopupMyAccount>
      </span>
      <span v-else>
        <button @click="handlePopupLogin">Login</button>
        <PopupLogin
          v-if="popupTrigger.buttonTrigger"
          :handlePopupLogin="() => handlePopupLogin"
        >
        </PopupLogin>
      </span>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { watchEffect, ref } from "vue";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import firebase from "firebase/auth";
import { useRouter } from "vue-router";
import PopupLogin from "./PopupLogin.vue";
import { popupTrigger, handlePopupLogin } from "../types/popup";
import PopupMyAccount from "./PopupAccount.vue";

const isLoggedIn = ref(true);

const router = useRouter();

const auth = getAuth();

onAuthStateChanged(auth, (user: any) => {
  if (user) {
    isLoggedIn.value = true;
  } else {
    isLoggedIn.value = false;
  }
});

const handleSignOut = () => {
  signOut(auth)
    .then(() => {
      router.push("/");
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
