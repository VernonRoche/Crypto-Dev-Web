<template>
  <div class="inline-block">
    <div class="mb-3 xl:w-96">
      <div class="input-group relative flex flex-wrap items-stretch mb-4">
        <input
          type="search"
          id="cryptoSearch"
          name="cryptoSearch"
          class="form-control relative flex-auto min-w-0 block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-none"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="CoinSearch"
        />
        <button
          class="btn inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
          type="button"
          id="CoinSearch"
        >
          <img src="@/assets/icons8-search-32.png" alt="search icon" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
function SearchCoin(): void {
  const input = document.getElementById("cryptoSearch") as HTMLInputElement;
  const filter = input.value.toUpperCase();
  const table: HTMLTableElement = document.getElementById(
    "CryptoList"
  ) as HTMLTableElement;
  const tr = table.getElementsByTagName("tr");

  for (let i: number = 0; i < tr.length; i++) {
    let td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      let txtVal = td.textContent || td.innerText;
      if (txtVal.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

export default {
  name: "SearchBox.vue",
  mounted() {
    const button = document.getElementById("CoinSearch");
    button?.addEventListener("click", () => {
      SearchCoin();
    });
  },
};
</script>
