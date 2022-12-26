<template>
  <div id="body">
      <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table id="CryptoList" class="overflow-x-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <caption></caption>
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  <th scope="col" class="py-3 px-6">
                    <div class="flex items-center">
                      Name
                      <a href="#"><svg xmlns="http://www.w3.org/2000/svg" class="ml-1 w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg></a>
                    </div>
                  </th>
                  <th scope="col" class="py-3 px-6">
                      <div class="flex items-center">
                          Price
                          <a href="#"><svg xmlns="http://www.w3.org/2000/svg" class="ml-1 w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg></a>
                      </div>
                  </th>
                  <th scope="col" class="py-3 px-6">
                      <div class="flex items-center">
                          Variation
                          <a href="#"><svg xmlns="http://www.w3.org/2000/svg" class="ml-1 w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg></a>
                      </div>
                  </th>
                  <th scope="col" class="py-3 px-6">
                      <div class="flex items-center">
                          Volume 24h
                          <a href="#"><svg xmlns="http://www.w3.org/2000/svg" class="ml-1 w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg></a>
                      </div>
                  </th>
                  <th scope="col" class="py-3 px-6">
                      <span class="sr-only"></span>
                  </th>
              </tr>
          </thead>
        </table>
      </div>
      <CryptoDetails />
  </div>
</template>
<script lang="ts">
import { CoinGeckoApi } from "../stores/CoinGeckoApi";
import CryptoDetails from "../components/CryptoDetail.vue" 
function createCryptoList(currency:string="usd"):HTMLTableSectionElement{
  let tbody:HTMLTableSectionElement = document.createElement("tbody");
  const data = CoinGeckoApi.getCryptoMarket();
  data.then( (value:Array<string>) => {
    value.forEach( (element:any) => {
      /*
      element:
        ath: all time high (the highest registered value for this coin)
        ath_change_percentage: all time high percentage
        ath_date: all time high date
        atl:  all time low (the lowest registered valuie for this coin)
        atl_change_percentage: all time low percentage
        atl_date: all time low date
        circulating_suply: the number of coins/tokens of this crypto currency that are publicly available for sell/buy
        current_price: current price for this crypto
        fully_diluted_valuation: the total value of a cryptocurrency project assuming all of its token are in circulation
        high_24h: the max value for the past 24 hours
        id: id for CoinGecko
        image: logo
        last_updated: date and hour of the last update for those data
        low_24h: the lowest value for the past 24h
        market_cap: the total value of all coins that have been mined
        market_cap_change_24h: the total value of all coins that have been mined in the past 24 hours
        market_cap_change__percentage_24h: the total percentage value of all coins that have been mined in the past 24 hours
        market_cap_rank: the rank of this crytpo on the market based on its mark_cap highest value
        max_supply: the maximum number of coins/tokens that will ever be created
        name: name of this crypto
        price_change_24h: change of price in the past 24 hours
        price_change_percentage_24h: percentage change of price in the past 24 hours
        roi: return on investment 
          currency: current currency selected
          percentage : roi percentage
          times: the period of time for roi
        symbol: symbol for this coin
        total_supply: total amount of coin/token currently in circulation
        total_volume: total amount of coin being traded across all exchanges in the world
      */
      let row:HTMLTableRowElement = document.createElement("tr");
      row.setAttribute("class","bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600");

      let nameDiv:HTMLTableCellElement = document.createElement("td");
      nameDiv.setAttribute("class","py-4 px-6");
      let img:HTMLImageElement = document.createElement("img");
      img.setAttribute("width","20");
      img.setAttribute("class","inline");
      img.setAttribute("alt","image description");
      img.src = element["image"];
      let name:HTMLParagraphElement = document.createElement("strong");
      name.setAttribute("class","font-semibold text-gray-900 dark:text-white");
      name.innerHTML=element["name"];
      let symbol:HTMLParagraphElement = document.createElement("p");
      symbol.setAttribute("class","py-4 px-6");
      symbol.innerHTML=element["symbol"]; 
      nameDiv.appendChild(img);
      nameDiv.appendChild(name);
      nameDiv.appendChild(symbol);


      let price:HTMLTableCellElement = document.createElement("td");
      price.setAttribute("class","py-4 px-6");
      price.innerHTML=element["current_price"] + " " +currency;

      let variation:HTMLTableCellElement = document.createElement("td");
      variation.setAttribute("class","py-4 px-6");
      variation.innerHTML=element["price_change_percentage_24h"] +" %";

      let volume:HTMLTableCellElement = document.createElement("td");
      volume.setAttribute("class","py-4 px-6");
      volume.innerHTML=element["high_24h"];

      let detail = document.createElement("td");
      detail.setAttribute("class","cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline");
      detail.innerHTML = "Details";
      detail.addEventListener("click", () => {
        CryptoDetails.methods.ShowDetails();
      });

      row.appendChild(nameDiv);
      row.appendChild(price);
      row.appendChild(variation);
      row.appendChild(volume);
      row.appendChild(detail);

      tbody.appendChild(row);

    });
  });


  return tbody;
}

export default   
{
  name: "CryptoList.vue",
  mounted(){
    const currencyDiv:HTMLSelectElement = document.getElementById("currency");
    if(currencyDiv == null){ 
          document.getElementById("CryptoList")?.appendChild(createCryptoList( ));
    }else{
      const selectedCurrency:string= currencyDiv.options[currencyDiv.selectedIndex].text;
      document.getElementById("CryptoList")?.appendChild(createCryptoList(selectedCurrency));
    }

}
}


</script>