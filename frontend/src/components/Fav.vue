<template v-if="Login.isLog">
  <div class="inline">
    <div id="FavoriteList" class="container mx-auto aspect-auto">
    </div>
  </div>
</template>

<script lang="ts">
import {CryptohubApi} from "@/stores/CryptohubApi";
import {getAuth} from "firebase/auth";
import { Login } from "@/stores/login";
import {Favoris} from "@/stores/Favoris";
import CryptoChart from  "@/components/chart/CryptoChart.vue";

export default {
  name: "Fav.vue",
  async mounted(){    
    document.querySelectorAll("[id=Favrow]").forEach((e:HTMLTableRowElement) => {
      e.style.display = "table-row"
    });
    const auth = getAuth();
    const user = auth.currentUser!.uid;
    if(user){
        let favorites = await CryptohubApi.getFavorites(user);
        if(favorites.length > 0){
          let favDiv:HTMLDivElement = document.createElement("div");
          favDiv.setAttribute("class","flaot-left bg-base-300 rounded-box p-6");
          favDiv.setAttribute("display","table-cell");
          favDiv.setAttribute("id","FavDivList");
          favorites[0].favorite.forEach(element => {
              let fav:HTMLDivElement = document.createElement("div");
              fav.setAttribute("class","space-x-5");
              fav.setAttribute("id","FavIcon - "+element.name);

              let favName:HTMLParagraphElement = document.createElement("p");
              favName.setAttribute("class","hover:text-accent inline font-semibold text-white cursor-pointer");
              favName.addEventListener('click', function(){
                const currencyDiv:HTMLSelectElement = document.getElementById("currency") as HTMLSelectElement;
                if(currencyDiv == null){
                  
                  CryptoChart.methods.changeData(element.coin_id,"usd");
                }else{
                  const selectedCurrency: string = currencyDiv.options[currencyDiv.selectedIndex].text; 
                  CryptoChart.methods.changeData(element.coin_id,selectedCurrency);
                }
              });
              favName.innerHTML = element.name;

              fav.appendChild(favName);
              fav.appendChild(Favoris.createFavIcon(element.name));
              favDiv.appendChild(fav);

              let row:HTMLTableRowElement =  document.getElementById(element.name);
              ;
              let favImg:HTMLCollectionOf<HTMLImageElement> =row.getElementsByClassName("FavIcon cursor-pointer")
              favImg.item(0).alt = "Fav";
              favImg.item(0).src = "https://cdn.discordapp.com/attachments/1042336221948551168/1058041919407673374/starFull.png";
          });
        document.getElementById("FavoriteList").appendChild(favDiv)
        }else{ 
            let emptyFav = document.createElement("div");
            emptyFav.innerHTML = "Veuillez Ajouté des Favoris";
            document.getElementById("FavoriteList").appendChild(emptyFav);
        }
    }
    document.getElementById("Filterfav")!.style.display= "table-row";
  },
  beforeUnmount(){
    document.querySelectorAll("[id=Favrow]").forEach((e:HTMLTableRowElement) => {
      e.style.display = "none"
    });
    document.getElementById("Filterfav")!.style.display= "none";    
  } 
};
</script>

<style scoped></style>
