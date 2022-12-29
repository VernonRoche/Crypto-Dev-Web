<template>
  <div>
    <div class="grid">
      <div class="content-center whitespace-nowrap space-x-10">
        <SearchBox />
        <CryptoListFilter />
      </div>
      <CryptoList />
    </div>
  </div>
</template>
<script lang="ts">
import SearchBox from "@/components/cryptoList/SearchBox.vue";
import CryptoList from "@/components/cryptoList/CryptoList.vue";
import CryptoListFilter from "@/components/cryptoList/CryptoListFilter.vue";

export default {
  name: "CryptoBar.vue",
  components: { CryptoList, CryptoListFilter, SearchBox },
};
</script>
