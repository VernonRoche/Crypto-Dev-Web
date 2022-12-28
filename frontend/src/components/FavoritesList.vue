<template>
        <table id="FavoriList" class="hidden table-fixed overflow-x-auto text-sm text-left text-gray-500 dark:text-gray-400 whitespace-nowrap">
          <caption></caption>
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  <th scope="col" class="py-3 px-6">
                    <div class="flex items-center">
                      Name
                      <img src="@/assets/sort.png" alt="sort icon" class="object-scale-down h-4 w-4" />
                    </div>
                  </th>
                  <th scope="col" class="py-3 px-6">
                      <div class="flex items-center">
                          Price
                      <img src="@/assets/sort.png" alt="sort icon" class="object-scale-down h-4 w-4" />
                      </div>
                  </th>
                  <th scope="col" class="py-3 px-6">
                      <div class="flex items-center">
                          Variation
                      <img src="@/assets/sort.png" alt="sort icon" class="object-scale-down h-4 w-4" />
                      </div>
                  </th>
                  <th scope="col" class="py-3 px-6">
                      <div class="flex items-center">
                          Volume 24h
                      <img src="@/assets/sort.png" alt="sort icon" class="object-scale-down h-4 w-4" />
                      </div>
                  </th>
                  <th scope="col" class="py-3 px-6">
                      <span class="sr-only"></span>
                  </th>
              </tr>
          </thead>
        </table>
</template>
<script lang="ts">

export default   
{
  name: "FavoritesList.vue",
}
</script>