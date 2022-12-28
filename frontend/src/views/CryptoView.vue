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
    <link rel="stylesheet" href="@/assets/style.css" />
    <div>
      <div class="bg-gradient-to-r from-red-500 ...">
        Ceci est un exemple de gradient
      </div>
    </div>
  </div>
</template>
