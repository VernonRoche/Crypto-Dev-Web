<template>
<div class="inline-block whitespace-nowrap">
    <div class="grid grid-cols-3 ">
        <div id="fav">
            <img id="filterFavImg" src="@/assets/starEmpty.png" alt="notFav" width="25" height="25"> 
        </div>
    </div>
</div>
</template>
<script lang="ts">
function FilterFav():void{
    //TODO
}

export default   
{
  name: "Filter.vue",
  mounted(){
    document.getElementById("fav").addEventListener('click', ()  => {
        const favIcon:HTMLImageElement = document.getElementById("filterFavImg");
        if(favIcon.alt == "NotFav"){
            FilterFav()
            favIcon.setAttribute("alt","Fav");
            favIcon.src = "/src/assets/starFull.png";
        }else{

            favIcon.setAttribute("alt","NotFav");
            favIcon.src = "/src/assets/starEmpty.png";
        } 
    });
  },
}
</script>