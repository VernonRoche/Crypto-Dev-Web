<script  lang="ts">
import Search from "../components/SearchBox.vue";
import CryptoList from '../components/CryptoList.vue'
import Filter from '../components/Filter.vue'

export default   
{
  name: "CryptoBar.vue",
  mounted(){
    console.log("OK");
  },
}
</script>

<template>
<div>
  <link rel="stylesheet" href="@/assets/style.css" />
  <header></header>
  <body>
    <div class="grid ">
      <div class="content-center whitespace-nowrap space-x-10" >
        <Search />
        <Filter />
      </div>
      <CryptoList />
    </div>
  </body>
</div>
</template>
