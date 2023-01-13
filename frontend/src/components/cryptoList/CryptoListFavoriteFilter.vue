<template>
  <div class="inline-block whitespace-nowrap">
    <div class="grid grid-cols-3">
      <div id="Filterfav" class="cursor-pointer">
        <IconStarEmpty />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import IconStarEmpty from "@/components/icons/IconStarEmpty.vue";
import {CryptohubApi} from "@/stores/CryptohubApi";
import {getAuth} from "firebase/auth";

async function DisplayFav(): Promise<void> {
  const auth = getAuth();
  const user = auth.currentUser!.uid;
  if(user){
    let favorites = await CryptohubApi.getFavorites(user);    
    let table: HTMLTableElement = document.getElementById( "CryptoList" ) as HTMLTableElement;
    let rows: HTMLCollectionOf<HTMLTableRowElement> = table.rows;
    let i: number;
    for (i = 1; i < rows.length ; i++) {
      if(!favorites[0].favorite.includes(rows[i].id)){
        rows[i].style.display = "none"; 
      }
    }
  }
}

function hideFav(): void {
    let table: HTMLTableElement = document.getElementById( "CryptoList" ) as HTMLTableElement;
    let rows: HTMLCollectionOf<HTMLTableRowElement> = table.rows;
    let i: number;
    for (i = 1; i < rows.length - 1; i++) {
      rows[i].style.display = "initial"; 
    }
}

export default {
  name: "CryptoListFavoriteFilter.vue",
  components: { IconStarEmpty },
  mounted() {
    let fav = document.getElementById("Filterfav")!;    
    fav.addEventListener("click", () => {
      const favIcon: HTMLImageElement = fav.childNodes[0] as HTMLImageElement;
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
