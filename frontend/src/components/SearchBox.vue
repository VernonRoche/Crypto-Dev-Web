<template>
  <div>
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
            <button
              class="btn inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
              type="button"
              id="CoinSearch"
            >
              <img src="@/assets/icons8-search-32.png" alt="search icon" />
            </button>
          </div>
        </div>
        <div id="filter"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { CoinGeckoApi } from "../stores/CoinGeckoApi";

function SearchCoin(query:string):HTMLDivElement{
  let coinsGrid:HTMLDivElement = document.createElement("div");
  //coinsGrid.setAttribute("class","grid-rows-{2}");
  coinsGrid.setAttribute("class","container mx-auto overflow-scroll");
  const data = CoinGeckoApi.Search(query);
  data.then( (value:string) => {
    value["coins"].forEach((element:any) => {
      /*
      element:
        id: crypto id
        name:
        api_symbol: 
        large: logo large
        market_cap_rank:
        symbol:
        thumb:
      */
     
        let coin:HTMLDivElement = document.createElement("div");
        coin.setAttribute("class","container mx-auto");
        coin.setAttribute("class","flex");

        let name:HTMLParagraphElement = document.createElement("p");
        name.innerHTML = element["name"];
        let img:HTMLImageElement = document.createElement("img");
        img.setAttribute("class","inline");
        img.src = element["thumb"];
        let rank:HTMLParagraphElement = document.createElement("p");
        rank.innerHTML = "&nbsp&nbsp"+element["market_cap_rank"];

        coin.appendChild(img);
        coin.appendChild(name);
        coin.appendChild(rank);

        coinsGrid.appendChild(coin);
    });
  });
  return coinsGrid;
}

export default   
{
  name: "SearchBox.vue",
  mounted(){
    const button = document.getElementById("CoinSearch");
    button?.addEventListener('click',() => {
      const input = document.getElementById("cryptoSearch") as HTMLInputElement;
      const searchVal = input?.value;      
      document.getElementById("crypto")?.appendChild(SearchCoin(searchVal));
    })
  } 
}
</script>

<style scoped></style>
