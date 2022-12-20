<script setup lang="ts">
import Trend from './components/Trend.vue'
import Search from './components/Search.vue'
import Currency from './components/Currency.vue'
</script>

<template>
  <div>
    <link rel="stylesheet" href="@/assets/style.css">
    <body>
      <div>
        <Trend />
        <Search />
        <Currency />
      </div>
    </body>
  </div>
</template>
