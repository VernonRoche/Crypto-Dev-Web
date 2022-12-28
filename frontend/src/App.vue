<script setup lang="ts">

import NavbarHeader from "@/components/navbarAndFooter/NavbarHeader.vue";
import FooterBar from "@/components/navbarAndFooter/FooterBar.vue";
import SearchBar from "@/components/api/SearchBar.vue";
import CryptoTrend from "@/components/api/CryptoTrend.vue";
</script>
<template>
  <link rel="stylesheet" href="@/assets/style.css" />
  <header>
    <NavbarHeader />
  </header>
  <body>
    <SearchBar />
    <CryptoTrend />
  </body>
  <footer>
    <FooterBar />
  </footer>
</template>
