<template>
  <div id="appNavbar">
    <nav>
      <router-link to="/about"> About </router-link> |
      <span v-if="isLoggedIn">
        <button @click="handleSignOut">Logout</button> |
        <!-- <router-link to="/account"> My Account </router-link> -->
        <button @click="handlePopupAccount">Myaccount</button>
        <PopupMyAccount
          v-if="popupTriggerAccount.buttonTriggerAccount"
          :handlePopupAccount="() => handlePopupAccount"
        >
        </PopupMyAccount>
      </span>
      <span v-else>
        <button @click="handlePopupLogin">Login</button>
        <PopupLogin
          v-if="popupTriggerLogin.buttonTrigger"
          :handlePopupLogin="() => handlePopupLogin"
        >
        </PopupLogin>
        <button class="btn btn-primary" @click="handlePopupRegister">
          Register
        </button>
        <RegisterPopup
          v-if="popupTriggerRegister.buttonTriggerRegister"
          :handlePopupRegister="() => handlePopupRegister"
        />
      </span>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";
import {
  popupTriggerLogin,
  popupTriggerAccount,
  popupTriggerRegister,
  handlePopupAccount,
  handlePopupLogin,
  handlePopupRegister,
} from "@/types/popup";
import PopupMyAccount from "@/components/authentication/AccountPopup.vue";
// import PopupMyAccount from "../components/PopupAccount.vue";
import RegisterPopup from "@/components/authentication/RegisterPopup.vue";
import PopupLogin from "@/components/authentication/LoginPopup.vue";

const isLoggedIn = ref(true);

const router = useRouter();

const auth = getAuth();

onAuthStateChanged(auth, (user: any) => {
  isLoggedIn.value = !!user;
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
#appNavbar {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
