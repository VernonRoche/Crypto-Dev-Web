import { CoinGeckoApi } from "@/stores/CoinGeckoApi";
import IconSearch from "@/components/icons/IconSearch.vue";
import IconSupport from "@/components/icons/IconSupport.vue";

/**
 *  Create a Div tha represend the trending Crypto currency
 * @returns Div containing trending Crypto currency
 */
export function CreateTrendElement(): HTMLDivElement {
  const trendGrid: HTMLDivElement = document.createElement("div");
  trendGrid.setAttribute("class", "grid gap-4 grid-cols-{7} ");
  const data = CoinGeckoApi.getTrend();
  data.then((value: any) => {
    value["coins"].forEach((element: any) => {
      /*
            element :
              id: crypto id-name
              coin_id: number representing crypto id
              name: official name for the coin
              large: logo in large scale
              small: logo in small scale
              price_btc: price in btc
              market_cap_rank: number representing market cap rank
              symbol: symbol
              slug: short id
              thumb:
              score:
            */
      for (const key in element) {
        const trend: HTMLDivElement = document.createElement("div");
        trend.setAttribute("class", "flex border-2");
        const name: HTMLParagraphElement = document.createElement("p");
        name.innerHTML = element[key]["name"];
        const img: HTMLImageElement = document.createElement("img");
        img.setAttribute("class", "inline");
        img.src = element[key]["thumb"];
        trend.appendChild(img);
        trend.appendChild(name);
        trendGrid.appendChild(trend);
      }
    });
  });
  return trendGrid;
}

export default {
  components: { IconSearch, IconSupport },
  mounted() {
    document.getElementById("trend")?.appendChild(CreateTrendElement());
  },
};
