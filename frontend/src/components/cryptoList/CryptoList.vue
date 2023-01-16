<template>
  <div class="grid">
    <table id="CryptoList" class="table hover table-normal">
      <thead class="text-xs uppercase bg-gray-700 text-gray-400">
        <CryptoListFilterBar />
      </thead>
    </table>
  </div>
</template>
<script lang="ts">
import { CoinGeckoApi } from "@/stores/CoinGeckoApi";
import { autoComplete } from "@/stores/autoComplete";
import CryptoListFilterBar from "@/components/cryptoList/CryptoListFilterBar.vue";
import { Favoris } from "@/stores/Favoris";
import { Login } from "@/stores/login";
import CryptoChart from "@/components/chart/CryptoChart.vue";

let CryptoName: Array<string> = [];
let cryptoPrices: { name: string; price: number }[] = [];

/**
 * Create a Div containing all Crypto currencies availables
 * @param currency the target currency of market data (eur,usd,jpy,...)
 * @returns Div containing all Crypto currencies availables
 */
function createCryptoList(currency: string = "usd"): HTMLTableSectionElement {
  let tbody: HTMLTableSectionElement = document.createElement("tbody");
  tbody.setAttribute("id", "CryptoRow");
  const data = CoinGeckoApi.getCryptoMarket();
  data.then(async (value: Array<string>) => {
    value.forEach(async (element: any) => {
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

      // Get the price of the crypto in the selected currency
      const elementPrice = element["current_price"];
      const elementName = element["name"];
      const currentCryptoPrice = {
        name: elementName,
        price: elementPrice,
      };
      cryptoPrices.push(currentCryptoPrice);

      CryptoName.push(element["name"], element["symbol"]);
      let row: HTMLTableRowElement = document.createElement("tr");
      row.setAttribute("class", "hover cursor-pointer");
      row.setAttribute("id", element["name"]);
      // Add the logo
      let logoDiv: HTMLTableCellElement = document.createElement("td");
      logoDiv.setAttribute("class", "space-x-5 py-4 px-6");
      let img: HTMLImageElement = document.createElement("img");
      img.setAttribute("width", "20");
      img.setAttribute("height", "20");
      img.setAttribute("class", "inline");
      img.setAttribute("alt", "icon");
      img.src = element["image"];
      let symbol: HTMLParagraphElement = document.createElement("p");
      symbol.setAttribute(
        "class",
        "hover:text-accent inline font-semibold text-white"
      );
      symbol.innerHTML = element["symbol"];
      logoDiv.appendChild(img);
      logoDiv.appendChild(symbol);

      let name: HTMLTableCellElement = document.createElement("td");
      name.setAttribute("class", "hover:text-accent py-4 px-6");
      name.innerHTML = element["name"];

      // Add the price
      let price: HTMLTableCellElement = document.createElement("td");
      price.setAttribute("class", "hover:text-accent content-center py-4 px-6");
      price.innerHTML = element["current_price"] + " " + currency;

      // Add the variation
      let variation: HTMLTableCellElement = document.createElement("td");
      variation.setAttribute("class", "hover:text-accent py-4 px-6");
      variation.innerHTML = element["price_change_percentage_24h"] + " %";

      // Add the volume
      let volume: HTMLTableCellElement = document.createElement("td");
      volume.setAttribute("class", "hover:text-accent py-4 px-6");
      volume.innerHTML = element["high_24h"];

      // Add the favourite icon
      let fav = document.createElement("td");
      fav.setAttribute("class", "hover:text-accent py-4 px-6");
      fav.setAttribute("id", "Favrow");

      let favIcon: HTMLImageElement = document.createElement("img");
      favIcon.setAttribute("class", "FavIcon cursor-pointer");
      favIcon.setAttribute("width", "20");
      favIcon.setAttribute("height", "20");
      favIcon.setAttribute("min-width", "20");
      favIcon.setAttribute("min-height", "20");
      favIcon.setAttribute("alt", "NotFav");
      favIcon.src =
        "https://cdn.discordapp.com/attachments/1042336221948551168/1058041919042748436/starEmpty.png";
      fav.appendChild(favIcon);
      fav.addEventListener("click", async function () {
        if (Login.isLog) {
          if (favIcon.alt == "NotFav") {
            let isSucess = await Favoris.addFavoris({
              name: element["name"],
              coin_id: element["id"],
            });
            if (!isSucess) {
              alert("Vous ne pouvez avoir que 3 favoris maximum");
            } else {
              row.setAttribute("alt", "fav");
              favIcon.setAttribute("alt", "Fav");
              favIcon.src =
                "https://cdn.discordapp.com/attachments/1042336221948551168/1058041919407673374/starFull.png";
              //ajouter le nouveau fav dans la liste a gauche du graph
              let newfav: HTMLDivElement = document.createElement("div");
              newfav.setAttribute("class", "space-x-5");
              newfav.setAttribute("id", "FavIcon - " + element["name"]);

              let favName: HTMLParagraphElement = document.createElement("p");
              favName.setAttribute(
                "class",
                "hover:text-accent inline font-semibold text-white cursor-pointer"
              );
              favName.innerHTML = element["name"];
              favName.addEventListener("click", function () {
                const currencyDiv: HTMLSelectElement = document.getElementById(
                  "currency"
                ) as HTMLSelectElement;
                if (currencyDiv == null) {
                  CryptoChart.methods.changeData(element["id"], "usd");
                } else {
                  const selectedCurrency: string =
                    currencyDiv.options[currencyDiv.selectedIndex].text;
                  CryptoChart.methods.changeData(
                    element["id"],
                    selectedCurrency
                  );
                }
              });
              newfav.appendChild(favName);
              newfav.appendChild(Favoris.createFavIcon(element["name"]));

              document.getElementById("FavDivList").appendChild(newfav);
            }
          } else {
            Favoris.RemoveFavorite(element["name"]);
            favIcon.setAttribute("alt", "NotFav");
            favIcon.src =
              "https://cdn.discordapp.com/attachments/1042336221948551168/1058041919042748436/starEmpty.png";
            // suprimer le Fav de la liste a gauche du graph
            document
              .getElementById("FavDivList")
              .childNodes.forEach((child: HTMLDivElement) => {
                if (
                  child.attributes[1].value ===
                  "FavIcon - " + element["name"]
                ) {
                  child.innerHTML = "";
                }
              });
          }
        } else {
          alert("Vous devez etre connecté pour pouvoir ajouté des favoris");
        }
      });
      if (!Login.isLog) {
        fav.style.display = "none";
      }

      // Add the row to the table
      row.appendChild(logoDiv);
      row.appendChild(name);
      row.appendChild(price);
      row.appendChild(variation);
      row.appendChild(volume);
      row.appendChild(fav);
      row.addEventListener("click", function () {
        CryptoChart.methods.changeCurrentCurrency(element["name"]);
        CryptoChart.methods.changeData(element["id"], currency);
        window.scrollTo(0, 0);
      });
      tbody.appendChild(row);
    });
  });

  return tbody;
}
/**
 * Sort the Crypto List by ascending or descending
 * @param dir the direction for the sort (ascending or descending)
 * @param nbHeader a number representing the header that will be used to sort the list
 */
