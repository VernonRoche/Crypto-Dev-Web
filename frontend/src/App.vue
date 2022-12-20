<script setup lang="ts">
import Trend from "./components/TrendChoice.vue";
import Search from "./components/SearchBox.vue";
import Currency from "./components/CurrencySelector.vue";
</script>

<template>
  <link rel="stylesheet" href="@/assets/style.css" />
  <header></header>
  <body>
    <div>
      <Trend />
      <Search />
      <Currency />
    </div>
  </body>
</template>
