<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <link rel="stylesheet" href="@/assets/style.css" />

  <header>
    <NavBar />
  </header>
  <RouterView />
</template>
