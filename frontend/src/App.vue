<script setup lang="ts">
import Trend from "./components/TrendChoice.vue";
import Search from "./components/SearchBox.vue";
import Currency from "./components/CurrencySelector.vue";
import CryptoList from './components/CryptoList.vue'
</script>

<template>
<div>
  <link rel="stylesheet" href="@/assets/style.css" />
  <header></header>
  <body>
    <div>
      <CryptoList />
    </div>
  </body>
</div>
</template>
