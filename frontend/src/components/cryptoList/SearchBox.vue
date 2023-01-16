<template>
  <div class="inline-block">
    <div class="mb-3 xl:w-96">
      <div class="input-group relative flex flex-wrap items-stretch mb-4">
        <input
          type="search"
          id="cryptoSearch"
          name="cryptoSearch"
          class="input input-secondary input-bordered"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="CoinSearch"
        />
        <button class="btn btn-secondary" type="button" id="CoinSearch">
          <IconSearch></IconSearch>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import IconSearch from "@/components/icons/IconSearch.vue";

/**
 * Search for a Crypto currencies inside CryptoList
 */
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
  components: { IconSearch },
  mounted() {
    const button = document.getElementById("CoinSearch");
    button?.addEventListener("click", () => {
      SearchCoin();
    });
  },
};
</script>
