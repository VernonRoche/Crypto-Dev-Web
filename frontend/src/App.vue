<script setup lang="ts">
import CryptoBar from "./components/CryptoBar.vue";
import SearchBox from "./components/SearchBox.vue";
import CryptoList from './components/CryptoList.vue'
import Filter from './components/Filter.vue'
</script>

<template>
<div>
  <link rel="stylesheet" href="@/assets/style.css" />
  <header></header>
  <body>
        <div class="grid ">
      <div class="content-center whitespace-nowrap space-x-10" >
        <SearchBox />
        <Filter />
      </div>
      <CryptoList />
    </div>
  </body>
</div>
</template>
