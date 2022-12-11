<template>
  <div>
    <nav>
      <router-link to="/about"> About </router-link> |
      <span v-if="isLoggedIn">
        <button @click="handleSignOut">Logout</button> |
        <router-link to="/account"> My Account </router-link>
      </span>
      <span v-else>
        <router-link to="/connection"> Login </router-link>
      </span>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { watchEffect, ref } from "vue";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";

const isLoggedIn = ref(true);

const router = useRouter();

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
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
