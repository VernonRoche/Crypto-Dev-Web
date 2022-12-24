<script setup lang="ts">
import NavbarHeader from "@/components/navbarAndFooter/NavbarHeader.vue";
import FooterBar from "@/components/navbarAndFooter/FooterBar.vue";
</script>

<template>
  <link rel="stylesheet" href="@/assets/style.css" />
  <header>
    <NavbarHeader />
  </header>
  <body>
    <div class="bg-gradient-to-r from-red-500 ...">
      Ceci est un exemple de gradient
    </div>
  </body>
  <footer>
    <FooterBar />
  </footer>
</template>
