<script setup lang="ts">
import NavbarHeader from "@/components/navbarAndFooter/NavbarHeader.vue";
import FooterBar from "@/components/navbarAndFooter/FooterBar.vue";
import CryptoList from "@/components/cryptoList/CryptoList.vue";
import TrendCarousel from "@/components/TrendCarousel.vue";
</script>
<template>
  <link rel="stylesheet" href="@/assets/style.css" />
  <header>
    <NavbarHeader />
  </header>
  <body>
    <TrendCarousel />
    <CryptoList />
  </body>
  <footer>
    <FooterBar />
  </footer>
</template>
