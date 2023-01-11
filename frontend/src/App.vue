<script setup lang="ts">
import NavbarHeader from "@/components/navbarAndFooter/NavbarHeader.vue";
import FooterBar from "@/components/navbarAndFooter/FooterBar.vue";
import CryptoList from "@/components/cryptoList/CryptoList.vue";
import TrendCarousel from "@/components/TrendCarousel.vue";
import CryptoChart from "@/components/chart/CryptoChart.vue";
</script>
<template>
  <link rel="stylesheet" href="@/assets/style.css" />
  <header>
    <NavbarHeader />
  </header>
  <body>
    <!-- Graphic showing the currently selected crypto's data -->
    <CryptoChart />
    <!-- Trending cryptos -->
    <TrendCarousel />
    <!-- Complete list of cryptos -->
    <CryptoList />
  </body>
  <footer>
    <FooterBar />
  </footer>
</template>
