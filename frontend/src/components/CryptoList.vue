<template>
        <table id="CryptoList" class="overflow-y-auto table-fixed overflow-x-auto text-sm text-left text-gray-500 dark:text-gray-400 whitespace-nowrap">
          <caption></caption>
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  <th scope="col" class="py-3 px-6">
                    <div class="flex items-center">
                      Name
                      <div>
                        <img id="asc" src="@/assets/caret-arrow-up.png" alt="0" class="cursor-pointer object-scale-down h-3 w-3" />
                        <img id="desc" src="@/assets/caret-down.png" alt="0" class="cursor-pointer object-scale-down h-3 w-3" />
                      </div>
                    </div>
                  </th>
                  <th scope="col" class="py-3 px-6">
                      <div class="flex items-center">
                          Price
                        <div>
                          <img id="asc" src="@/assets/caret-arrow-up.png" alt="1" class="cursor-pointer object-scale-down h-3 w-3" />
                          <img id="desc" src="@/assets/caret-down.png" alt="1" class="cursor-pointer object-scale-down h-3 w-3" />
                        </div>
                      </div>
                  </th>
                  <th scope="col" class="py-3 px-6">
                      <div class="flex items-center">
                          Variation
                          <div>
                            <img id="asc" src="@/assets/caret-arrow-up.png" alt="2" class="cursor-pointer object-scale-down h-3 w-3" />
                            <img id="desc" src="@/assets/caret-down.png" alt="2" class="cursor-pointer object-scale-down h-3 w-3" />
                          </div>
                      </div>
                  </th>
                  <th scope="col" class="py-3 px-15">
                      <div class="flex items-center">
                          Volume 24h
                          <div>
                            <img id="asc" src="@/assets/caret-arrow-up.png" alt="3" class="cursor-pointer object-scale-down h-3 w-3" />
                            <img id="desc" src="@/assets/caret-down.png" alt="3" class="cursor-pointer object-scale-down h-3 w-3" />
                          </div>
                      </div>
                  </th>
              </tr>
          </thead>
        </table>
</template>
<script lang="ts">
import { CoinGeckoApi } from "../stores/CoinGeckoApi";
import { autoComplete } from "../stores/autoComplete"; 
let CryptoName:Array<string> = []; 
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
      CryptoName.push(element["name"], element["symbol"]);
      let row:HTMLTableRowElement = document.createElement("tr");
      row.setAttribute("class","bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600");

      let nameDiv:HTMLTableCellElement = document.createElement("td");
      nameDiv.setAttribute("class","space-x-5 py-4 px-6");
      let img:HTMLImageElement = document.createElement("img");
      img.setAttribute("width","20");
      img.setAttribute("class","inline");
      img.setAttribute("alt","icon");
      img.src = element["image"];
      let name:HTMLParagraphElement = document.createElement("strong");
      name.setAttribute("class","py-4 px-6");
      name.innerHTML=element["name"];
      let symbol:HTMLParagraphElement = document.createElement("p");
      symbol.setAttribute("class","inline font-semibold text-gray-900 dark:text-white");
      symbol.innerHTML = element["symbol"]; 
      nameDiv.appendChild(img);
      nameDiv.appendChild(symbol);
      nameDiv.appendChild(name);
      


      let price:HTMLTableCellElement = document.createElement("td");
      price.setAttribute("class","content-center py-4 px-6");
      price.innerHTML=element["current_price"]+" "+ currency;

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
        //toDO
      });

      let fav = document.createElement("td")
      fav.setAttribute("class","py-4 px-6");
      let favIcon:HTMLImageElement = document.createElement("img");
      favIcon.setAttribute("alt","NotFav");
      favIcon.setAttribute("class","FavIcon");
      favIcon.src = "/src/assets/starEmpty.png";
      fav.appendChild(favIcon);
      fav.addEventListener('click', () => {        
        if(favIcon.alt == "NotFav"){
          //addToFavorite(); //TODO
          row.setAttribute("alt","fav");
          favIcon.setAttribute("alt","Fav");
          favIcon.src = "/src/assets/starFull.png";
        }else{
          //removeFromFavorite(); //TODO
          favIcon.setAttribute("alt","NotFav");
          favIcon.src = "/src/assets/starEmpty.png";
        } 
      });
      

      row.appendChild(nameDiv);
      row.appendChild(price);
      row.appendChild(variation);
      row.appendChild(volume);
      row.appendChild(detail);
      row.appendChild(fav);
      tbody.appendChild(row);

    });
  });


  return tbody;
}

function sortTableByHeader(dir:string, nbHeader:number):void{
  let tableName:string  = "CryptoList";
  let fav:HTMLImageElement = document.getElementById("filterFavImg");
  if(fav && fav.alt == "Fav"){
    tableName = "FavoriList";
  }
  console.log(tableName);
  let i:number;
  let table:HTMLTableElement = document.getElementById(tableName);
  let switching:boolean = true;
  let shouldSwitch:boolean;
  while(switching){
    switching = false;
    let rows:HTMLCollectionOf<HTMLTableRowElement> = table.rows;
    for(i = 1 ;i < (rows.length-1);i++){
      shouldSwitch = false;
      let x = rows[i].getElementsByTagName("TD")[nbHeader];
      let y = rows[i+1].getElementsByTagName("TD")[nbHeader];

      if(dir == "asc"){
        if(x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()){
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc"){
          if(x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()){
            shouldSwitch = true;
            break;
          }
      }
    }
    if(shouldSwitch){
      rows[i].parentNode.insertBefore(rows[i+1],rows[i]);
      switching=true;
    }
  }
}

export default   
{
  name: "CryptoList",
  mounted(){
    const currencyDiv:HTMLSelectElement = document.getElementById("currency");
    if(currencyDiv == null){ 
          document.getElementById("CryptoList")?.appendChild(createCryptoList( ));
    }else{
      const selectedCurrency:string= currencyDiv.options[currencyDiv.selectedIndex].text;
      document.getElementById("CryptoList")?.appendChild(createCryptoList(selectedCurrency));
    }
    autoComplete(document.getElementById("cryptoSearch"),CryptoName);
    document.querySelectorAll('[id=asc]').forEach( (e:HTMLImageElement) => {
      e.addEventListener("click",() => {
        sortTableByHeader("asc",+e.alt);
      });
    });
    document.querySelectorAll('[id=desc]').forEach( (e:HTMLImageElement) => {
      e.addEventListener("click",() => {
        sortTableByHeader("desc",+e.alt);
      });
    });
  }
}


</script>