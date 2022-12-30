<template>
  <header aria-label="Site Header" class="bg-gray-900">
    <div
      class="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8"
    >
      <a class="flex items-center text-purple-500" href="/">
        <span class="sr-only">Home</span>
        <IconCryptohubLogo />
      </a>

      <div
        class="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8"
      >
        <h1 class="text-4xl font-extrabold text-primary content-center">
          Cryptohub
        </h1>
      </div>

      <div class="flex flex-1 items-center justify-end md:justify-between">
        <nav aria-label="Site Nav" class="hidden md:block"></nav>

        <div class="flex items-center gap-4">
          <div class="sm:flex sm:gap-4">
            <!-- <a class="btn btn-default" href="/"> Login </a>

            <a class="btn btn-primary" href="/"> Register </a> -->

            <span v-if="isLoggedIn">
              <!-- <button class="btn btn-primary" @click="handlePopupAccount">
          Myaccount
        </button> -->
              <PopupMyAccount> </PopupMyAccount>
              |
              <button class="btn" @click="handleSignOut">Logout</button>
            </span>
            <span v-else>
              <!-- <button class="btn btn-default" @click="clickLogin">Login</button> -->
              <!-- <button class="btn btn-primary" @click="clickRegister">Register</button> -->
              <PopupLogin> </PopupLogin>

              <RegisterPopup />
            </span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import IconCryptohubLogo from "@/components/icons/IconCryptohubLogo.vue";

// export default defineComponent({
//   name: "NavbarHeader.vue",
//   components: { IconCryptohubLogo },
// });
import { ref } from "vue";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";
import {
  popupTriggerLogin,
  popupTriggerRegister,
  handlePopupLogin,
  handlePopupRegister,
} from "@/types/popup";
import PopupMyAccount from "@/components/authentication/AccountPopup.vue";
// import PopupMyAccount from "../components/PopupAccount.vue";
import RegisterPopup from "@/components/authentication/RegisterPopup.vue";
import PopupLogin from "@/components/authentication/LoginPopup.vue";
//import PopupLogin from "../components/PopupLogin.vue";

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

const clickLogin = () => {
  handlePopupLogin();
  popupTriggerRegister.value.buttonTriggerRegister = false;
};

const clickRegister = () => {
  handlePopupRegister();
  popupTriggerLogin.value.buttonTrigger = false;
};
</script>

<style scoped></style>
