<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
<div>
<link rel="stylesheet" href="@/assets/style.css">
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>
  <body>
      <div class="bg-gradient-to-r from-red-500 ...">
    Ceci est un exemple de gradient
  </div>
  </body>
  <RouterView />
</div>
</template>
