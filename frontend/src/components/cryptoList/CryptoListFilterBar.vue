<template>
  <tr>
    <th>
      <SearchBox />
    </th>
    <th scope="col" class="py-3 px-6">
      <div class="flex items-center">
        Name
        <div>
          <img
            id="asc"
            src="@/assets/caret-arrow-up.png"
            alt="0"
            class="cursor-pointer object-scale-down h-3 w-3"
          />
          <img
            id="desc"
            src="@/assets/caret-down.png"
            alt="0"
            class="cursor-pointer object-scale-down h-3 w-3"
          />
        </div>
      </div>
    </th>
    <th scope="col" class="py-3 px-6">
      <div class="flex items-center">
        Price
        <div>
          <img
            id="asc"
            src="@/assets/caret-arrow-up.png"
            alt="1"
            class="cursor-pointer object-scale-down h-3 w-3"
          />
          <img
            id="desc"
            src="@/assets/caret-down.png"
            alt="1"
            class="cursor-pointer object-scale-down h-3 w-3"
          />
        </div>
      </div>
    </th>
    <th scope="col" class="py-3 px-6">
      <div class="flex items-center">
        Variation
        <div>
          <img
            id="asc"
            src="@/assets/caret-arrow-up.png"
            alt="2"
            class="cursor-pointer object-scale-down h-3 w-3"
          />
          <img
            id="desc"
            src="@/assets/caret-down.png"
            alt="2"
            class="cursor-pointer object-scale-down h-3 w-3"
          />
        </div>
      </div>
    </th>
    <th scope="col" class="py-3 px-15">
      <div class="flex items-center">
        Volume 24h
        <div>
          <img
            id="asc"
            src="@/assets/caret-arrow-up.png"
            alt="3"
            class="cursor-pointer object-scale-down h-3 w-3"
          />
          <img
            id="desc"
            src="@/assets/caret-down.png"
            alt="3"
            class="cursor-pointer object-scale-down h-3 w-3"
          />
        </div>
      </div>
    </th>
    <th scope="col">
      <CryptoListFavoriteFilter />
    </th>
  </tr>
</template>

<script>
import SearchBox from "@/components/cryptoList/SearchBox.vue";
import CryptoListFavoriteFilter from "@/components/cryptoList/CryptoListFavoriteFilter.vue";
import { Login } from "@/stores/login";

export default {
  name: "CryptoListFilterBar",
  components: { CryptoListFavoriteFilter, SearchBox},
};
</script>

<style scoped></style>
