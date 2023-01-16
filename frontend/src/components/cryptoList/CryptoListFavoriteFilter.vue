<template v-if="Login.isLog">
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
import { CryptohubApi } from "@/stores/CryptohubApi";
import { getAuth } from "firebase/auth";
import { Login } from "@/stores/login";

/**
 * Hide all Crypto currencies of the CryptoList that are not favorites
 */
async function DisplayFav(): Promise<void> {
  const auth = getAuth();
  const user = auth.currentUser!.uid;
  if (user) {
    let favorites = await CryptohubApi.getFavorites(user);
    let FavoriteList: Array<string> = [];
    favorites[0].favorite.forEach((elem) => {
      FavoriteList.push(elem.name);
    });
    let table: HTMLTableElement = document.getElementById(
      "CryptoList"
    ) as HTMLTableElement;
    let rows: HTMLCollectionOf<HTMLTableRowElement> = table.rows;
    let i: number;
    for (i = 1; i < rows.length; i++) {
      if (!FavoriteList.includes(rows[i].id)) {
        rows[i].style.display = "none";
      }
    }
  }
}

/**
 * Show all the Crypto currencies of the CryptoList.
 */
function hideFav(): void {
  let table: HTMLTableElement = document.getElementById(
    "CryptoList"
  ) as HTMLTableElement;
  let rows: HTMLCollectionOf<HTMLTableRowElement> = table.rows;
  let i: number;
  for (i = 1; i < rows.length - 1; i++) {
    rows[i].style.display = "table-row";
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
        favIcon.src =
          "https://cdn.discordapp.com/attachments/1042336221948551168/1058041919407673374/starFull.png";
      } else {
        hideFav();
        favIcon.setAttribute("alt", "NotFav");
        favIcon.src =
          "https://cdn.discordapp.com/attachments/1042336221948551168/1058041919042748436/starEmpty.png";
      }
    });
    if (!Login.isLog) {
      fav.style.display = "none";
    }
  },
};
</script>
