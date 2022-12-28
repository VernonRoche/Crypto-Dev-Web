<template>
<div class="inline-block whitespace-nowrap">
    <div class="grid grid-cols-3 ">
        <div id="Filterfav">
            <img id="filterFavImg" src="@/assets/starEmpty.png" alt="notFav" width="25" height="25"> 
        </div>
    </div>
</div>
</template>
<script lang="ts">
function DisplayFav():void{
    console.log("crypto "+ document.getElementById("CryptoList").style.display);
    console.log("favori "+ document.getElementById("FavoriList").style.display);
    document.getElementById("CryptoList").style.display = "none";
    document.getElementById("FavoriList").style.display = "initial";
    //TODO ajouter les favories dans le tableau FavoriList
}
function hideFav():void{
    document.getElementById("CryptoList").style.display = "initial";
    document.getElementById("FavoriList").style.display = "none";} 
export default
{
  name: "Filter.vue",
  mounted(){
    document.getElementById("Filterfav").addEventListener('click', ()  => {
        const favIcon:HTMLImageElement = document.getElementById("filterFavImg");
        if(favIcon.alt == "NotFav"){
            console.log("AKOOEAZOAZOEJOZIAEHJOZAJEIO");
            
            DisplayFav()
            favIcon.setAttribute("alt","Fav");
            favIcon.src = "/src/assets/starFull.png";
        }else{
            hideFav()
            favIcon.setAttribute("alt","NotFav");
            favIcon.src = "/src/assets/starEmpty.png";
        } 
    });
  },
}
</script>