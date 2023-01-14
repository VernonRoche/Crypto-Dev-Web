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
          favDiv.setAttribute("class","grid-cols-"+favorites[0].favorite.length);
          favDiv.setAttribute("id","FavDivList");
          favorites[0].favorite.forEach(element => {

              let fav:HTMLDivElement = document.createElement("div");
              fav.setAttribute("class","space-x-5");
              fav.setAttribute("id","FavIcon - "+element);

              let favName:HTMLParagraphElement = document.createElement("p");
              favName.setAttribute("class","hover:text-accent inline font-semibold text-white");
              favName.innerHTML = element;

              fav.appendChild(favName);
              fav.appendChild(Favoris.createFavIcon(element));
              favDiv.appendChild(fav);
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
