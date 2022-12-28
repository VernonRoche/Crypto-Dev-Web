import { CoinGeckoApi } from "@/stores/CoinGeckoApi";
import IconSupport from "@/components/icons/IconSupport.vue";
import IconSearch from "@/components/icons/IconSearch.vue";

export function SearchCoin(query: string): HTMLDivElement {
  const coinsGrid: HTMLDivElement = document.createElement("div");
  //coinsGrid.setAttribute("class","grid-rows-{2}");
  coinsGrid.setAttribute("class", "container mx-auto overflow-scroll");
  const data = CoinGeckoApi.Search(query);
  data.then((value: any) => {
    value["coins"].forEach((element: any) => {
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
      console.log(element);

      const coin: HTMLDivElement = document.createElement("div");
      coin.setAttribute("class", "container mx-auto");
      coin.setAttribute("class", "flex");

      const name: HTMLParagraphElement = document.createElement("p");
      name.innerHTML = element["name"];
      const img: HTMLImageElement = document.createElement("img");
      img.setAttribute("class", "inline");
      img.src = element["thumb"];
      const rank: HTMLParagraphElement = document.createElement("p");
      rank.innerHTML = "&nbsp&nbsp" + element["market_cap_rank"];

      coin.appendChild(img);
      coin.appendChild(name);
      coin.appendChild(rank);

      coinsGrid.appendChild(coin);
    });
  });
  return coinsGrid;
}

export default {
  components: { IconSearch, IconSupport },
  mounted() {
    const button = document.getElementById("CoinSearch");
    button?.addEventListener("click", () => {
      const input = document.getElementById("cryptoSearch") as HTMLInputElement;
      const searchVal = input?.value;
      document.getElementById("crypto")?.appendChild(SearchCoin(searchVal));
    });
  },
};
