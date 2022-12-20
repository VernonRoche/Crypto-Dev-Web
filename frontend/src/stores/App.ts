import { CoinGeckoApi } from "../stores/CoinGeckoApi";

export function CreateTrendElement(): HTMLDivElement{

  const trendGrid:HTMLDivElement = document.createElement("div");
  trendGrid.setAttribute("class","grid gap-4 grid-cols-{7} ")
  const data = CoinGeckoApi.getTrend();
  data.then((value: string) => {
    value["coins"].forEach((element:any) => {

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
        let trend:HTMLDivElement = document.createElement("div");
        trend.setAttribute("class","flex border-2");
        let name:HTMLParagraphElement = document.createElement("p");
        name.innerHTML = element[key]["name"];
        let img:HTMLImageElement = document.createElement("img");
        img.setAttribute("class","inline");
        img.src = element[key]["thumb"];
        trend.appendChild(img);
        trend.appendChild(name);
        trendGrid.appendChild(trend);
      }
    });
  });
  return trendGrid;
}

export function SearchCoin(query:string):HTMLDivElement{
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
     console.log(element);
     
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

export function getSupportedCurrency():HTMLOptGroupElement{
  let options:HTMLOptGroupElement = document.createElement("optgroup");
  const data = CoinGeckoApi.getSupportedCurrency();
  data.then( (value:Array<string>) => {
    value.forEach( (currency:string) => {
      let option:HTMLOptGroupElement = document.createElement("option");
      option.innerHTML = currency;
      options.append(option)
    });
  });
  return options;
} 

export default {
  mounted() {
    const button = document.getElementById("CoinSearch");
    button?.addEventListener('click',() => {
      const input = document.getElementById("cryptoSearch") as HTMLInputElement;
      const searchVal = input?.value;      
      document.getElementById("crypto")?.appendChild(SearchCoin(searchVal));
    });
    document.getElementById("trend")?.appendChild(CreateTrendElement());
    document.getElementById("currency")?.appendChild(getSupportedCurrency());
  }
}

