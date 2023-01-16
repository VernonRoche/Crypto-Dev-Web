<template>
  <div
    class="text-3xl font-bold text-secondary overline content-center w-full h-full my-3 py-3"
    style="text-align: center"
  >
    Trending Cryptos
  </div>
  <Carousel
    :autoplay="2000"
    :wrap-around="true"
    :items-to-show="4"
    pause-autoplay-on-hover
  >
    <Slide v-for="trendingCrypto in trendingCryptos" :key="trendingCrypto.id">
      <img :src="trendingCrypto.image" :alt="trendingCrypto.name" />
      <span class="text-accent hover:text-secondary">{{
        trendingCrypto.name
      }}</span>
    </Slide>
  </Carousel>
</template>

<script setup lang="ts">
import { Carousel, Slide } from "vue3-carousel";
import { CoinGeckoApi } from "@/stores/CoinGeckoApi";
import "vue3-carousel/dist/carousel.css";

const trendingCryptos = [];
const data = CoinGeckoApi.getTrend();

// Get the trending cryptos from the CoinGecko API and add to an array to be used by the carousel element
data.then((value: any) => {
  value["coins"].forEach((element: any) => {
    /*
          element :
            id: crypto id-name
            coin_id: number representing crypto id
            name: official name for the coin
            large: logo in large scale
            small: logo in small scale
            price_btc: price in btc
            market_cap_rank: number representing market cap rank
            symbol: symbol
            slug: short id
            thumb:
            score:
          */
    const trendingCrypto = {
      name: element["item"]["name"],
      image: element["item"]["thumb"],
    };
    trendingCryptos.push(trendingCrypto);
  });
});
</script>
