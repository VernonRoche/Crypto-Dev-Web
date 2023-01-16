<template>
  <header aria-label="Site Header" class="bg-gray-900">
    <div
      class="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8"
    >
      <!-- Logo and site name -->
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

      <!-- Login and Register sections -->
      <div class="flex flex-1 items-center justify-end md:justify-between">
        <nav aria-label="Site Nav" class="hidden md:block"></nav>

        <div class="flex items-center gap-4">
          <div class="sm:flex sm:gap-4">
            <span v-if="isLoggedIn">
              <PopupMyAccount />
              |
              <button class="btn" @click="handleSignOut">Logout</button>
            </span>
            <span v-else>
              <PopupLogin />
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
import { Login } from "@/stores/login";

import { ref } from "vue";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";
import PopupMyAccount from "@/components/authentication/AccountPopup.vue";
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
      Login.changeStateLogin();
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>