function sortTableByHeader(dir: string, nbHeader: number): void {
  let tableName: string = "CryptoList";
  let i: number;
  let table: HTMLTableElement = document.getElementById(
    tableName
  ) as HTMLTableElement;
  let switching: boolean = true;
  let shouldSwitch: boolean = false;
  while (switching) {
    switching = false;
    let rows: HTMLCollectionOf<HTMLTableRowElement> = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      let x = rows[i].getElementsByTagName("TD")[nbHeader];
      let y = rows[i + 1].getElementsByTagName("TD")[nbHeader];

      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode!.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

export default {
  name: "CryptoList.vue",
  components: { CryptoListFilterBar },
  data() {
    return {
      cryptoPrices,
    };
  },
  async mounted() {
    const currencyDiv: HTMLSelectElement = document.getElementById(
      "currency"
    ) as HTMLSelectElement;
    if (currencyDiv == null) {
      document.getElementById("CryptoList")?.appendChild(createCryptoList());
    } else {
      const selectedCurrency: string =
        currencyDiv.options[currencyDiv.selectedIndex].text;
      document
        .getElementById("CryptoList")
        ?.appendChild(createCryptoList(selectedCurrency));
    }
    autoComplete(
      document.getElementById("cryptoSearch") as HTMLInputElement,
      CryptoName
    );
    document.querySelectorAll("[id=asc]").forEach((e: HTMLImageElement) => {
      e.addEventListener("click", () => {
        sortTableByHeader("asc", +e.alt);
      });
    });
    document.querySelectorAll("[id=desc]").forEach((e: HTMLImageElement) => {
      e.addEventListener("click", () => {
        sortTableByHeader("desc", +e.alt);
      });
    });
  },
};
</script>
