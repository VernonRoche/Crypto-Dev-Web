<script setup lang="ts">
import { CoinGeckoApi } from "@/stores/CoinGeckoApi";
const data = CoinGeckoApi.getTrend();
data.then((value: any) => {
  value["coins"].forEach((element: any) => {
    console.log(element);
  });
});
</script>

<template>
  <div>
    <header></header>
    <body>
      <div>
        <div id="trend"></div>
      </div>
    </body>
  </div>
</template>
