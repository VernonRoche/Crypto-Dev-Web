<template>
  <div class="inline-block whitespace-nowrap">
    <div class="grid grid-cols-3">
      <div id="Filterfav">
        
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {CryptohubApi} from "@/stores/CryptohubApi"; 
import {getAuth} from "firebase/auth";

async function DisplayFav(): Promise<void> {
  const auth = getAuth();
  const user = auth.currentUser!.uid;
  if(user){
    let favorites = await CryptohubApi.getFavorites(user);
    console.log("fav : ");
    
    console.log(favorites);
    //document.getElementById("CryptoList")!.style.display = "none";
    //document.getElementById("FavoriList")!.style.display = "initial";
  } 

}
function hideFav(): void {
  document.getElementById("CryptoList")!.style.display = "initial";
  document.getElementById("FavoriList")!.style.display = "none";
}
export default {
  name: "CryptoListFavoriteFilter.vue",
  components: {  },
  mounted() {
    document.getElementById("Filterfav")!.addEventListener("click", () => {
      const favIcon: HTMLImageElement = document.getElementById( "filterFavImg" ) as HTMLImageElement;
      if (favIcon.alt == "NotFav") {
        DisplayFav();
        favIcon.setAttribute("alt", "Fav");
        favIcon.src = "/src/assets/starFull.png";
      } else {
        hideFav();
        favIcon.setAttribute("alt", "NotFav");
        favIcon.src = "/src/assets/starEmpty.png";
      }
    });
  },
};
</script>
