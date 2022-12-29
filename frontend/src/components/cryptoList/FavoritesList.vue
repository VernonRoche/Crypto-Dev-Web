<template>
  <table
    id="FavoriList"
    class="hidden table-fixed overflow-x-auto text-sm text-left text-gray-500 dark:text-gray-400 whitespace-nowrap"
  >
    <caption></caption>
    <thead
      class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
    >
      <tr>
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
      </tr>
    </thead>
  </table>
</template>
<script lang="ts">
export default {
  name: "FavoritesList.vue",
};
</script>
