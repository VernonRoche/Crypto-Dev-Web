<script setup lang="ts">
import NavbarHeader from "@/components/navbarAndFooter/NavbarHeader.vue";
import FooterBar from "@/components/navbarAndFooter/FooterBar.vue";
import CryptoList from "@/components/cryptoList/CryptoList.vue";
import TrendCarousel from "@/components/TrendCarousel.vue";
import CryptoTrend from "@/components/api/CryptoTrend.vue";
import SearchBox from "@/components/SearchBox.vue";
import CryptoList from '@/components/CryptoList.vue';
import Filter from '@/components/Filter.vue';
import CryptoChart from "@/components/CryptoChart.vue";
import BarChart from "@/components/Bar.vue";
</script>
<template>
  <link rel="stylesheet" href="@/assets/style.css" />
  <header>
    <NavbarHeader />
  </header>
  <body>
    <TrendCarousel />
    <CryptoList />
    <CryptoChart />
    <div class="grid ">
      <div class="content-center whitespace-nowrap space-x-10" >
        <SearchBox />
        <Filter />
      </div>
      <CryptoList />
    </div>
  </body>
  <footer>
    <FooterBar />
  </footer>
</template>
