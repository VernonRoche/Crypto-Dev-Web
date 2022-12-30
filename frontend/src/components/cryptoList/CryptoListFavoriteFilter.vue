<template>
  <div class="inline-block whitespace-nowrap">
    <div class="grid grid-cols-3">
      <div id="Filterfav">
        <IconStarEmpty />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import IconStarEmpty from "@/components/icons/IconStarEmpty.vue";

function DisplayFav(): void {
  document.getElementById("CryptoList")!.style.display = "none";
  document.getElementById("FavoriList")!.style.display = "initial";
  //TODO ajouter les favories dans le tableau FavoriList
}
function hideFav(): void {
  document.getElementById("CryptoList")!.style.display = "initial";
  document.getElementById("FavoriList")!.style.display = "none";
}
export default {
  name: "CryptoListFavoriteFilter.vue",
  components: { IconStarEmpty },
  mounted() {
    document.getElementById("Filterfav")!.addEventListener("click", () => {
      const favIcon: HTMLImageElement = document.getElementById(
        "filterFavImg"
      ) as HTMLImageElement;
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
