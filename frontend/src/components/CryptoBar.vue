<template>
<div>
    <div class="grid ">
      <div class="content-center whitespace-nowrap space-x-10" >
        <SearchBox />
        <Filter />
      </div>
      <CryptoList />
    </div>
</div>
</template>
<script  lang="ts">
import SearchBox from "@/components/SearchBox.vue";
import CryptoList from '@/components/CryptoList.vue';
import Filter from '@/components/Filter.vue';
export default 
{
  name: "CryptoBar.vue",
}
</script>