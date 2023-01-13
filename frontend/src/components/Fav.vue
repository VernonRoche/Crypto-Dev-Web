<template>
  <div>
    <div id="FavoriteList" class="container mx-auto aspect-auto">


    </div>
  </div>
</template>

<script lang="ts">
import {CryptohubApi} from "@/stores/CryptohubApi";
import {getAuth} from "firebase/auth";
 function createFavIcon(){
        let favIcon: HTMLImageElement = document.createElement("img");
        favIcon.setAttribute("class", "FavIcon");
        favIcon.setAttribute("width", "20");
        favIcon.setAttribute("height", "20");
        favIcon.setAttribute("min-width", "20");
        favIcon.setAttribute("min-height", "20");
        favIcon.setAttribute("alt", "Fav");
        favIcon.src ="https://cdn.discordapp.com/attachments/1042336221948551168/1058041919042748436/starFull.png";
        return favIcon;
 } 
export default {
  name: "CurrencySelector.vue",
  async mounted() {
    const auth = getAuth();
    const user = auth.currentUser!.uid;
    if(user){
        let favorites = await CryptohubApi.getFavorites(user);
        favorites[0].favorite.forEach(element => {
            let favDiv:HTMLDivElement = document.createElement("div");
            
            let fav:HTMLDivElement = document.createElement("div");

            let favIconDiv = document.createElement("div");
            favIconDiv.setAttribute("class", "hover:text-accent py-4 px-6");
            favIconDiv.appendChild(createFavIcon());
        });
    } 
  },
};
</script>

<style scoped></style>
