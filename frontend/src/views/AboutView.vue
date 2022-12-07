<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script setup lang="ts">
import {onAuthStateChanged, getAuth} from 'firebase/auth';
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const auth = getAuth();

onBeforeMount(() => {
  onAuthStateChanged(auth, (user: any) => {
    if (!user) {
      
      router.push('/sign-in');
    }
  });
});
</script>
