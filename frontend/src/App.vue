<script setup lang="ts">

import NavbarHeader from "@/components/navbarAndFooter/NavbarHeader.vue";
import FooterBar from "@/components/navbarAndFooter/FooterBar.vue";
import CryptoTrend from "@/components/api/CryptoTrend.vue";
import CryptoBar from "@/components/CryptoBar.vue";
import CryptoChart from "@/components/CryptoChart.vue";
</script>
<template>
  <link rel="stylesheet" href="@/assets/style.css" />
  <header>
    <NavbarHeader />
  </header>
  <body>
    <CryptoChart />
  </body>
  <footer>
    <FooterBar />
  </footer>
</template>
