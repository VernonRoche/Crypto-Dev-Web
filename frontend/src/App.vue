<script setup lang="ts">
import NavbarHeader from "@/components/navbarAndFooter/NavbarHeader.vue";
import FooterBar from "@/components/navbarAndFooter/FooterBar.vue";
import CryptoList from "@/components/cryptoList/CryptoList.vue";
import TrendCarousel from "@/components/TrendCarousel.vue";
import CryptoChart from "@/components/chart/CryptoChart.vue";
import Fav from "@/components/Fav.vue";
import { Login } from "@/stores/login";

</script>
<template>
  <link rel="stylesheet" href="@/assets/style.css" />
  <header>
    <NavbarHeader />
  </header>
  <body>
    <div class="grid-rows-2 grid-cols-1">
      <Fav v-if="Login.isLog"/>
      <CryptoChart />
    </div>
    <TrendCarousel />
    <!-- Complete list of cryptos -->
    <CryptoList />
  </body>
  <footer>
    <FooterBar />
  </footer>
</template>