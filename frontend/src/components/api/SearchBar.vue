<template>
  <div>
    <link rel="stylesheet" href="@/assets/style.css" />
    <div class="grid-cols-{2}" id="crypto">
      <div class="flex justify-center border-2">
        <div class="mb-3 xl:w-96">
          <div
            class="input-group relative flex flex-wrap items-stretch w-full mb-4"
          >
            <input
              type="search"
              id="cryptoSearch"
              name="cryptoSearch"
              class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-none"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="CoinSearch"
            />
            <button class="btn btn-secondary" type="button" id="CoinSearch">
              <IconSearch />
            </button>
          </div>
        </div>
        <div id="filter"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="@/stores/Search">
export default {
  name: "SearchBar",
};
</script>
